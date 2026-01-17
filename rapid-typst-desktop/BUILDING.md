# Rapid Typst Desktop - Tauri App

This is a complete Tauri project for building a native desktop Typst editor.

## Quick Start

```bash
# 1. Install dependencies
cd frontend && npm install && cd ..

# 2. Run in development
cargo tauri dev

# 3. Build for production
cargo tauri build
```

## Project Structure

```
rapid-typst-desktop/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx    # Main app component
│   │   ├── components/
│   │   │   ├── TemplateGallery.jsx
│   │   │   └── AboutDialog.jsx
│   │   └── index.css
│   └── package.json
├── src-tauri/          # Rust backend
│   ├── src/
│   │   ├── main.rs
│   │   ├── commands.rs  # Tauri IPC commands
│   │   └── typst_compiler.rs  # Typst compilation
│   ├── Cargo.toml
│   └── tauri.conf.json
├── templates/          # Typst template files
└── README.md
```

## Features

- **Offline Typst compilation** - No server needed
- **Native file dialogs** - Open/Save/Export
- **Live preview** - Real-time document rendering
- **Template gallery** - Pre-built document templates
- **Recent files** - Quick access to recent documents
- **Keyboard shortcuts** - Ctrl+S, Ctrl+O, Ctrl+N, etc.

## Building for Distribution

```bash
# Windows (creates .msi installer)
cargo tauri build --target x86_64-pc-windows-msvc

# macOS (creates .dmg)
cargo tauri build --target x86_64-apple-darwin

# Linux (creates .deb and .AppImage)
cargo tauri build --target x86_64-unknown-linux-gnu
```

## Notes

1. **Icons**: Replace placeholder icons in `src-tauri/icons/` with real icons before building
2. **Code signing**: For distribution, set up code signing in `tauri.conf.json`
3. **Auto-updater**: Enable in `tauri.conf.json` if you want automatic updates
