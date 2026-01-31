import os
import sys
import json
import glob
import psycopg2
from typing import List, Dict, Any
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load Env
load_dotenv()

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
PDF_SOURCE_DIR = "public/mep-docs/MEP_ORDENADO" # Default source

if not OPENAI_API_KEY:
    print("❌ Error: OPENAI_API_KEY not found in environment.")
    sys.exit(1)

if not DATABASE_URL:
    print("❌ Error: DATABASE_URL not found in environment.")
    sys.exit(1)

# --- PROMPT ARCHITECTO ---
ARCHITECT_PROMPT = """
ROL: Eres el Arquitecto de Datos Curriculares del MEP (Costa Rica) y Especialista en Evaluación Educativa.
OBJETIVO: Extraer datos quirúrgicos del texto proporcionado (fragmento de programa de estudio) para poblar la base de datos de "AulaPlan".
SALIDA: Única y exclusivamente código JSON válido.

INSTRUCCIONES DE EXTRACCIÓN Y TRANSFORMACIÓN:
1. 🧬 ANÁLISIS DE ADN (Metadatos):
   - Identifica la especialidad y nivel.
   - Determina `ui_renderer`:
     - "HARD_TECH" si hay Python, Code, Redes, SQL.
     - "SOFT_SKILLS" si hay Turismo, Servicio, Inglés.
     - "FINANCE_GRID" si hay Contabilidad, Costos.
     - "ACADEMIC" por defecto si no calza.

2. 🛡️ EXTRACCIÓN DE EVALUACIÓN (Legal):
   - Extrae Resultados de Aprendizaje (RA).
   - Extrae Indicadores (Criterios de Evaluación).
   - Clasifica Evidencias en: Conocimiento, Desempeño, Producto.

3. 🧠 ENRIQUECIMIENTO DUA (Neuro-Inyección):
   - Genera `dua_strategy` específica para cada RA.

4. 🛠️ HERRAMIENTAS DIGITALES:
   - Extrae herramientas (tools) mencionadas (Software, Hardware).

TEXTO A ANALIZAR:
{text_chunk}

ESTRUCTURA DE SALIDA JSON (Array de Objetos):
[
  {{
    "specialty": "string (Nombre de Especialidad)",
    "level": "string (10, 11, 12)",
    "unit_title": "string (Título de Unidad)",
    "ui_renderer": "HARD_TECH | SOFT_SKILLS | FINANCE_GRID | ACADEMIC",
    "learning_outcomes": [
      {{
        "lo_text": "string (Texto del RA)",
        "indicators": ["string (Indicador 1)", "string (Indicador 2)"],
        "evaluation_component": {{
          "type": "Rubric | Checklist | Scale",
          "evidence_type": "Producto | Desempeño | Conocimiento",
          "evidence_description": "string (Descripción de la evidencia)",
          "criteria": [
             {{ "label": "string (Criterio)", "weight": number }}
          ]
        }},
        "resources": ["string (Tool 1)", "string (Tool 2)"],
        "dua_strategy": "string (Sugerencia DUA explícita)"
      }}
    ]
  }}
]
"""

# --- DB CONNECTION ---
def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"❌ Database Connection Error: {e}")
        return None

# --- EXTRACTOR LOGIC ---
def extract_curriculum_data(file_path: str):
    print(f"📄 Processing: {os.path.basename(file_path)}")
    
    # 1. Load PDF
    try:
        loader = PyPDFLoader(file_path)
        pages = loader.load()
    except Exception as e:
        print(f"   ⚠️ Error loading PDF: {e}")
        return None

    # Optimization: Extract from specific pages or concatenate first few pages for metadata
    # and scanned pages for content. For MVP, we'll scan a subset or full text depending on size.
    # To keep it "Fast", let's take the first 10 pages for Metadata and then sampling for Units.
    # Actually, the user wants "Surgical Extraction".
    # Strategy: Concatenate text and send to LLM in chunks if too large.
    # For this implementation, we will concatenate the first 20 pages which usually contain the structure/units summary
    # or process the whole document if small.
    
    full_text = ""
    for page in pages[:20]: # Limit to first 20 pages for MVP speed/cost control
        full_text += page.page_content + "\n"
    
    # Cleaning
    full_text = full_text[:15000] # Token limit safeguard (approx 3-4k tokens)

    # 2. Architect LLM
    llm = ChatOpenAI(model="gpt-4o", temperature=0.0) # Precise extraction
    
    prompt = PromptTemplate(
        template=ARCHITECT_PROMPT,
        input_variables=["text_chunk"]
    )
    
    chain = prompt | llm
    
    try:
        print("   🧠 Architecting data (LLM Extraction)...")
        response = chain.invoke({"text_chunk": full_text})
        content = response.content.strip()
        
        # Clean JSON markdown
        if content.startswith("```json"):
            content = content.replace("```json", "").replace("```", "")
        
        data = json.loads(content)
        return data

    except Exception as e:
        print(f"   ❌ Extraction Failed: {e}")
        return None

# --- INJECTOR LOGIC ---
def inject_into_db(data: List[Dict[str, Any]]):
    conn = get_db_connection()
    if not conn:
        return

    cursor = conn.cursor()
    count = 0 
    
    try:
        for module in data:
            # Prepare JSON for learningOutcomes
            lo_json = json.dumps(module.get("learning_outcomes", []))
            
            sql = """
                INSERT INTO curriculum (id, "moduleId", specialty, level, "unitTitle", "uiRenderer", "learningOutcomes", "updatedAt")
                VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, %s, NOW())
            """
            
            # Generate a module ID if not present (User said "GENERAR_UUID", handled by logic or DB)
            # We'll use a random UUID from python or let DB handle 'id'.
            # The schema has `moduleId` as String?. Use a placeholder or generated one.
            import uuid
            mod_id = str(uuid.uuid4())

            cursor.execute(sql, (
                mod_id,
                module.get("specialty", "N/A"),
                module.get("level", "10"),
                module.get("unit_title", "Unidad General"),
                module.get("ui_renderer", "ACADEMIC"),
                lo_json
            ))
            count += 1
        
        conn.commit()
        print(f"   ✅ Injected {count} curriculum modules into Neon DB.")

    except Exception as e:
        print(f"   ❌ DB Injection Error: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

# --- MAIN LOOP ---
def main():
    if len(sys.argv) > 1:
        target = sys.argv[1]
    else:
        target = PDF_SOURCE_DIR

    print(f"🚀 Starting Antigravity Architect Engine...")
    print(f"📂 Source: {target}")

    # Recursive search for PDFs
    files = glob.glob(os.path.join(target, "**/*.pdf"), recursive=True)
    
    if not files:
        print("⚠️ No PDF files found.")
        return

    print(f"🔍 Found {len(files)} documents.")

    for file_path in files:
        data = extract_curriculum_data(file_path)
        if data:
            # Basic Validation
            if isinstance(data, list) and len(data) > 0:
                inject_into_db(data)
            else:
                print("   ⚠️ No valid data extracted.")
        else:
            print("   ⚠️ Skipping file.")

if __name__ == "__main__":
    main()
