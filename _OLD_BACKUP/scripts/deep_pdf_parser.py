
import os
import json
import pdfplumber
import re

# CONFIG
SOURCE_DIR = os.path.join("public", "mep-docs", "MEP_ORDENADO")
OUTPUT_FILE = os.path.join("prisma", "seeds", "data", "deep_content.json")

def extract_text_from_pdf(pdf_path):
    text_content = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            # OPTIMIZATION: Only parse first 5 pages for demo/seed
            # This prevents hanging on huge books
            for i, page in enumerate(pdf.pages):
                if i >= 5: break
                text_content += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
    return text_content

def parse_mep_structure(text):
    # This is a heuristic parser based on common MEP table structures
    # It tries to find units, indicators, and mediation strategies.
    
    structure = {
        "units": []
    }
    
    # 1. Detect Units (simplistic assumption: text following "Unidad...:")
    unit_matches = re.finditer(r"(Unidad\s+\d+|UNIDAD\s+\d+)[:\.]?\s*(.*?)(?=(Unidad|UNIDAD|$))", text, re.DOTALL)
    
    for match in unit_matches:
        unit_raw = match.group(0).strip()
        unit_title = match.group(2).split('\n')[0].strip()
        
        unit_obj = {
            "title": unit_title[:100], # Trucate in case parsing failed
            "indicators": []
        }
        
        # 2. Inside Unit, find Indicators (Aprendizajes Esperados)
        # Looking for tabular patterns or keyword "Indicador"
        # Since PDFs vary wildly, we will use a "Block" strategy for now, 
        # separating by suspected headers.
        
        # Strategy: Look for lines starting with bullets or numbers inside the unit text
        lines = unit_raw.split('\n')
        current_indicator = None
        
        for line in lines:
            if "indicador" in line.lower() and len(line) < 50:
                continue # Skip headers
            
            # Simple heuristic: Long lines often contain the content
            if len(line) > 50:
                if not current_indicator:
                    current_indicator = {
                        "description": line.strip(),
                        "strategies": []
                    }
                    unit_obj["indicators"].append(current_indicator)
                else:
                    # Append strictly if not looking like a new item? 
                    # For this "Deep Parser" v1, we treat long chunks as strategies if we have an indicator
                    current_indicator["strategies"].append(line.strip())
                    
        structure["units"].append(unit_obj)
        
    return structure

def main():
    print(f"🚀 Starting Deep PDF Parser on {SOURCE_DIR}")
    
    all_content = []
    
    if not os.path.exists(SOURCE_DIR):
        print(f"❌ Directory not found: {SOURCE_DIR}")
        # Mocking for testing if directory missing
        os.makedirs(SOURCE_DIR, exist_ok=True)
        return

    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.lower().endswith(".pdf"):
                full_path = os.path.join(root, file)
                print(f"📄 Processing: {file}...")
                
                raw_text = extract_text_from_pdf(full_path)
                parsed_data = parse_mep_structure(raw_text)
                
                all_content.append({
                    "filename": file,
                    "subject": os.path.basename(root), # Assume folder name is subject
                    "parsed": parsed_data
                })

    # Ensure output dir exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_content, f, indent=2, ensure_ascii=False)
        
    print(f"✅ Extraction Complete. Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
