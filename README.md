# Rapid Typst

<div align="center">

![Rapid Typst](https://img.shields.io/badge/Rapid-Typst-0047FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOHoiLz48cG9seWxpbmUgcG9pbnRzPSIxNCAyIDE0IDggMjAgOCIvPjxsaW5lIHgxPSIxNiIgeTE9IjEzIiB4Mj0iOCIgeTI9IjEzIi8+PGxpbmUgeDE9IjE2IiB5MT0iMTciIHgyPSI4IiB5Mj0iMTciLz48cG9seWxpbmUgcG9pbnRzPSIxMCA5IDkgOSA4IDkiLz48L3N2Zz4=)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://typst-converter.preview.emergentagent.com)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a-Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/craigdavies)

**A fast, modern web editor for the Typst markup language with live preview.**

[Live Demo](https://typst-converter.preview.emergentagent.com) • [Report Bug](https://github.com/craigrdavies/RapidTypst/issues) • [Request Feature](https://github.com/craigrdavies/RapidTypst/issues)

</div>

---

## ✨ Features

### Editor
- **Syntax Highlighting** — Full Typst syntax highlighting with CodeMirror
- **Line Numbers** — Easy navigation with numbered lines
- **Bracket Matching** — Automatic bracket and parenthesis matching
- **Code Folding** — Collapse sections for better overview
- **Multiple Selection** — Edit multiple locations simultaneously

### Preview
- **Live Preview** — Real-time document rendering as you type
- **SVG Output** — Crisp, scalable preview at any zoom level
- **Error Display** — Clear compilation error messages with line numbers

### Export
- **PDF Export** — Publication-ready PDF documents
- **HTML Export** — Web-ready HTML with embedded styles
- **DOCX Export** — Microsoft Word compatible documents

### Document Management
- **Save & Load** — Persistent document storage with MongoDB
- **Document List** — Sidebar with all your saved documents
- **Quick Delete** — Easy document cleanup

### Productivity
- **Template Gallery** — 8 pre-built templates for common document types
- **Find & Replace** — Search and replace text across your document
- **Undo/Redo** — Full history support
- **Keyboard Shortcuts** — Familiar shortcuts (Ctrl+S, Ctrl+F, Ctrl+H)
- **Status Bar** — Line count, character count, document name

## 🖼️ Screenshots

<div align="center">

| Editor View | Template Gallery |
|:-----------:|:----------------:|
| ![Editor](https://via.placeholder.com/400x250/FAFAF9/18181B?text=Editor+View) | ![Templates](https://via.placeholder.com/400x250/FAFAF9/18181B?text=Template+Gallery) |

</div>

## 🚀 Live Demo

Try Rapid Typst now: **[https://typst-converter.preview.emergentagent.com](https://typst-converter.preview.emergentagent.com)**

## 📖 What is Typst?

[Typst](https://typst.app) is a new markup-based typesetting system designed to be as powerful as LaTeX while being much easier to learn and use. It's perfect for:

- Academic papers and theses
- Resumes and CVs
- Letters and reports
- Technical documentation
- Mathematical documents

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | `Ctrl + S` |
| Find | `Ctrl + F` |
| Find & Replace | `Ctrl + H` |
| Undo | `Ctrl + Z` |
| Redo | `Ctrl + Y` |

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, CodeMirror, shadcn/ui
- **Backend:** FastAPI (Python), Typst CLI
- **Database:** MongoDB

## 🏃 Running Locally

### Prerequisites

- Node.js 18+
- Python 3.9+
- MongoDB
- [Typst CLI](https://github.com/typst/typst/releases)

### Installation

```bash
# Clone the repository
git clone https://github.com/craigrdavies/RapidTypst.git
cd RapidTypst

# Install Typst CLI (macOS)
brew install typst

# Or on Windows
winget install Typst.Typst

# Backend setup
cd backend
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017" > .env
echo "DB_NAME=rapid_typst" >> .env

# Start backend
uvicorn server:app --reload --port 8001

# Frontend setup (new terminal)
cd frontend
yarn install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📋 Templates Included

- **Basic Document** — Simple formatting examples
- **Resume / CV** — Professional resume layout
- **Academic Paper** — Research paper format with citations
- **Formal Letter** — Business correspondence
- **Business Report** — Executive summary format
- **Math Notes** — Equations, theorems, and proofs
- **Code Documentation** — Technical documentation

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ☕ Support

If Rapid Typst helps you create documents faster, consider supporting development:

<a href="https://buymeacoffee.com/craigdavies" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Typst Documentation](https://typst.app/docs)
- [Typst GitHub](https://github.com/typst/typst)
- [Report Issues](https://github.com/craigrdavies/RapidTypst/issues)

---

<div align="center">

Made with ❤️ by [Craig Davies](https://github.com/craigrdavies)

</div>
