import os
import json
import google.generativeai as genai
import fitz  # PyMuPDF
from dotenv import load_dotenv
import time

# --- CONFIGURACIÓN ---
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: No se encontró GEMINI_API_KEY en .env")
    exit(1)

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-pro')

# RUTAS
BASE_DIR = os.path.join("public", "mep-docs", "MEP_ORDENADO")
OUTPUT_DIR = os.path.join("prisma", "seeds", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"🚀 INICIANDO MINERÍA (Modo Seguro)")
print(f"📂 Origen: {BASE_DIR}")

def extract_text(path):
    try:
        doc = fitz.open(path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text[:45000] 
    except Exception as e:
        print(f"⚠️ Error leyendo PDF: {e}")
        return None

def analyze_pdf(text, filename, meta):
    prompt = f"""
    ROL: Experto Curricular del MEP.
    TAREA: Extraer estructura y crear actividades DUA.
    
    METADATA: {meta}

    SALIDA JSON OBLIGATORIA:
    {{
      "units": [
        {{
          "title": "Nombre Unidad",
          "outcomes": [
            {{
              "desc": "Resultado Aprendizaje",
              "indicators": [
                {{
                  "desc": "Indicador",
                  "activity": {{
                    "title": "Actividad Sugerida",
                    "type": "COTIDIANO",
                    "dua_strategy": "Estrategia para TDAH",
                    "rubric_high": "Logrado",
                    "rubric_low": "En proceso"
                  }}
                }}
              ]
            }}
          ]
        }}
      ]
    }}
    
    TEXTO:
    {text}
    """
    try:
        response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
        return json.loads(response.text)
    except Exception as e:
        return None

# --- BUCLE PRINCIPAL ---
count = 0
for root, dirs, files in os.walk(BASE_DIR):
    for file in files:
        if file.lower().endswith('.pdf'):
            # Detectar metadata
            parts = os.path.normpath(root).split(os.sep)
            try:
                if "MEP_ORDENADO" in parts:
                    idx = parts.index("MEP_ORDENADO")
                    modalidad = parts[idx+1] if len(parts) > idx+1 else "General"
                    asignatura = parts[idx+2] if len(parts) > idx+2 else file.replace(".pdf","")
                    nivel = parts[idx+3] if len(parts) > idx+3 else "General"
                else:
                    modalidad, asignatura, nivel = "General", "General", "General"
            except:
                modalidad, asignatura, nivel = "General", "General", "General"

            print(f"📄 Procesando: {asignatura} - {nivel}...")
            
            full_path = os.path.join(root, file)
            text = extract_text(full_path)
            
            if text:
                data = analyze_pdf(text, file, {"asignatura": asignatura, "nivel": nivel})
                if data:
                    # AQUÍ ESTABA EL ERROR, AHORA ESTÁ CORREGIDO:
                    safe_name = f"{modalidad}_{asignatura}_{nivel}_{count}.json".replace(" ", "_")
                    
                    final_json = {
                        "meta_asignatura": asignatura,
                        "meta_nivel": nivel,
                        "meta_modalidad": modalidad,
                        "data": data
                    }
                    
                    with open(os.path.join(OUTPUT_DIR, safe_name), "w", encoding="utf-8") as f:
                        json.dump(final_json, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ Guardado: {safe_name}")
                    count += 1