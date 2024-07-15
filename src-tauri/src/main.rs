// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri::Manager;

fn main() {
   let quit = CustomMenuItem::new("quit".to_string(), "Quit");
   let hide = CustomMenuItem::new("hide".to_string(), "Hide");
   let open = CustomMenuItem::new("open".to_string(), "Open");
   let tray_menu = SystemTrayMenu::new()
      .add_item(open)
      .add_item(hide)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(quit);
   let system_tray = SystemTray::new()
      .with_menu(tray_menu);

   tauri::Builder::default()
      .on_window_event(|event| match event.event() {
         tauri::WindowEvent::CloseRequested { api, .. } => {
            event.window().hide().unwrap();
            api.prevent_close();
         }
         _ => {}
      })
      .invoke_handler(tauri::generate_handler![greet])
      .system_tray(system_tray)
      .on_system_tray_event(|app, event| match event {
         SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
         } => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            println!("system tray received a double click");
         }
         SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
               std::process::exit(0);
            },
            "hide" => {
               let window = app.get_window("main").unwrap();
               window.hide().unwrap();
            },
            "open" => {
               let window = app.get_window("main").unwrap();
               window.show().unwrap();
            },
            _ => {}
         },
         _ => {}
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}