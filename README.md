<div align="center">

<h1><img src="./frontend/public/icons/48x48_trim.jpg" width="32" height="32" alt="logo" align="center" padding-bottom="5px" /> Rapid Typst</h1>

<h2> Create beautiful documents at the speed of thought</h2>

[![GitHub Stars](https://img.shields.io/github/stars/craigrdavies/RapidTypst?style=for-the-badge&logo=github&color=yellow)](https://github.com/craigrdavies/RapidTypst/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-Support-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/craigdavies)

A fast, modern web editor for [Typst](https://typst.app) — the new markup language that's simpler than LaTeX but just as powerful.

**Run locally for the best experience.** · [Report Bug](https://github.com/craigrdavies/RapidTypst/issues) · [Request Feature](https://github.com/craigrdavies/RapidTypst/issues)

![Rapid Typst Editor Screenshot](https://via.placeholder.com/900x500/FAFAF9/18181B?text=Rapid+Typst+Editor)

</div>

## 📑 Table of Contents

- [Why Rapid Typst?](#-why-rapid-typst)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Template Gallery](#-template-gallery)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 🤔 Why Rapid Typst?

### Typst vs LaTeX

| Feature | Typst | LaTeX |
|---------|-------|-------|
| Learning curve | **Minutes** | Weeks/Months |
| Compilation speed | **Instant** | Slow |
| Error messages | **Clear & helpful** | Cryptic |
| Modern syntax | **Yes** | No (1980s) |
| Math support | **Excellent** | Excellent |
| Package management | **Built-in** | Complex |

### Why use Rapid Typst?

- **No installation required** — Works in your browser
- **Instant preview** — See changes as you type
- **Export anywhere** — PDF, HTML, DOCX
- **Templates included** — Start productive immediately
- **Open source** — Free forever, customize as needed

## ✨ Features

<table>
<tr>
<td width="50%">

### 📝 Editor
- Typst syntax highlighting
- Line numbers & code folding
- Bracket matching & auto-close
- Multiple cursors/selections
- Find & replace with regex

</td>
<td width="50%">

### 👁️ Live Preview
- Real-time rendering
- SVG output (crisp at any zoom)
- Clear error messages
- Page-by-page display

</td>
</tr>
<tr>
<td width="50%">

### 📤 Export Options
- **PDF** — Print-ready documents
- **HTML** — Web publishing
- **DOCX** — Word compatible

</td>
<td width="50%">

### 💾 Document Management
- Save to cloud database
- Document list sidebar
- Quick open & delete
- Auto-save support

</td>
</tr>
<tr>
<td width="50%">

### 📋 Templates
- 8 professional templates
- Resume, academic, business
- Easy to customize
- Add your own templates

</td>
<td width="50%">

### ⚡ Productivity
- Keyboard shortcuts
- Status bar info
- Resizable panels
- Collapsible sidebar

</td>
</tr>
</table>

## 🖼️ Screenshots

<details>
<summary><b>Click to view screenshots</b></summary>

### Main Editor
Split-pane interface with editor on the left and live preview on the right.

![Editor View](https://via.placeholder.com/800x450/FAFAF9/18181B?text=Editor+View)

### Template Gallery
Choose from 8 professional templates to get started quickly.

![Template Gallery](https://via.placeholder.com/800x450/FAFAF9/18181B?text=Template+Gallery)

### Math Rendering
Beautiful mathematical equations rendered in real-time.

![Math Preview](https://via.placeholder.com/800x450/FAFAF9/18181B?text=Math+Rendering)

### Export Options
Export your documents to PDF, HTML, or DOCX.

![Export Menu](https://via.placeholder.com/800x450/FAFAF9/18181B?text=Export+Options)

</details>

## 🏃 Getting Started

### Local Development Setup

<details>
<summary><b>Prerequisites</b></summary>

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| Python | 3.9+ | [python.org](https://python.org/) |
| MongoDB | 6+ | [mongodb.com](https://www.mongodb.com/try/download/community) |
| Typst CLI | Latest | [GitHub Releases](https://github.com/typst/typst/releases) |
| Yarn | 1.22+ | `npm install -g yarn` |

</details>

<details>
<summary><b>Step 1: Install Typst CLI</b></summary>

```bash
# macOS (Homebrew)
brew install typst

# Windows (winget)
winget install Typst.Typst

# Linux (manual)
curl -LO https://github.com/typst/typst/releases/latest/download/typst-x86_64-unknown-linux-musl.tar.xz
tar -xf typst-x86_64-unknown-linux-musl.tar.xz
sudo mv typst-x86_64-unknown-linux-musl/typst /usr/local/bin/

# Verify
typst --version
```

</details>

<details>
<summary><b>Step 2: Clone & Setup Backend</b></summary>

### Windows (PowerShell)

```powershell
# Clone repository
git clone https://github.com/craigrdavies/RapidTypst.git
cd RapidTypst\backend

# Create & activate venv
python -m venv venv
venv\Scripts\activate

# Install dependencies
python -m pip install -r requirements.txt

# Configure environment
@"
MONGO_URL=mongodb://localhost:27017
DB_NAME=rapid_typst
"@ | Set-Content -NoNewline .env

# Start backend (keep running)
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Linux / macOS (bash)

```bash
# Clone repository
git clone https://github.com/craigrdavies/RapidTypst.git
cd RapidTypst/backend

# Create & activate venv
python3 -m venv venv
source venv/bin/activate

# Install dependencies
python -m pip install -r requirements.txt

# Configure environment
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=rapid_typst
EOF

# Start backend (keep running)
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

</details>

<details>
<summary><b>Step 3: Setup Frontend</b></summary>

### Windows (PowerShell)

```powershell
# New terminal window
cd RapidTypst\frontend

# Install dependencies
npm install

# Configure environment
echo REACT_APP_BACKEND_URL=http://localhost:8001 > .env

# Start frontend
npm start
```

### Linux / macOS (bash)

```bash
# New terminal window
cd RapidTypst/frontend

# Install dependencies
yarn install

# Configure environment
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
```

</details>

<details>
<summary><b>Step 4: Open App</b></summary>

🎉 Open [http://localhost:3000](http://localhost:3000) and start creating!

</details>

<details>
<summary><b>Troubleshooting</b></summary>

| Problem | Solution |
|---------|----------|
| `MongoDB connection failed` | Start MongoDB: `mongod` or `brew services start mongodb-community` |
| `typst: command not found` | Add Typst to PATH or reinstall |
| `Port 8001 in use` | Kill process: `lsof -ti:8001 \| xargs kill` |
| `CORS error` | Ensure backend runs on port 8001 |
| `Module not found` | Run `pip install -r requirements.txt` again |

</details>

## 📋 Template Gallery

| Template | Best For | Includes |
|----------|----------|----------|
| **📄 Blank** | Starting fresh | Empty document |
| **📝 Basic Document** | Learning Typst | Headings, lists, formatting, links |
| **💼 Resume / CV** | Job applications | Contact info, experience, education, skills |
| **🎓 Academic Paper** | Research & theses | Abstract, sections, figures, tables, citations |
| **✉️ Formal Letter** | Business correspondence | Letterhead, addresses, date, signature |
| **📊 Business Report** | Corporate documents | Executive summary, KPIs, charts, recommendations |
| **🔢 Math Notes** | STEM courses | Theorems, proofs, equations, identities |
| **💻 Code Documentation** | Technical writing | API docs, code blocks, tables, examples |

### Adding Custom Templates

```bash
# 1. Create your template
echo '= My Template\n\nContent here...' > backend/templates/my-template.typ

# 2. Add to metadata.json
{
  "id": "my-template",
  "name": "My Template",
  "description": "Description here",
  "icon": "FileText",
  "category": "Custom",
  "filename": "my-template.typ"
}

# 3. Restart backend
```

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Save document | `Ctrl + S` | `⌘ + S` |
| Find text | `Ctrl + F` | `⌘ + F` |
| Find & replace | `Ctrl + H` | `⌘ + H` |
| Undo | `Ctrl + Z` | `⌘ + Z` |
| Redo | `Ctrl + Y` | `⌘ + Shift + Z` |
| Select all | `Ctrl + A` | `⌘ + A` |

## 📁 Project Structure

```
RapidTypst/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── templates/          # Typst template files
│   │   ├── metadata.json   # Template metadata
│   │   ├── basic.typ
│   │   ├── resume.typ
│   │   └── ...
│   └── .env               # Environment config
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React app
│   │   ├── pages/
│   │   │   ├── EditorPage.jsx
│   │   │   └── AboutPage.jsx
│   │   └── components/    # UI components
│   ├── package.json
│   └── .env              # Frontend config
└── README.md
```

## 🔌 API Reference

<details>
<summary><b>View API Endpoints</b></summary>

### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/documents` | List all documents |
| `GET` | `/api/documents/:id` | Get document by ID |
| `POST` | `/api/documents` | Create new document |
| `PUT` | `/api/documents/:id` | Update document |
| `DELETE` | `/api/documents/:id` | Delete document |

### Compilation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/compile` | Compile Typst to HTML/SVG preview |
| `POST` | `/api/export/pdf` | Export as PDF |
| `POST` | `/api/export/html` | Export as HTML |
| `POST` | `/api/export/docx` | Export as DOCX |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/templates` | List all templates |
| `GET` | `/api/templates/:id` | Get template content |

</details>

## 🗺️ Roadmap

- [x] Core editor with syntax highlighting
- [x] Live preview
- [x] PDF/HTML/DOCX export
- [x] Template gallery
- [x] Document save/load
- [x] Find & replace
- [ ] **Dark theme**
- [ ] **Auto-save**
- [ ] **Vim/Emacs key bindings**
- [ ] **Collaborative editing**
- [ ] **Desktop app (Tauri)** — Coming soon!
- [ ] **Custom fonts upload**
- [ ] **Image upload**
- [ ] **Version history**

## 🤝 Contributing

Contributions make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions

- 🐛 Bug fixes
- 📝 New templates
- 🌍 Translations
- 📖 Documentation improvements
- ✨ New features from the roadmap

## ☕ Support

<div align="center">

If Rapid Typst saves you time, consider buying me a coffee!

<a href="https://buymeacoffee.com/craigdavies">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60">
</a>

**Other ways to support:**
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with others

</div>

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2025 Craig Davies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Acknowledgments

- [Typst](https://typst.app) — The amazing markup language
- [CodeMirror](https://codemirror.net/) — Powerful code editor
- [FastAPI](https://fastapi.tiangolo.com/) — Modern Python web framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful UI components
- [Lucide Icons](https://lucide.dev/) — Clean icon set

<div align="center">

**[⬆ Back to Top](#-rapid-typst)**

Made with ❤️ by [Craig Davies](https://github.com/craigrdavies)

<sub>If you found this project helpful, please consider giving it a ⭐</sub>

</div>
