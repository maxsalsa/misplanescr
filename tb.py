print("--- [1] INICIANDO TITAN BRAIN ULTIMATE (DEEP PEDAGOGY SCAN) ---")
import os
import sys
import re
import unidecode
import pdfplumber
import psycopg2
from psycopg2.extras import Json
from datetime import datetime
from dotenv import load_dotenv

# --- CONFIGURACIÓN ---
CURRENT_DIR = os.getcwd()
PDF_DIR = os.path.join(CURRENT_DIR, "public", "mep-docs", "MEP_ORDENADO")

load_dotenv()
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    print("❌ ERROR: Falta DATABASE_URL en .env")
    sys.exit(1)
if "sslmode" not in DB_URL:
    DB_URL += "?sslmode=require"

# --- HERRAMIENTAS DE LIMPIEZA ---

def normalize_filename(filename):
    """
    Convierte 'Matemáticas de 7mo (1).pdf' -> 'Matematicas7.pdf'
    Lógica CamelCase estricta para IDs de base de datos.
    """
    # Quitar extensión y limpiar basura de descargas
    name = os.path.splitext(filename)[0]
    name = re.sub(r'\s*\(\d+\)', '', name) # Quitar (1), (20)
    name = re.sub(r' copia', '', name, flags=re.IGNORECASE)
    
    # Quitar acentos y caracteres especiales
    name = unidecode.unidecode(name)
    
    # Estandarizar niveles comunes
    name = name.replace("Septimo", "7").replace("Setimo", "7")
    name = name.replace("Octavo", "8").replace("Noveno", "9")
    name = name.replace("Decimo", "10").replace("Undecimo", "11").replace("Duodecimo", "12")
    
    # CamelCase
    words = re.sub(r'[^a-zA-Z0-9]', ' ', name).title().split()
    clean_name = "".join(words)
    
    return clean_name + ".pdf"

def extract_structural_dna(pdf_path):
    """
    Lee el PDF y busca secciones pedagógicas clave mediante Patrones Regex y Heurística.
    """
    structure = {
        "full_text": "",
        "fundamentacion": "",
        "perfil_salida": "",
        "distribucion": "",
        "metodologia": ""
    }
    
    # Estado actual del lector
    current_section = "full_text"
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if not text: continue
                
                # 1. Acumular texto crudo siempre (Fuente de Verdad)
                structure["full_text"] += text + "\n"
                
                # 2. Análisis línea por línea para detectar cambios de sección
                lines = text.split('\n')
                for line in lines:
                    line_norm = unidecode.unidecode(line).lower()
                    
                    # Detección de Cabeceras (Keywords pedagógicas del MEP)
                    if "fundamentacion" in line_norm or "introduccion" in line_norm:
                        current_section = "fundamentacion"
                    elif "perfil" in line_norm and ("salida" in line_norm or "habilidad" in line_norm):
                        current_section = "perfil_salida"
                    elif "distribucion" in line_norm and ("tiempo" in line_norm or "unidad" in line_norm):
                        current_section = "distribucion"
                    elif "metodologia" in line_norm or "estrategia" in line_norm:
                        current_section = "metodologia"
                    
                    # Guardar contenido en la sección activa (Max 15k chars por sección para no explotar la celda)
                    if current_section != "full_text" and len(structure[current_section]) < 15000:
                        structure[current_section] += line + "\n"

        return structure

    except Exception as e:
        print(f"    ⚠️ Error de lectura corrupta: {e}")
        return None

# --- GESTOR DE BASE DE DATOS ---

