# Rapid Typst Desktop

A native desktop application for the Typst markup language, built with Tauri + React.

## Features

- 🚀 **Offline Operation** - Typst compilation runs locally, no internet required
- ⚡ **Fast & Lightweight** - ~10MB app size thanks to Tauri
- 📁 **Native File Dialogs** - Open, save, and export with system dialogs
- 🔄 **Live Preview** - Real-time document preview as you type
- 📤 **Export Options** - PDF, HTML, and DOCX export
- 📝 **Template Gallery** - Pre-built templates for common document types
- ⌨️ **Keyboard Shortcuts** - Familiar shortcuts for efficient editing

## Prerequisites

### Windows
1. [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually pre-installed on Windows 10/11)
3. [Rust](https://rustup.rs/)
4. [Node.js](https://nodejs.org/) (v18+)

### macOS
1. Xcode Command Line Tools: `xcode-select --install`
2. [Rust](https://rustup.rs/)
3. [Node.js](https://nodejs.org/) (v18+)

### Linux
1. System dependencies:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
   ```
2. [Rust](https://rustup.rs/)
3. [Node.js](https://nodejs.org/) (v18+)

## Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rapid-typst-desktop.git
cd rapid-typst-desktop

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install Tauri CLI (if not already installed)
cargo install tauri-cli

# Run in development mode
cargo tauri dev

# Build for production
cargo tauri build
```

## Project Structure

```
rapid-typst-desktop/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── templates/     # Embedded templates
│   ├── package.json
│   └── vite.config.js
├── src-tauri/             # Tauri/Rust backend
│   ├── src/
│   │   ├── main.rs        # Entry point
│   │   ├── commands.rs    # Tauri commands
│   │   └── typst.rs       # Typst compilation
│   ├── Cargo.toml
│   └── tauri.conf.json
└── README.md
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Full App Development
```bash
cargo tauri dev
```

### Building

```bash
# Build for current platform
cargo tauri build

# Output locations:
# Windows: src-tauri/target/release/bundle/msi/
# macOS: src-tauri/target/release/bundle/dmg/
# Linux: src-tauri/target/release/bundle/deb/ or /appimage/
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | Ctrl+S |
| Open | Ctrl+O |
| New Document | Ctrl+N |
| Find | Ctrl+F |
| Find & Replace | Ctrl+H |
| Export PDF | Ctrl+Shift+E |
| Undo | Ctrl+Z |
| Redo | Ctrl+Y |

## License

MIT
