print("--- [1] INICIANDO PROTOCOLO DE LIMPIEZA E INGESTA (ANTIGRAVITY V3) ---")
import os
import sys
import re

# --- CONFIGURACIÓN DE RUTAS ---
CURRENT_DIR = os.getcwd()
PDF_DIR = os.path.join(CURRENT_DIR, "public", "mep-docs", "MEP_ORDENADO")

if not os.path.exists(PDF_DIR):
    print(f"❌ ERROR: No encuentro la carpeta {PDF_DIR}")
    sys.exit(1)

try:
    import pdfplumber
    import psycopg2
    from psycopg2.extras import Json
    from dotenv import load_dotenv
except ImportError as e:
    print(f"❌ ERROR LIBRERÍAS: {e}")
    sys.exit(1)

# Cargar DB
load_dotenv()
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    print("❌ ERROR: Falta DATABASE_URL en .env")
    sys.exit(1)
if "sslmode" not in DB_URL:
    DB_URL += "?sslmode=require"

# --- FUNCIONES DE LIMPIEZA ---

def sanitize_filename(filename):
    """
    Convierte 'Matemáticas (1).pdf' -> 'Matemáticas.pdf'
    Elimina duplicados de descargas y caracteres extraños.
    """
    name, ext = os.path.splitext(filename)
    
    # 1. Eliminar (1), (2), etc.
    name = re.sub(r'\s*\(\d+\)', '', name)
    # 2. Eliminar " - copia"
    name = re.sub(r'\s*-\s*copia', '', name, flags=re.IGNORECASE)
    # 3. Eliminar espacios dobles
    name = re.sub(r'\s+', ' ', name).strip()
    
    return name + ext

def extract_pdf_dna(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        return text
    except Exception as e:
        return None  # Retorna None si falla para manejarlo fuera

# --- MAIN ---

def main():
    print("--- [2] CONECTANDO A NEON DB ---")
    try:
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
    except Exception as e:
        print(f"❌ ERROR CONEXIÓN: {e}")
        return

    # PREPARAR LA TABLA (ELIMINAR Y RECREAR PARA LIMPIAR BASURA VIEJA)
    print("♻️  LIMPIEZA PROFUNDA DE LA TABLA...")
    cursor.execute("DROP TABLE IF EXISTS mep_programs_core;")
    cursor.execute("""
        CREATE TABLE mep_programs_core (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,  -- Nombre limpio (sin duplicados)
            original_filename TEXT,         -- Nombre real del archivo
            subject TEXT,
            raw_text TEXT,
            structure_json JSONB,
            status TEXT DEFAULT 'ACTIVE',
            ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    print("✅ Base de datos lista y saneada.")

    # RECOLECCIÓN DE ARCHIVOS
    print(f"--- [3] ESCANEANDO {PDF_DIR} ---")
    pdf_files_found = []
    for root, dirs, files in os.walk(PDF_DIR):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_files_found.append(os.path.join(root, file))

    total = len(pdf_files_found)
    print(f"📂 Archivos detectados: {total}")

    success_count = 0
    errors = []
    duplicates_merged = 0
    empty_files = []

    for i, pdf_path in enumerate(pdf_files_found):
        original_filename = os.path.basename(pdf_path)
        
        # 1. LIMPIEZA DE NOMBRE (DEDUPLICACIÓN)
        clean_name = sanitize_filename(original_filename)
        subject_name = os.path.splitext(clean_name)[0]

        print(f"[{i+1}/{total}] Procesando: {original_filename} -> (Como: {clean_name})")

        # 2. EXTRACCIÓN (TRY/CATCH BLINDADO)
        try:
            raw_text = extract_pdf_dna(pdf_path)
            
            if raw_text is None:
                print(f"    ⚠️ ERROR LECTURA: Archivo corrupto o protegido.")
                errors.append(f"{original_filename} (Corrupto/Protegido)")
                continue

            if len(raw_text.strip()) < 50:
                print(f"    ⚠️ ALERTA: Archivo vacío o es una imagen escaneada (Sin OCR).")
                empty_files.append(original_filename)
                # Aún así lo guardamos por si acaso, pero marcamos la alerta
            
            # 3. UPSERT (INSERTAR O ACTUALIZAR)
            # Usamos el 'clean_name' como clave única. Si ya existe (ej: procesamos el (1) y ahora viene el (2)),
            # actualizamos el contenido con el último encontrado.
            relative_path = os.path.relpath(pdf_path, CURRENT_DIR)
            
            data_structure = {
                "clean_filename": clean_name,
                "original_filename": original_filename,
                "path": relative_path,
                "source": "Antigravity Sanitized v3"
            }

            cursor.execute("""
                INSERT INTO mep_programs_core 
                (filename, original_filename, subject, raw_text, structure_json)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (filename) 
                DO UPDATE SET 
                    raw_text = EXCLUDED.raw_text,
                    original_filename = EXCLUDED.original_filename, -- Actualizamos al último archivo físico procesado
                    ingested_at = CURRENT_TIMESTAMP;
            """, (clean_name, original_filename, subject_name, raw_text, Json(data_structure)))
            
            conn.commit()
            success_count += 1

        except Exception as e:
            print(f"    ❌ ERROR CRÍTICO EN DB: {e}")
            conn.rollback()
            errors.append(f"{original_filename} (Error BD: {str(e)})")

    cursor.close()
    conn.close()

    # --- REPORTE FINAL DE AUDITORÍA ---
    print("\n" + "="*50)
    print("       INFORME DE MISIÓN ANTIGRAVITY")
    print("="*50)
    print(f"✅ ÉXITOS (Programas únicos): {success_count}")
    
    if len(errors) > 0:
        print(f"❌ FALLOS ({len(errors)}):")
        for err in errors:
            print(f"   - {err}")
            
    if len(empty_files) > 0:
        print(f"⚠️  POSIBLES ESCANEOS/VACÍOS ({len(empty_files)}):")
        print("   (Estos archivos se guardaron, pero no tienen texto legible)")
        for f in empty_files:
            print(f"   - {f}")

    print("="*50)
    print("NOTA: Los archivos '(1)', '(2)' han sido fusionados en sus versiones únicas.")

if __name__ == "__main__":
    main()