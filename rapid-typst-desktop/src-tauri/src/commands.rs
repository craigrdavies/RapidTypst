use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::AppHandle;

use crate::typst_compiler;

#[derive(Debug, Serialize, Deserialize)]
pub struct CompileResult {
    pub success: bool,
    pub html: Option<String>,
    pub error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TemplateMetadata {
    pub id: String,
    pub name: String,
    pub description: String,
    pub icon: String,
    pub category: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TemplateContent {
    pub id: String,
    pub name: String,
    pub description: String,
    pub icon: String,
    pub category: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RecentFile {
    pub path: String,
    pub name: String,
    pub accessed_at: String,
}

// Embedded templates
const TEMPLATES: &[(&str, &str, &str, &str, &str, &str)] = &[
    ("blank", "Blank Document", "Start with a clean slate", "FileText", "Basic", include_str!("../../templates/blank.typ")),
    ("basic", "Basic Document", "Simple document with headings, lists, and text formatting", "BookOpen", "Basic", include_str!("../../templates/basic.typ")),
    ("resume", "Resume / CV", "Professional resume template", "Briefcase", "Professional", include_str!("../../templates/resume.typ")),
    ("academic", "Academic Paper", "Research paper format", "GraduationCap", "Academic", include_str!("../../templates/academic.typ")),
    ("letter", "Formal Letter", "Business or formal letter template", "Mail", "Professional", include_str!("../../templates/letter.typ")),
    ("report", "Business Report", "Professional report with executive summary", "FileBarChart", "Professional", include_str!("../../templates/report.typ")),
    ("math", "Math Notes", "Mathematics document with equations", "Calculator", "Academic", include_str!("../../templates/math.typ")),
    ("code-docs", "Code Documentation", "Technical documentation for code projects", "Code", "Technical", include_str!("../../templates/code-docs.typ")),
];

#[tauri::command]
pub async fn compile_typst(content: String) -> CompileResult {
    if content.trim().is_empty() {
        return CompileResult {
            success: true,
            html: Some("<div style=\"color: #71717A; padding: 40px; text-align: center;\">Start typing Typst markup to see preview...</div>".to_string()),
            error: None,
        };
    }

    match typst_compiler::compile_to_svg(&content) {
        Ok(svgs) => {
            let html = format!(
                "<div style=\"display: flex; flex-direction: column; gap: 20px; padding: 20px; background: white;\">{}</div>",
                svgs.iter()
                    .map(|svg| format!("<div style=\"box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 10px; background: white;\">{}</div>", svg))
                    .collect::<Vec<_>>()
                    .join("")
            );
            CompileResult {
                success: true,
                html: Some(html),
                error: None,
            }
        }
        Err(e) => {
            let error_html = format!(
                "<div style=\"padding: 20px; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 4px; margin: 20px;\">
                    <div style=\"color: #DC2626; font-weight: 600; margin-bottom: 8px;\">Compilation Error</div>
                    <pre style=\"color: #991B1B; font-size: 13px; white-space: pre-wrap; margin: 0; font-family: monospace;\">{}</pre>
                </div>",
                e
            );
            CompileResult {
                success: false,
                html: Some(error_html),
                error: Some(e),
            }
        }
    }
}

#[tauri::command]
pub async fn export_pdf(content: String, path: String) -> Result<(), String> {
    typst_compiler::compile_to_pdf(&content, &path)
}

#[tauri::command]
pub async fn export_html(content: String, path: String) -> Result<(), String> {
    match typst_compiler::compile_to_svg(&content) {
        Ok(svgs) => {
            let html = format!(
                r#"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typst Document</title>
    <style>
        body {{ margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, sans-serif; }}
        .page {{ background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 0 auto 20px; max-width: 800px; padding: 20px; }}
    </style>
</head>
<body>
{}
</body>
</html>"#,
                svgs.iter()
                    .map(|svg| format!("<div class=\"page\">{}</div>", svg))
                    .collect::<Vec<_>>()
                    .join("\n")
            );
            fs::write(&path, html).map_err(|e| e.to_string())
        }
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub async fn export_svg(content: String, path: String) -> Result<(), String> {
    match typst_compiler::compile_to_svg(&content) {
        Ok(svgs) => {
            if let Some(first_svg) = svgs.first() {
                fs::write(&path, first_svg).map_err(|e| e.to_string())
            } else {
                Err("No output generated".to_string())
            }
        }
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub fn get_templates() -> Vec<TemplateMetadata> {
    TEMPLATES
        .iter()
        .map(|(id, name, desc, icon, category, _)| TemplateMetadata {
            id: id.to_string(),
            name: name.to_string(),
            description: desc.to_string(),
            icon: icon.to_string(),
            category: category.to_string(),
        })
        .collect()
}

#[tauri::command]
pub fn get_template_content(template_id: String) -> Result<TemplateContent, String> {
    TEMPLATES
        .iter()
        .find(|(id, _, _, _, _, _)| *id == template_id)
        .map(|(id, name, desc, icon, category, content)| TemplateContent {
            id: id.to_string(),
            name: name.to_string(),
            description: desc.to_string(),
            icon: icon.to_string(),
            category: category.to_string(),
            content: content.to_string(),
        })
        .ok_or_else(|| "Template not found".to_string())
}

#[tauri::command]
pub fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_recent_files(app: AppHandle) -> Vec<RecentFile> {
    let app_dir = app.path_resolver().app_data_dir().unwrap();
    let recent_files_path = app_dir.join("recent_files.json");
    
    if let Ok(content) = fs::read_to_string(&recent_files_path) {
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        Vec::new()
    }
}

#[tauri::command]
pub fn add_recent_file(app: AppHandle, path: String, name: String) -> Result<(), String> {
    let app_dir = app.path_resolver().app_data_dir().unwrap();
    let recent_files_path = app_dir.join("recent_files.json");
    
    let mut recent_files: Vec<RecentFile> = if let Ok(content) = fs::read_to_string(&recent_files_path) {
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        Vec::new()
    };
    
    // Remove existing entry for this path
    recent_files.retain(|f| f.path != path);
    
    // Add new entry at the beginning
    recent_files.insert(0, RecentFile {
        path,
        name,
        accessed_at: chrono::Utc::now().to_rfc3339(),
    });
    
    // Keep only last 10 files
    recent_files.truncate(10);
    
    let json = serde_json::to_string_pretty(&recent_files).map_err(|e| e.to_string())?;
    fs::write(&recent_files_path, json).map_err(|e| e.to_string())
}
