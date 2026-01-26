import os
import json
import psycopg2
from psycopg2.extras import Json

# --- CONFIGURACIÓN DE ACCESO INDUSTRIAL ---
# Reemplaza con tu string real de Neon DB
DB_CONNECTION_STRING = "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
JSON_SOURCE_FOLDER = "./data_staging" 

def connect_db():
    try:
        conn = psycopg2.connect(DB_CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"[ANTIGRAVITY ERROR] Fallo de conexión a Neon DB: {e}")
        return None

def setup_database(cursor):
    # Crea la tabla Maestra si no existe (Grado Industrial)
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

    files = [f for f in os.listdir(JSON_SOURCE_FOLDER) if f.endswith('.json')]
    print(f"[ANTIGRAVITY] Detectados {len(files)} módulos de conocimiento para ingesta.")

    for filename in files:
        filepath = os.path.join(JSON_SOURCE_FOLDER, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                
                # Extracción inteligente de metadatos (Ajustar según tus JSONs)
                subject = data.get('materia') or data.get('asignatura') or data.get('subject') or 'General'
                level = data.get('nivel') or data.get('level') or 'General'

                # UPSERT (Insertar o Actualizar si ya existe)
                query = """
                    INSERT INTO mep_programs_core (filename, subject, level, full_structure)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (filename) 
                    DO UPDATE SET 
                        full_structure = EXCLUDED.full_structure,
                        ingested_at = CURRENT_TIMESTAMP;
                """
                cursor.execute(query, (filename, subject, level, Json(data)))
                print(f" >> [MEMORIA ACTUALIZADA] Ingestado: {filename} ({subject})")
                
            except Exception as e:
                print(f" !! [ERROR DE INGESTA] Archivo {filename} corrupto: {e}")

    conn.commit()
    cursor.close()
    conn.close()
    print("\n[ANTIGRAVITY SYSTEM] Sincronización con Neon DB completada. El Core es más inteligente ahora.")

if __name__ == "__main__":
    ingest_intelligence()
