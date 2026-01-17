// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod typst_compiler;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::compile_typst,
            commands::export_pdf,
            commands::export_html,
            commands::export_svg,
            commands::get_templates,
            commands::get_template_content,
            commands::read_file,
            commands::write_file,
            commands::get_recent_files,
            commands::add_recent_file,
        ])
        .setup(|app| {
            // Create app data directory if it doesn't exist
            let app_dir = app.path_resolver().app_data_dir().unwrap();
            std::fs::create_dir_all(&app_dir).ok();
            
            // Create recent files storage
            let recent_files_path = app_dir.join("recent_files.json");
            if !recent_files_path.exists() {
                std::fs::write(&recent_files_path, "[]").ok();
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
