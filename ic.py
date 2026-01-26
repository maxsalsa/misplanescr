import os
import json
import psycopg2
from psycopg2.extras import Json
from dotenv import load_dotenv

# --- CONFIGURACIÓN DE ACCESO INDUSTRIAL ---
# Cargar variables de entorno del archivo .env del proyecto Next.js
load_dotenv()

# Recuperar la URL real. Si falla, avisar a Max.
DB_CONNECTION_STRING = os.getenv("DATABASE_URL")

# AJUSTE PARA PYTHON: Neon requiere ?sslmode=require al final
if DB_CONNECTION_STRING and "sslmode=require" not in DB_CONNECTION_STRING:
    DB_CONNECTION_STRING += "?sslmode=require"

JSON_SOURCE_FOLDER = "./me_programs_json" # Asegúrate que esta carpeta existe y tiene JSONs

def connect_db():
    if not DB_CONNECTION_STRING:
        print("[ANTIGRAVITY CRITICAL] No encontré 'DATABASE_URL' en tu archivo .env")
        print("Asegúrate de tener un archivo .env con la conexión real a Neon.")
        return None

    try:
        # Conexión directa usando la URL del .env
        conn = psycopg2.connect(DB_CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"[ANTIGRAVITY ERROR] Fallo de conexión a Neon DB: {e}")
        return None

def setup_database(cursor):
    print("[ANTIGRAVITY] Verificando integridad de tablas Core...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS mep_programs_core (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,
            subject TEXT,
            level TEXT,
            full_structure JSONB NOT NULL,
            ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

def ingest_intelligence():
    conn = connect_db()
    if not conn: return

    cursor = conn.cursor()
    setup_database(cursor)

    # Verificar si existe la carpeta de JSONs
    if not os.path.exists(JSON_SOURCE_FOLDER):
        print(f"[ERROR] No encuentro la carpeta '{JSON_SOURCE_FOLDER}'. Créala y pon los JSONs ahí.")
        return

    files = [f for f in os.listdir(JSON_SOURCE_FOLDER) if f.endswith('.json')]
    
    if not files:
        print(f"[ALERTA] La carpeta '{JSON_SOURCE_FOLDER}' está vacía. No hay nada que aprender.")
        return

    print(f"[ANTIGRAVITY] Detectados {len(files)} módulos de conocimiento para ingesta.")

    for filename in files:
        filepath = os.path.join(JSON_SOURCE_FOLDER, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                
                # Extracción defensiva de metadatos (evita crash si faltan campos)
                subject = data.get('materia') or data.get('asignatura') or 'General'
                level = data.get('nivel') or 'General'

                # UPSERT
                query = """
                    INSERT INTO mep_programs_core (filename, subject, level, full_structure)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (filename) 
                    DO UPDATE SET 
                        full_structure = EXCLUDED.full_structure,
                        ingested_at = CURRENT_TIMESTAMP;
                """
                cursor.execute(query, (filename, subject, level, Json(data)))
                print(f" >> [MEMORIA ACTUALIZADA] Ingestado: {filename}")
                
            except Exception as e:
                print(f" !! [ERROR DE INGESTA] Archivo {filename} corrupto: {e}")

    conn.commit()
    cursor.close()
    conn.close()
    print("\n[ANTIGRAVITY SYSTEM] Sincronización con Neon DB completada. Core actualizado.")

if __name__ == "__main__":
    ingest_intelligence()