import os
import re
import shutil

# --- CONFIGURACIÓN ANTIGRAVITY ---
ROOT_DIR = os.getcwd()  # Se ejecuta en la carpeta actual
BACKUP_DIR = os.path.join(ROOT_DIR, "antigravity_backup")
EXTENSIONS_TO_FIX = {".tsx": ".jsx", ".ts": ".js"}

# Patrones de TypeScript para eliminar (Limpieza Industrial)
TS_PATTERNS = [
    (r"interface\s+\w+\s*\{[^}]*\}", ""), # Eliminar interfaces
    (r"type\s+\w+\s*=\s*[^;]*;", ""),     # Eliminar types
    (r":\s*[A-Z][a-zA-Z0-9\[\]<>]*", ""), # Eliminar tipos en argumentos (ej: name: String)
    (r"<\w+(\[\])?>", ""),                # Eliminar generics simples
    (r"as\s+\w+", ""),                    # Eliminar aserciones 'as string'
]

def log(message):
    print(f"[ANTIGRAVITY SYSTEM]: {message}")

def create_backup():
    if os.path.exists(BACKUP_DIR):
        shutil.rmtree(BACKUP_DIR)
    log(f"Creando respaldo de seguridad en {BACKUP_DIR}...")
    shutil.copytree(ROOT_DIR, BACKUP_DIR, ignore=shutil.ignore_patterns('node_modules', '.next', '.git', 'antigravity_backup'))

def clean_code(content):
    # Aplica regex para eliminar TypeScript y dejar JS puro
    cleaned = content
    for pattern, replacement in TS_PATTERNS:
        cleaned = re.sub(pattern, replacement, cleaned, flags=re.MULTILINE | re.DOTALL)
    return cleaned

def audit_and_repair():
    log("Iniciando Protocolo de Auditoría y Reparación Masiva...")
    
    files_processed = 0
    
    for subdir, dirs, files in os.walk(ROOT_DIR):
        if "node_modules" in subdir or ".next" in subdir or ".git" in subdir or "antigravity_backup" in subdir:
            continue
            
        for file in files:
            filepath = os.path.join(subdir, file)
            filename, file_extension = os.path.splitext(file)
            
            # 1. Transmutación TS -> JS/JSX
            if file_extension in EXTENSIONS_TO_FIX:
                new_extension = EXTENSIONS_TO_FIX[file_extension]
                new_filepath = os.path.join(subdir, filename + new_extension)
                
                log(f"Detectado intruso TypeScript: {file}. Convirtiendo a {new_extension}...")
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Limpieza de sintaxis TS
                    new_content = clean_code(content)
                    
                    # Guardar nuevo archivo
                    with open(new_filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    # Eliminar archivo viejo
                    os.remove(filepath)
                    files_processed += 1
                    
                except Exception as e:
                    log(f"ERROR CRÍTICO en {file}: {e}")

            # 2. Auditoría de UI (Archivos .jsx)
            elif file_extension == ".jsx":
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # Asegurar directiva 'use client' si hay hooks
                    if ("useState" in content or "useEffect" in content) and "use client" not in content:
                        content = '"use client";\n' + content
                        log(f"Inyectando 'use client' en {file} para compatibilidad Next.js")
                        
                    if content != original_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                            files_processed += 1
                            
                except Exception as e:
                    log(f"Error auditando {file}: {e}")

    log(f"--- REPORTE FINAL ---")
    log(f"Archivos auditados y reparados: {files_processed}")
    log(f"El núcleo está limpio. Ejecuta 'npm run dev' para verificar la integridad.")

if __name__ == "__main__":
    create_backup()
    audit_and_repair()