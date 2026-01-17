import { X, Zap, ExternalLink, Coffee } from 'lucide-react'

export default function AboutDialog({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">About Rapid Typst</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Fast & Offline
            </div>
            <h1 className="text-3xl font-black mb-2">Rapid Typst</h1>
            <p className="text-gray-500">Version 1.0.0</p>
          </div>

          <p className="text-gray-600 text-center mb-6">
            A native desktop editor for the Typst markup language with live preview and multiple export formats.
          </p>

          <div className="bg-gray-50 rounded p-4 mb-6">
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full offline operation</li>
              <li>• Live preview as you type</li>
              <li>• Export to PDF, HTML, SVG</li>
              <li>• Template gallery</li>
              <li>• Native file dialogs</li>
            </ul>
          </div>

          {/* Buy Me a Coffee */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-3">Enjoying Rapid Typst? Consider supporting development:</p>
            <a
              href="https://buymeacoffee.com/craigdavies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-medium rounded-full transition-colors"
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </a>
          </div>

          <div className="text-center">
            <a
              href="https://typst.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Typst Documentation
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  )
}