def ensure_schema_ready(cursor):
    """
    Garantiza que la tabla tenga TODAS las columnas necesarias sin borrar datos.
    """
    print("🏗️  VERIFICANDO INTEGRIDAD ESTRUCTURAL DE NEON DB...")
    
    # Crear tabla base
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS mep_programs_core (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,
            subject TEXT,
            raw_text TEXT,
            structure_json JSONB,
            ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    # Inyectar columnas de alta pedagogía si faltan
    columns = [
        ("original_filename", "TEXT"),
        ("fundamentacion", "TEXT"),
        ("perfil_salida", "TEXT"),
        ("distribucion_anual", "TEXT"),
        ("metodologia", "TEXT"),
        ("last_deep_scan", "TIMESTAMP")
    ]
    
    for col, type_ in columns:
        cursor.execute(f"ALTER TABLE mep_programs_core ADD COLUMN IF NOT EXISTS {col} {type_};")
    
    print("✅ Esquema Industrial Validado.")

# --- ORQUESTADOR PRINCIPAL ---

def main():
    print("--- [2] CONECTANDO AL NÚCLEO... ---")
    try:
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
    except Exception as e:
        print(f"❌ FALLO CRÍTICO DE CONEXIÓN: {e}")
        return

    ensure_schema_ready(cursor)
    conn.commit()

    # --- FASE 1: INVENTARIO Y DEDUPLICACIÓN ---
    print(f"--- [3] ESCANEANDO ARCHIVOS EN {PDF_DIR} ---")
    
    # Mapa: { 'Matematicas7.pdf': ['ruta/Matematicas 7.pdf', 'ruta/Matematicas 7 (1).pdf'] }
    file_map = {}
    
    for root, dirs, files in os.walk(PDF_DIR):
        for file in files:
            if file.lower().endswith('.pdf'):
                clean_name = normalize_filename(file)
                full_path = os.path.join(root, file)
                
                if clean_name not in file_map:
                    file_map[clean_name] = []
                file_map[clean_name].append(full_path)

    unique_count = len(file_map)
    print(f"📦 Archivos Físicos Encontrados: {sum(len(v) for v in file_map.values())}")
    print(f"✨ Archivos Únicos (Normalizados): {unique_count}")
    print("   (El sistema procesará solo la mejor versión de cada archivo único)")

    # --- FASE 2: EXTRACCIÓN PROFUNDA (DEEP SCAN) ---
    print("\n--- [4] INICIANDO INGESTA NOCTURNA DE ALTA PRECISIÓN ---")
    
    processed_count = 0
    errors = []

    for i, (clean_name, paths) in enumerate(file_map.items()):
        # Si hay duplicados, tomamos el último (asumiendo que es la versión más reciente/mejor)
        best_path = paths[-1] 
        original_filename = os.path.basename(best_path)
        subject = os.path.splitext(clean_name)[0]

        print(f"[{i+1}/{unique_count}] 🧠 Procesando: {clean_name}")
        print(f"       -> Origen: {original_filename}")

        # Extracción
        dna = extract_structural_dna(best_path)
        
        if not dna:
            print("       ❌ Error: Archivo ilegible o corrupto.")
            errors.append(clean_name)
            continue
        
        if len(dna["full_text"]) < 50:
            print("       ⚠️ Alerta: Documento vacío o imagen sin OCR.")

        # Guardado en BD (Upsert)
        try:
            cursor.execute("""
                INSERT INTO mep_programs_core 
                (filename, original_filename, subject, raw_text, fundamentacion, perfil_salida, distribucion_anual, metodologia, structure_json, last_deep_scan)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                ON CONFLICT (filename) 
                DO UPDATE SET 
                    raw_text = EXCLUDED.raw_text,
                    fundamentacion = EXCLUDED.fundamentacion,
                    perfil_salida = EXCLUDED.perfil_salida,
                    distribucion_anual = EXCLUDED.distribucion_anual,
                    metodologia = EXCLUDED.metodologia,
                    original_filename = EXCLUDED.original_filename,
                    last_deep_scan = CURRENT_TIMESTAMP;
            """, (
                clean_name,
                original_filename,
                subject,
                dna["full_text"],
                dna["fundamentacion"],
                dna["perfil_salida"],
                dna["distribucion"],
                dna["metodologia"],
                Json({
                    "path": os.path.relpath(best_path, CURRENT_DIR),
                    "duplicates_merged": len(paths),
                    "extraction_mode": "ultimate_v4"
                })
            ))
            conn.commit()
            processed_count += 1

        except Exception as e:
            print(f"       ❌ Error de Base de Datos: {e}")
            conn.rollback()
            errors.append(f"{clean_name} (DB Error)")

    cursor.close()
    conn.close()

    # --- REPORTE FINAL ---
    print("\n" + "="*60)
    print("       TITAN BRAIN ULTIMATE - REPORTE DE MISIÓN")
    print("="*60)
    print(f"✅ Programas Ingestados con Estructura: {processed_count}")
    print(f"🗑️  Duplicados Fusionados/Eliminados: {sum(len(v) for v in file_map.values()) - unique_count}")
    
    if errors:
        print(f"❌ Fallos ({len(errors)}):")
        for err in errors:
            print(f"   - {err}")
    else:
        print("🎉 CERO ERRORES. Ejecución Perfecta.")
    
    print("="*60)
    print("El Núcleo Pedagógico de Neon DB ha sido actualizado al máximo nivel.")

if __name__ == "__main__":
    main()