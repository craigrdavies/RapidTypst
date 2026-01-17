use std::collections::HashMap;
use std::sync::OnceLock;
use comemo::Prehashed;
use typst::diag::{FileError, FileResult};
use typst::foundations::{Bytes, Datetime};
use typst::syntax::{FileId, Source, VirtualPath};
use typst::text::{Font, FontBook};
use typst::Library;
use typst::World;
use std::path::Path;

/// A simple world implementation for Typst compilation
struct SimpleWorld {
    library: Prehashed<Library>,
    book: Prehashed<FontBook>,
    fonts: Vec<Font>,
    source: Source,
}

impl SimpleWorld {
    fn new(content: &str) -> Self {
        // Load system fonts
        let mut fonts = Vec::new();
        let mut book = FontBook::new();
        
        // Try to load fonts from common system locations
        let font_paths = get_font_paths();
        
        for path in font_paths {
            if let Ok(data) = std::fs::read(&path) {
                let buffer = Bytes::from(data);
                for font in Font::iter(buffer) {
                    book.push(font.info().clone());
                    fonts.push(font);
                }
            }
        }
        
        // Create source from content
        let source = Source::detached(content);
        
        SimpleWorld {
            library: Prehashed::new(Library::default()),
            book: Prehashed::new(book),
            fonts,
            source,
        }
    }
}

fn get_font_paths() -> Vec<std::path::PathBuf> {
    let mut paths = Vec::new();
    
    #[cfg(target_os = "windows")]
    {
        if let Some(windir) = std::env::var_os("WINDIR") {
            let fonts_dir = Path::new(&windir).join("Fonts");
            if let Ok(entries) = std::fs::read_dir(&fonts_dir) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.extension().map(|e| e == "ttf" || e == "otf" || e == "ttc").unwrap_or(false) {
                        paths.push(path);
                    }
                }
            }
        }
    }
    
    #[cfg(target_os = "macos")]
    {
        let font_dirs = [
            "/System/Library/Fonts",
            "/Library/Fonts",
        ];
        for dir in font_dirs {
            if let Ok(entries) = std::fs::read_dir(dir) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.extension().map(|e| e == "ttf" || e == "otf" || e == "ttc").unwrap_or(false) {
                        paths.push(path);
                    }
                }
            }
        }
        if let Some(home) = dirs::home_dir() {
            let user_fonts = home.join("Library/Fonts");
            if let Ok(entries) = std::fs::read_dir(&user_fonts) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.extension().map(|e| e == "ttf" || e == "otf" || e == "ttc").unwrap_or(false) {
                        paths.push(path);
                    }
                }
            }
        }
    }
    
    #[cfg(target_os = "linux")]
    {
        let font_dirs = [
            "/usr/share/fonts",
            "/usr/local/share/fonts",
        ];
        for dir in font_dirs {
            collect_fonts_recursive(Path::new(dir), &mut paths);
        }
        if let Some(home) = dirs::home_dir() {
            let user_fonts = home.join(".local/share/fonts");
            collect_fonts_recursive(&user_fonts, &mut paths);
        }
    }
    
    paths
}

#[cfg(target_os = "linux")]
fn collect_fonts_recursive(dir: &Path, paths: &mut Vec<std::path::PathBuf>) {
    if let Ok(entries) = std::fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                collect_fonts_recursive(&path, paths);
            } else if path.extension().map(|e| e == "ttf" || e == "otf" || e == "ttc").unwrap_or(false) {
                paths.push(path);
            }
        }
    }
}

impl World for SimpleWorld {
    fn library(&self) -> &Prehashed<Library> {
        &self.library
    }

    fn book(&self) -> &Prehashed<FontBook> {
        &self.book
    }

    fn main(&self) -> Source {
        self.source.clone()
    }

    fn source(&self, id: FileId) -> FileResult<Source> {
        if id == self.source.id() {
            Ok(self.source.clone())
        } else {
            Err(FileError::NotFound(id.vpath().as_rootless_path().into()))
        }
    }

    fn file(&self, id: FileId) -> FileResult<Bytes> {
        Err(FileError::NotFound(id.vpath().as_rootless_path().into()))
    }

    fn font(&self, index: usize) -> Option<Font> {
        self.fonts.get(index).cloned()
    }

    fn today(&self, offset: Option<i64>) -> Option<Datetime> {
        let now = chrono::Local::now();
        let offset = offset.unwrap_or(0);
        let date = now.date_naive();
        Datetime::from_ymd(
            date.year(),
            date.month().try_into().ok()?,
            date.day().try_into().ok()?,
        )
    }
}

/// Compile Typst content to SVG pages
pub fn compile_to_svg(content: &str) -> Result<Vec<String>, String> {
    let world = SimpleWorld::new(content);
    
    match typst::compile(&world) {
        Ok(document) => {
            let svgs: Vec<String> = document
                .pages
                .iter()
                .map(|page| typst_svg::svg(page).to_string())
                .collect();
            Ok(svgs)
        }
        Err(errors) => {
            let error_messages: Vec<String> = errors
                .iter()
                .map(|e| format!("{}", e.message))
                .collect();
            Err(error_messages.join("\n"))
        }
    }
}

/// Compile Typst content to PDF and save to path
pub fn compile_to_pdf(content: &str, path: &str) -> Result<(), String> {
    let world = SimpleWorld::new(content);
    
    match typst::compile(&world) {
        Ok(document) => {
            let pdf_bytes = typst_pdf::pdf(&document, Default::default(), None);
            std::fs::write(path, pdf_bytes).map_err(|e| e.to_string())
        }
        Err(errors) => {
            let error_messages: Vec<String> = errors
                .iter()
                .map(|e| format!("{}", e.message))
                .collect();
            Err(error_messages.join("\n"))
        }
    }
}
