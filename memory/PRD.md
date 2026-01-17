# Rapid Typst PRD

## Original Problem Statement
Build a Typst markup editor that allows users to enter Typst syntax and see a live preview. Export options for PDF, HTML, and DOCX. Full editor features including file management, undo/redo, and find/replace.

## User Personas
- **Writers & Authors**: Creating documents with professional typography
- **Academics**: Writing papers, theses with math equations
- **Developers**: Documentation with code snippets

## Core Requirements (Static)
1. Typst code editor with syntax highlighting
2. Live preview panel (server-side rendering)
3. Export to PDF, HTML, DOCX
4. File management (save/load documents)
5. Undo/redo operations
6. Find and replace functionality
7. Desktop-first responsive design
8. Light theme

## What's Been Implemented (January 2025)
- ✅ Split-pane editor with CodeMirror (Typst syntax highlighting)
- ✅ Live preview using Typst CLI (SVG rendering)
- ✅ Export to PDF, HTML, DOCX
- ✅ Document CRUD with MongoDB persistence
- ✅ Undo/redo via CodeMirror history
- ✅ Find (Ctrl+F) and Find & Replace panel
- ✅ Collapsible document sidebar
- ✅ Keyboard shortcuts (Ctrl+S save, Ctrl+F find, Ctrl+H replace)
- ✅ Status bar with line/character count
- ✅ Toast notifications
- ✅ Swiss design with Chivo, Public Sans, JetBrains Mono fonts
- ✅ Template Gallery with 8 templates:
  - Blank Document
  - Basic Document (formatting examples)
  - Resume/CV (professional layout)
  - Academic Paper (research paper format)
  - Formal Letter (business correspondence)
  - Business Report (executive summary format)
  - Math Notes (equations, theorems, proofs)
  - Code Documentation (API docs, technical writing)

## Tech Stack
- Backend: FastAPI + Python typst package + Typst CLI
- Frontend: React + CodeMirror + Tailwind CSS + shadcn/ui
- Database: MongoDB

## Prioritized Backlog

### P0 (Critical)
- All implemented ✅

### P1 (Important)
- Dark theme toggle
- Multiple tabs support
- Auto-save functionality
- Syntax error highlighting in editor

### P2 (Nice to Have)
- Template library
- Collaborative editing
- Version history
- Custom font uploads
- Keyboard shortcuts panel

## Next Tasks
1. Add dark theme toggle
2. Implement auto-save with debounce
3. Add template library for common document types
