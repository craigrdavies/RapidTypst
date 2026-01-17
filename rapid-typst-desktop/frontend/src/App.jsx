import { useState, useEffect, useCallback, useRef } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { open, save } from '@tauri-apps/api/dialog'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Toaster, toast } from 'sonner'
import {
  FileText, Save, Download, Undo, Redo, Search, Replace, Plus,
  ChevronDown, X, FileCode, Eye, Menu, File, LayoutTemplate,
  FolderOpen, Info, ExternalLink
} from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { githubLight } from '@uiw/codemirror-theme-github'
import { StreamLanguage } from '@codemirror/language'
import { search, searchKeymap, openSearchPanel } from '@codemirror/search'
import { history, historyKeymap, undo, redo } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import TemplateGallery from './components/TemplateGallery'
import AboutDialog from './components/AboutDialog'

// Simple Typst syntax highlighting
const typstLanguage = StreamLanguage.define({
  token(stream) {
    if (stream.match(/\/\/.*/)) return 'comment'
    if (stream.sol() && stream.match(/=+\s/)) return 'heading'
    if (stream.match(/\*[^*]+\*/)) return 'strong'
    if (stream.match(/_[^_]+_/)) return 'emphasis'
    if (stream.match(/`[^`]+`/)) return 'string'
    if (stream.match(/#[a-zA-Z_][a-zA-Z0-9_]*/)) return 'keyword'
    if (stream.match(/\$[^$]+\$/)) return 'variable'
    stream.next()
    return null
  },
})

const defaultContent = `// Welcome to Rapid Typst!
// Start writing your document below

= My First Document

This is a paragraph with *bold* and _italic_ text.

== Section One

- List item one
- List item two
- List item three

== Section Two

You can use math: $x^2 + y^2 = z^2$

#align(center)[
  #text(size: 16pt, weight: "bold")[Centered Text]
]
`

export default function App() {
  const [content, setContent] = useState(defaultContent)
  const [preview, setPreview] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [menuOpen, setMenuOpen] = useState(null)
  const editorRef = useRef(null)
  const debounceRef = useRef(null)

  // Compile on content change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsCompiling(true)
      try {
        const result = await invoke('compile_typst', { content })
        setPreview(result.html || '')
      } catch (e) {
        console.error('Compile error:', e)
      } finally {
        setIsCompiling(false)
      }
    }, 400)
    return () => clearTimeout(debounceRef.current)
  }, [content])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        await handleSave()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault()
        await handleOpen()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleNew()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        editorRef.current?.view && openSearchPanel(editorRef.current.view)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        setShowFindReplace(v => !v)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [content, currentFile])

  const handleNew = () => {
    setContent(defaultContent)
    setCurrentFile(null)
    toast.success('New document created')
  }

  const handleOpen = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{ name: 'Typst', extensions: ['typ'] }]
      })
      if (selected) {
        const fileContent = await invoke('read_file', { path: selected })
        setContent(fileContent)
        setCurrentFile(selected)
        const fileName = selected.split(/[\\/]/).pop()
        await invoke('add_recent_file', { path: selected, name: fileName })
        toast.success(`Opened ${fileName}`)
      }
    } catch (e) {
      toast.error('Failed to open file')
    }
  }

  const handleSave = async () => {
    try {
      let path = currentFile
      if (!path) {
        path = await save({
          filters: [{ name: 'Typst', extensions: ['typ'] }],
          defaultPath: 'document.typ'
        })
      }
      if (path) {
        await invoke('write_file', { path, content })
        setCurrentFile(path)
        const fileName = path.split(/[\\/]/).pop()
        await invoke('add_recent_file', { path, name: fileName })
        toast.success('Document saved')
      }
    } catch (e) {
      toast.error('Failed to save file')
    }
  }

  const handleExport = async (format) => {
    try {
      const path = await save({
        filters: [{ name: format.toUpperCase(), extensions: [format] }],
        defaultPath: `document.${format}`
      })
      if (path) {
        if (format === 'pdf') {
          await invoke('export_pdf', { content, path })
        } else if (format === 'html') {
          await invoke('export_html', { content, path })
        } else if (format === 'svg') {
          await invoke('export_svg', { content, path })
        }
        toast.success(`Exported as ${format.toUpperCase()}`)
      }
    } catch (e) {
      toast.error(`Export failed: ${e}`)
    }
    setMenuOpen(null)
  }

  const handleSelectTemplate = async (template) => {
    try {
      const result = await invoke('get_template_content', { templateId: template.id })
      setContent(result.content)
      setCurrentFile(null)
      setShowTemplates(false)
      toast.success(`Loaded "${template.name}" template`)
    } catch (e) {
      toast.error('Failed to load template')
    }
  }

  const handleReplace = () => {
    if (findText) {
      setContent(content.replace(new RegExp(findText, 'g'), replaceText))
      toast.success('Replaced all occurrences')
    }
  }

  const handleUndo = () => editorRef.current?.view && undo(editorRef.current.view)
  const handleRedo = () => editorRef.current?.view && redo(editorRef.current.view)

  const fileName = currentFile ? currentFile.split(/[\\/]/).pop() : 'Untitled'

  return (
    <div className="h-screen flex flex-col bg-stone-50">
      {/* Toolbar */}
      <div className="toolbar">
        {/* File Menu */}
        <div className="relative">
          <button
            className="btn btn-ghost flex items-center gap-1"
            onClick={() => setMenuOpen(menuOpen === 'file' ? null : 'file')}
          >
            <File className="w-4 h-4" />
            File
            <ChevronDown className="w-3 h-3" />
          </button>
          {menuOpen === 'file' && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 z-50 min-w-[180px] animate-fade-in">
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { handleNew(); setMenuOpen(null) }}>
                <Plus className="w-4 h-4" /> New
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { handleOpen(); setMenuOpen(null) }}>
                <FolderOpen className="w-4 h-4" /> Open...
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { handleSave(); setMenuOpen(null) }}>
                <Save className="w-4 h-4" /> Save
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { setShowTemplates(true); setMenuOpen(null) }}>
                <LayoutTemplate className="w-4 h-4" /> Templates
              </button>
              <hr className="my-1 border-gray-200" />
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4" /> Export PDF
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => handleExport('html')}>
                <FileCode className="w-4 h-4" /> Export HTML
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => handleExport('svg')}>
                <FileText className="w-4 h-4" /> Export SVG
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            className="btn btn-ghost flex items-center gap-1"
            onClick={() => setMenuOpen(menuOpen === 'edit' ? null : 'edit')}
          >
            Edit
            <ChevronDown className="w-3 h-3" />
          </button>
          {menuOpen === 'edit' && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 z-50 min-w-[180px] animate-fade-in">
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { handleUndo(); setMenuOpen(null) }}>
                <Undo className="w-4 h-4" /> Undo
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { handleRedo(); setMenuOpen(null) }}>
                <Redo className="w-4 h-4" /> Redo
              </button>
              <hr className="my-1 border-gray-200" />
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { editorRef.current?.view && openSearchPanel(editorRef.current.view); setMenuOpen(null) }}>
                <Search className="w-4 h-4" /> Find
              </button>
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { setShowFindReplace(true); setMenuOpen(null) }}>
                <Replace className="w-4 h-4" /> Find & Replace
              </button>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button
            className="btn btn-ghost flex items-center gap-1"
            onClick={() => setMenuOpen(menuOpen === 'help' ? null : 'help')}
          >
            Help
            <ChevronDown className="w-3 h-3" />
          </button>
          {menuOpen === 'help' && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 z-50 min-w-[180px] animate-fade-in">
              <button className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2" onClick={() => { setShowAbout(true); setMenuOpen(null) }}>
                <Info className="w-4 h-4" /> About
              </button>
              <a href="https://typst.app/docs" target="_blank" rel="noopener noreferrer" className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Typst Docs
              </a>
            </div>
          )}
        </div>

        <div className="toolbar-divider" />

        {/* Quick Actions */}
        <button className="btn btn-ghost p-2" onClick={handleUndo} title="Undo (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </button>
        <button className="btn btn-ghost p-2" onClick={handleRedo} title="Redo (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </button>

        <div className="toolbar-divider" />

        <button className="btn btn-ghost p-2" onClick={() => editorRef.current?.view && openSearchPanel(editorRef.current.view)} title="Find (Ctrl+F)">
          <Search className="w-4 h-4" />
        </button>
        <button className="btn btn-ghost p-2" onClick={() => setShowFindReplace(v => !v)} title="Find & Replace (Ctrl+H)">
          <Replace className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        <button className="btn btn-ghost flex items-center gap-1" onClick={handleSave}>
          <Save className="w-4 h-4" /> Save
        </button>
        <button className="btn btn-outline flex items-center gap-1" onClick={() => setShowTemplates(true)}>
          <LayoutTemplate className="w-4 h-4" /> Templates
        </button>
        <button className="btn btn-primary flex items-center gap-1" onClick={() => handleExport('pdf')}>
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </div>

      {/* Find/Replace Bar */}
      {showFindReplace && (
        <div className="px-4 py-2 bg-stone-100 border-b border-gray-200 flex items-center gap-2 animate-fade-in">
          <input
            type="text"
            placeholder="Find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm flex-1 max-w-xs"
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm flex-1 max-w-xs"
          />
          <button className="btn btn-outline" onClick={handleReplace}>Replace All</button>
          <button className="btn btn-ghost p-1" onClick={() => setShowFindReplace(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="h-8 bg-stone-100 border-b border-gray-200 flex items-center px-3 gap-2">
              <FileCode className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Editor</span>
              <span className="text-xs text-gray-400">— {fileName}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodeMirror
                ref={editorRef}
                value={content}
                height="100%"
                theme={githubLight}
                extensions={[typstLanguage, history(), search(), keymap.of([...historyKeymap, ...searchKeymap])]}
                onChange={setContent}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  highlightActiveLine: true,
                  foldGutter: true,
                  bracketMatching: true,
                  closeBrackets: true,
                }}
              />
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-500 transition-colors" />

        <Panel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="h-8 bg-stone-100 border-b border-gray-200 flex items-center px-3 gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</span>
              {isCompiling && <span className="text-xs text-blue-500">Compiling...</span>}
            </div>
            <div className="flex-1 overflow-auto bg-white p-4">
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            </div>
          </div>
        </Panel>
      </PanelGroup>

      {/* Status Bar */}
      <div className="h-6 bg-stone-100 border-t border-gray-200 flex items-center px-3 text-xs text-gray-500">
        <span>Rapid Typst</span>
        <span className="mx-2">|</span>
        <span>{content.split('\n').length} lines</span>
        <span className="mx-2">|</span>
        <span>{content.length} characters</span>
        {currentFile && (
          <>
            <span className="mx-2">|</span>
            <span>{currentFile}</span>
          </>
        )}
      </div>

      {/* Dialogs */}
      {showTemplates && (
        <TemplateGallery
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {showAbout && (
        <AboutDialog onClose={() => setShowAbout(false)} />
      )}

      {/* Click outside to close menus */}
      {menuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(null)} />
      )}

      <Toaster position="bottom-right" />
    </div>
  )
}
