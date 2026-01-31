
import os
import json
import pdfplumber
import re
from pathlib import Path

# CONFIG
# ------------------------------------------------------------------------------
SOURCE_ROOT = os.path.join("public", "mep-docs", "MEP_ORDENADO")
STAGING_DIR = os.path.join("data_staging")

def extract_text(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            # Parse first 20 pages to get the gist/core units
            for i, page in enumerate(pdf.pages):
                if i > 20: break 
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
    return text

def detect_academic_structure(text):
    """Detects presence of official MEP components"""
    has_template = "Plantilla de aprendizaje" in text or "PLANTILLA" in text
    has_specs = "Tabla de especificaciones" in text or "TABLA DE ESPECIFICACIONES" in text
    return {"has_template": has_template, "has_specs": has_specs}

def heuristic_parse_text(text, filename):
    """
    Extracts Units, Outcomes, and Indicators using regex patterns specific to MEP format.
    """
    
    # 1. Infer Subject/Level from filename
    clean_name = Path(filename).stem
    subject = re.sub(r'\d+', '', clean_name).strip()
    level_match = re.search(r'\d+', clean_name)
    level = f"{level_match.group(0)}mo Año" if level_match else "General"
    
    structure = {
        "subject": subject,
        "level": level,
        "units": []
    }
    
    # Check academic metadata globally
    meta = detect_academic_structure(text)
    
    # 2. Find Units (Chunks)
    chunks = re.split(r'(UNIDAD\s+\d+|Unidad\s+\d+)', text)
    
    # Default unit if none found
    if len(chunks) < 2:
         structure["units"].append({
             "name": "Unidad General",
             "outcomes": [{
                 "description": "Resultados Generales",
                 "indicators": find_indicators_in_text(text, meta)
             }]
         })
         return structure

    for i in range(1, len(chunks), 2):
        header = chunks[i] 
        try:
            content = chunks[i+1]
        except IndexError:
            content = ""
            
        lines = content.strip().split('\n')
        title = lines[0].strip() if lines else "Sin Título"
        if len(title) > 100: title = title[:100] + "..."
        
        indicators = find_indicators_in_text(content, meta)
        
        structure["units"].append({
            "name": f"{header}: {title}",
            "outcomes": [{
                "description": "Aprendizajes de la Unidad",
                "indicators": indicators
            }]
        })
        
    return structure

def find_indicators_in_text(text, meta):
    """
    Scans a text block for lines that look like indicators.
    """
    indicators = []
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if len(line) < 20: continue
        if line.isupper(): continue 
        if re.match(r'^\d+$', line): continue 
        
        if len(indicators) >= 5: break
        
        # Enhanced Activity Logic
        # If Spec Table exists, suggest Exam items. If Template, suggest Daily work.
        activity_type = "PRUEBA" if meta["has_specs"] else "COTIDIANO"
        title_prefix = "Ítem de Prueba" if meta["has_specs"] else "Estrategia de Mediación"
        
        indicators.append({
            "description": line,
            "suggested_activities": [
                {
                    "title": f"{title_prefix}: {line[:30]}...",
                    "type": activity_type,
                    "adaptation_dua": "Proporcionar opciones de percepción visual."
                }
            ],
            "meta_tags": meta 
        })
        
    return indicators

def main():
    print("🚀 Starting AULAPLAN PDF MINER (Mode: HEURISTIC + ACADEMIC STRUCTURE)")
    print(f"📂 Source: {SOURCE_ROOT}")
    
    if not os.path.exists(STAGING_DIR):
        os.makedirs(STAGING_DIR)

    processed = 0
    
    for root, dirs, files in os.walk(SOURCE_ROOT):
        for file in files:
            if file.lower().endswith(".pdf"):
                print(f"📄 Processing: {file}...")
                pdf_path = os.path.join(root, file)
                json_name = f"{Path(file).stem}.json"
                output_path = os.path.join(STAGING_DIR, json_name)
                
                raw_text = extract_text(pdf_path)
                data = heuristic_parse_text(raw_text, file)
                
                with open(output_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                print(f"   ✅ Parsed: {json_name}")
                processed += 1
                
    print(f"\n🏁 Heuristic Miner Complete. {processed} files generated.")

if __name__ == "__main__":
    main()
