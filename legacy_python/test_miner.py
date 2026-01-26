import os
import json
import google.generativeai as genai
import fitz  # PyMuPDF
from dotenv import load_dotenv

# Configuración
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ ERROR: Falta GEMINI_API_KEY")
    exit()

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-pro-latest')

BASE_DIR = os.path.join("public", "mep-docs", "MEP_ORDENADO")

def extract_one_pdf():
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.lower().endswith('.pdf'):
                path = os.path.join(root, file)
                print(f"📄 Testing extraction on: {file}")
                
                try:
                    doc = fitz.open(path)
                    text = ""
                    for i, page in enumerate(doc):
                        if i > 5: break # Read first 5 pages only for speed test
                        text += page.get_text()
                    
                    print(f"   Bytes extracted: {len(text)}")
                    
                    # Mini prompt for speed
                    prompt = f"""
                    Analyze this text from a MEP curriculum. 
                    Extract the main "Asignatura" and "Nivel".
                    Output JSON: {{ "asignatura": "...", "nivel": "..." }}
                    TEXT: {text[:2000]}
                    """
                    
                    response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
                    print(f"   AI Output: {response.text}")
                    return
                except Exception as e:
                    print(f"   Error: {e}")
                    return
    print("❌ No PDFs found in MEP_ORDENADO")

extract_one_pdf()
