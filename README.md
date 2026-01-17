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

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://python.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Typst CLI** ([Releases](https://github.com/typst/typst/releases))

### Step 1: Install Typst CLI

```bash
# macOS (Homebrew)
brew install typst

# Windows (winget)
winget install Typst.Typst

# Linux (download binary)
curl -LO https://github.com/typst/typst/releases/latest/download/typst-x86_64-unknown-linux-musl.tar.xz
tar -xf typst-x86_64-unknown-linux-musl.tar.xz
sudo mv typst-x86_64-unknown-linux-musl/typst /usr/local/bin/

# Verify installation
typst --version
```

### Step 2: Clone Repository

```bash
git clone https://github.com/craigrdavies/RapidTypst.git
cd RapidTypst
```

### Step 3: Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=rapid_typst
EOF

# Start backend server
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Step 4: Frontend Setup

```bash
# Open new terminal, navigate to project
cd RapidTypst/frontend

# Install dependencies
yarn install

# Create environment file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
```

### Step 5: Open App

Navigate to [http://localhost:3000](http://localhost:3000)

### Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` or start MongoDB service |
| Typst not found | Add Typst to PATH or reinstall |
| Port already in use | Change port in uvicorn command or kill existing process |
| CORS errors | Ensure backend is running on port 8001 |

## 📋 Template Gallery

Start quickly with professionally designed templates:

| Template | Description | Use Case |
|----------|-------------|----------|
| **Blank Document** | Empty canvas to start fresh | Any document |
| **Basic Document** | Headings, lists, formatting examples | Learning Typst, general documents |
| **Resume / CV** | Professional two-column layout with sections for experience, education, skills | Job applications |
| **Academic Paper** | Research paper format with abstract, numbered sections, figure/table captions | Theses, journal submissions, research |
| **Formal Letter** | Business letter with proper formatting, date, addresses | Official correspondence |
| **Business Report** | Executive summary, KPI cards, data tables, recommendations | Quarterly reports, analysis |
| **Math Notes** | Theorems, proofs, equations, trigonometric identities | Lecture notes, homework |
| **Code Documentation** | API reference, code blocks, configuration tables | Technical docs, READMEs |

### Adding Custom Templates

Templates are stored as `.typ` files in `/backend/templates/`. To add your own:

1. Create a new `.typ` file in the templates folder
2. Add metadata to `/backend/templates/metadata.json`
3. Restart the backend server

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
