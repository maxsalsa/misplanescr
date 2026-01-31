# UBICACIÓN: scripts/mep_miner.py

import os
import json
import google.generativeai as genai
import fitz  # PyMuPDF
from dotenv import load_dotenv

# Configuración de Llaves
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: No tienes GEMINI_API_KEY en tu archivo .env")
    exit()

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-pro-latest') # Plan Ultra

# RUTA EXACTA DE TUS PDFS
BASE_DIR = os.path.join("public", "mep-docs", "MEP_ORDENADO")
OUTPUT_DIR = os.path.join("prisma", "seeds", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"🚀 INICIANDO MINERÍA EN: {BASE_DIR}")

def extract_text(path):
    try:
        doc = fitz.open(path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text[:40000] # Leemos hasta 40k caracteres
    except:
        return None

def analyze_pdf(text, meta):
    prompt = f"""
    ERES: Experto Curricular MEP.
    CONTEXTO: Asignatura: {meta['asignatura']}, Nivel: {meta['nivel']}.
    TAREA: Extraer estructura curricular y crear actividades DUA.
    
    RESPONDE SOLO JSON VÁLIDO:
    {{
      "units": [
        {{
          "title": "Nombre Unidad",
          "outcomes": [
            {{
              "desc": "Resultado Aprendizaje",
              "indicators": [
                {{
                  "desc": "Texto Indicador",
                  "activity": {{
                    "title": "Actividad Sugerida",
                    "type": "COTIDIANO",
                    "dua_tdah": "Estrategia TDAH...",
                    "dua_tea": "Estrategia TEA...",
                    "intel": "Visual/Espacial",
                    "rubric_l3": "Logra...",
                    "rubric_l1": "No logra..."
                  }}
                }}
              ]
            }}
          ]
        }}
      ]
    }}
    
    TEXTO: {text}
    """
    try:
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return json.loads(response.text)
    except Exception as e:
        print(f"⚠️ Error IA: {e}")
        return None

# Recorrer carpetas
count = 0
for root, dirs, files in os.walk(BASE_DIR):
    for file in files:
        if file.lower().endswith('.pdf'):
            # Deducir datos por carpeta
            parts = os.path.normpath(root).split(os.sep)
            try:
                idx = parts.index("MEP_ORDENADO")
                asignatura = parts[idx+2] if len(parts) > idx+2 else file
                nivel = parts[idx+3] if len(parts) > idx+3 else "General"
            except:
                asignatura, nivel = "General", "General"

            print(f"📄 Procesando: {asignatura} ({nivel})...")
            text = extract_text(os.path.join(root, file))
            
            if text:
                data = analyze_pdf(text, {"asignatura": asignatura, "nivel": nivel})
                if data:
                    fname = f"{asignatura}_{nivel}_{file}".replace(" ", "_").replace(".pdf", ".json")
                    with open(os.path.join(OUTPUT_DIR, fname), "w", encoding="utf-8") as f:
                        final = {**{"asignatura": asignatura, "nivel": nivel}, **data}
                        json.dump(final, f, ensure_ascii=False, indent=2)
                    print(f"✅ JSON Guardado: {fname}")
                    count += 1