import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  FileText,
  Save,
  Download,
  Undo,
  Redo,
  Search,
  Replace,
  Plus,
  Trash2,
  ChevronDown,
  X,
  FileCode,
  Eye,
  Menu,
  FileType,
  File,
  LayoutTemplate,
  GraduationCap,
  Briefcase,
  Mail,
  FileBarChart,
  BookOpen,
  Code,
  Calculator,
  Loader2,
  HelpCircle,
  Info,
  ExternalLink,
} from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { StreamLanguage } from '@codemirror/language';
import { searchKeymap, search, openSearchPanel } from '@codemirror/search';
import { history, historyKeymap, undo, redo } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Simple Typst-like syntax highlighting
const typstLanguage = StreamLanguage.define({
  token(stream) {
    if (stream.match(/\/\/.*/)) return 'comment';
    if (stream.match(/\/\*/)) {
      while (!stream.match(/\*\//)) {
        if (stream.next() == null) break;
      }
      return 'comment';
    }
    if (stream.sol() && stream.match(/=+\s/)) return 'heading';
    if (stream.match(/\*[^*]+\*/)) return 'strong';
    if (stream.match(/_[^_]+_/)) return 'emphasis';
    if (stream.match(/`[^`]+`/)) return 'string';
    if (stream.match(/#[a-zA-Z_][a-zA-Z0-9_]*/)) return 'keyword';
    if (stream.match(/\$[^$]+\$/)) return 'variable';
    if (stream.match(/[\[\](){}]/)) return 'bracket';
    stream.next();
    return null;
  },
});

// Icon mapping for templates loaded from API
const iconMap = {
  FileText,
  BookOpen,
  Briefcase,
  GraduationCap,
  Mail,
  FileBarChart,
  Calculator,
  Code,
};

const defaultTypstContent = `// Welcome to Rapid Typst!
// Start writing your document below

= My First Document

This is a paragraph with *bold* and _italic_ text.

== Section One

Here's some content for the first section.

- List item one
- List item two
- List item three

== Section Two

You can use math: $x^2 + y^2 = z^2$

#align(center)[
  #text(size: 16pt, weight: "bold")[Centered Text]
]
`;

export default function EditorPage() {
  const [content, setContent] = useState(defaultTypstContent);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [showNewDocDialog, setShowNewDocDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  // Load templates when gallery is opened
  useEffect(() => {
    if (showTemplateGallery && templates.length === 0) {
      loadTemplates();
    }
  }, [showTemplateGallery, templates.length]);

  // Compile preview on content change with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      compilePreview();
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [content]);

  const loadDocuments = async () => {
    try {
      const response = await axios.get(`${API}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      setTemplatesLoading(true);
      const response = await axios.get(`${API}/templates`);
      setTemplates(response.data);
    } catch (error) {
      console.error('Failed to load templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setTemplatesLoading(false);
    }
  };

  const compilePreview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API}/compile`, { content });
      setPreview(response.data.html || '');
    } catch (error) {
      console.error('Compile error:', error);
      setPreview(`<div style="color: #DC2626; padding: 20px;">Failed to compile: ${error.message}</div>`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleUndo = () => {
    if (editorRef.current?.view) {
      undo(editorRef.current.view);
    }
  };

  const handleRedo = () => {
    if (editorRef.current?.view) {
      redo(editorRef.current.view);
    }
  };

  const handleFind = () => {
    if (editorRef.current?.view) {
      openSearchPanel(editorRef.current.view);
    }
  };

  const handleFindReplace = () => {
    setShowFindReplace(!showFindReplace);
  };

  const handleReplace = () => {
    if (findText && replaceText) {
      const newContent = content.replace(new RegExp(findText, 'g'), replaceText);
      setContent(newContent);
      toast.success(`Replaced all occurrences of "${findText}"`);
    }
  };

  const handleReplaceOne = () => {
    if (findText && replaceText) {
      const newContent = content.replace(findText, replaceText);
      if (newContent !== content) {
        setContent(newContent);
        toast.success('Replaced one occurrence');
      } else {
        toast.info('No match found');
      }
    }
  };

  const handleNewDocument = () => {
    setShowNewDocDialog(true);
    setNewDocTitle('');
  };

  const createNewDocument = async () => {
    if (!newDocTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }
    try {
      const response = await axios.post(`${API}/documents`, {
        title: newDocTitle,
        content: defaultTypstContent,
      });
      setDocuments([...documents, response.data]);
      setCurrentDoc(response.data);
      setContent(response.data.content);
      setShowNewDocDialog(false);
      toast.success('Document created');
    } catch (error) {
      toast.error('Failed to create document');
    }
  };

  const handleSaveDocument = async () => {
    if (currentDoc) {
      try {
        await axios.put(`${API}/documents/${currentDoc.id}`, { content });
        toast.success('Document saved');
        loadDocuments();
      } catch (error) {
        toast.error('Failed to save document');
      }
    } else {
      setShowSaveDialog(true);
      setNewDocTitle('');
    }
  };

  const saveAsNewDocument = async () => {
    if (!newDocTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }
    try {
      const response = await axios.post(`${API}/documents`, {
        title: newDocTitle,
        content,
      });
      setDocuments([...documents, response.data]);
      setCurrentDoc(response.data);
      setShowSaveDialog(false);
      toast.success('Document saved');
    } catch (error) {
      toast.error('Failed to save document');
    }
  };

  const handleOpenDocument = (doc) => {
    setCurrentDoc(doc);
    setContent(doc.content);
    toast.success(`Opened "${doc.title}"`);
  };

  const handleDeleteDocument = async (doc, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API}/documents/${doc.id}`);
      setDocuments(documents.filter((d) => d.id !== doc.id));
      if (currentDoc?.id === doc.id) {
        setCurrentDoc(null);
        setContent(defaultTypstContent);
      }
      toast.success('Document deleted');
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  const handleExport = async (format) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API}/export/${format}`,
        { content, format },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Export failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = async (template) => {
    try {
      const response = await axios.get(`${API}/templates/${template.id}`);
      setContent(response.data.content);
      setCurrentDoc(null);
      setShowTemplateGallery(false);
      toast.success(`Loaded "${template.name}" template`);
    } catch (error) {
      toast.error('Failed to load template');
    }
  };

  const templateCategories = ['All', ...new Set(templates.map((t) => t.category))];

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDocument();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handleFind();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        handleFindReplace();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, currentDoc]);

  return (
    <div className="editor-container h-screen flex flex-col" data-testid="editor-page">
      {/* Toolbar */}
      <div className="toolbar" data-testid="toolbar">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          data-testid="toggle-sidebar-btn"
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="file-menu-btn" className="h-8 gap-1">
                <File className="h-4 w-4" />
                File
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleNewDocument} data-testid="new-doc-menu-item">
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTemplateGallery(true)} data-testid="templates-menu-item">
                <LayoutTemplate className="h-4 w-4 mr-2" />
                Templates Gallery
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSaveDocument} data-testid="save-doc-menu-item">
                <Save className="h-4 w-4 mr-2" />
                Save
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport('pdf')} data-testid="export-pdf-menu-item">
                <FileType className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')} data-testid="export-html-menu-item">
                <FileCode className="h-4 w-4 mr-2" />
                Export as HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('docx')} data-testid="export-docx-menu-item">
                <FileText className="h-4 w-4 mr-2" />
                Export as DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="edit-menu-btn" className="h-8 gap-1">
                Edit
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleUndo} data-testid="undo-menu-item">
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRedo} data-testid="redo-menu-item">
                <Redo className="h-4 w-4 mr-2" />
                Redo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleFind} data-testid="find-menu-item">
                <Search className="h-4 w-4 mr-2" />
                Find
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFindReplace} data-testid="replace-menu-item">
                <Replace className="h-4 w-4 mr-2" />
                Find & Replace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="help-menu-btn" className="h-8 gap-1">
                Help
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild data-testid="about-menu-item">
                <Link to="/about">
                  <Info className="h-4 w-4 mr-2" />
                  About Rapid Typst
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild data-testid="typst-docs-menu-item">
                <a href="https://typst.app/docs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Typst Documentation
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button variant="ghost" size="icon" onClick={handleUndo} title="Undo (Ctrl+Z)" data-testid="undo-btn" className="h-8 w-8">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRedo} title="Redo (Ctrl+Y)" data-testid="redo-btn" className="h-8 w-8">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button variant="ghost" size="icon" onClick={handleFind} title="Find (Ctrl+F)" data-testid="find-btn" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleFindReplace} title="Find & Replace (Ctrl+H)" data-testid="find-replace-btn" className="h-8 w-8">
            <Replace className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1" />

        <div className="toolbar-group">
          <Button variant="ghost" size="sm" onClick={handleSaveDocument} data-testid="save-btn" className="h-8 gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>

          <Button variant="outline" size="sm" onClick={() => setShowTemplateGallery(true)} data-testid="templates-btn" className="h-8 gap-1">
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" data-testid="export-btn" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('pdf')} data-testid="export-pdf-btn">PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')} data-testid="export-html-btn">HTML</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('docx')} data-testid="export-docx-btn">DOCX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Find/Replace Panel */}
      {showFindReplace && (
        <div className="find-replace-panel animate-fade-in" data-testid="find-replace-panel">
          <div className="flex items-center gap-2">
            <Input placeholder="Find..." value={findText} onChange={(e) => setFindText(e.target.value)} className="flex-1 h-8" data-testid="find-input" />
            <Input placeholder="Replace with..." value={replaceText} onChange={(e) => setReplaceText(e.target.value)} className="flex-1 h-8" data-testid="replace-input" />
            <Button variant="outline" size="sm" onClick={handleReplaceOne} data-testid="replace-one-btn" className="h-8">Replace</Button>
            <Button variant="outline" size="sm" onClick={handleReplace} data-testid="replace-all-btn" className="h-8">Replace All</Button>
            <Button variant="ghost" size="icon" onClick={() => setShowFindReplace(false)} data-testid="close-find-replace-btn" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="file-sidebar animate-fade-in" data-testid="file-sidebar">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Documents</span>
              <Button variant="ghost" size="icon" onClick={handleNewDocument} data-testid="new-doc-btn" className="h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              {documents.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">No documents yet</div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`file-item ${currentDoc?.id === doc.id ? 'active' : ''}`}
                    onClick={() => handleOpenDocument(doc)}
                    data-testid={`doc-item-${doc.id}`}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm">{doc.title}</span>
                    <Button variant="ghost" size="icon" onClick={(e) => handleDeleteDocument(doc, e)} className="h-6 w-6 opacity-0 group-hover:opacity-100" data-testid={`delete-doc-${doc.id}`}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        )}

        {/* Editor and Preview */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Editor</span>
                {currentDoc && <span className="text-xs text-muted-foreground ml-2">— {currentDoc.title}</span>}
              </div>
              <div className="flex-1 overflow-hidden" data-testid="code-editor">
                <CodeMirror
                  ref={editorRef}
                  value={content}
                  height="100%"
                  theme={githubLight}
                  extensions={[typstLanguage, history(), search(), keymap.of([...historyKeymap, ...searchKeymap])]}
                  onChange={handleContentChange}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: false,
                    rectangularSelection: true,
                    crosshairCursor: false,
                    highlightSelectionMatches: true,
                  }}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</span>
                {isLoading && <span className="text-xs text-accent ml-2">Compiling...</span>}
              </div>
              <ScrollArea className="flex-1 preview-container" data-testid="preview-panel">
                <div className="preview-content p-4" dangerouslySetInnerHTML={{ __html: preview }} />
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="status-bar" data-testid="status-bar">
        <span>Rapid Typst</span>
        <span className="mx-2">|</span>
        <span>{content.split('\n').length} lines</span>
        <span className="mx-2">|</span>
        <span>{content.length} characters</span>
        {currentDoc && (
          <>
            <span className="mx-2">|</span>
            <span>{currentDoc.title}</span>
          </>
        )}
      </div>

      {/* New Document Dialog */}
      <Dialog open={showNewDocDialog} onOpenChange={setShowNewDocDialog}>
        <DialogContent data-testid="new-doc-dialog">
          <DialogHeader>
            <DialogTitle>New Document</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Document title"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewDocument()}
              data-testid="new-doc-title-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDocDialog(false)}>Cancel</Button>
            <Button onClick={createNewDocument} data-testid="create-doc-btn">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Document Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent data-testid="save-doc-dialog">
          <DialogHeader>
            <DialogTitle>Save Document</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Document title"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveAsNewDocument()}
              data-testid="save-doc-title-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onClick={saveAsNewDocument} data-testid="save-new-doc-btn">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Gallery Dialog */}
      <Dialog open={showTemplateGallery} onOpenChange={setShowTemplateGallery}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col" data-testid="template-gallery-dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              Template Gallery
            </DialogTitle>
          </DialogHeader>

          {/* Category Tabs */}
          <div className="flex gap-2 border-b border-border pb-3">
            {templateCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`template-category-${category.toLowerCase()}`}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <ScrollArea className="flex-1 pr-4" data-testid="template-grid">
            {templatesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {filteredTemplates.map((template) => {
                  const IconComponent = iconMap[template.icon] || FileText;
                  return (
                    <div
                      key={template.id}
                      onClick={() => handleSelectTemplate(template)}
                      className="group cursor-pointer border border-border rounded-sm p-4 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                      data-testid={`template-${template.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-secondary rounded-sm group-hover:bg-accent/10 transition-colors">
                          <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm group-hover:text-accent transition-colors">{template.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                          <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-secondary rounded-sm text-muted-foreground">{template.category}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground flex-1">Click a template to load it into the editor</p>
            <Button variant="outline" onClick={() => setShowTemplateGallery(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
