# =============================================================================
# 🐍 LECTOR PROFUNDO DE CONTENIDOS MEP (TEXT MINING)
# =============================================================================
import os
import json
import pdfplumber # Requiere: pip install pdfplumber

BASE_DIR = r"C:\Users\Usuario\Downloads\autoplanea-mep\public\mep-docs\MEP_ORDENADO"
OUTPUT_FILE = os.path.join(os.getcwd(), "prisma", "mep_deep_data.json")

print(f"🚀 INICIANDO LECTURA PROFUNDA (ESTO TOMARÁ UNOS MINUTOS)...")

data = []
count = 0

def clean_text(text):
    if not text: return ""
    # Eliminar saltos de línea extraños y espacios múltiples
    return " ".join(text.split())

for root, dirs, files in os.walk(BASE_DIR):
    for file in files:
        if file.lower().endswith(".pdf"):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(root, BASE_DIR)
            path_parts = rel_path.split(os.sep)

            # 1. METADATA ESTRUCTURAL (Lo que ya teníamos)
            # -----------------------------------------------------------
            # Nivel
            path_str = " ".join(path_parts).lower()
            nivel = "Nivel General"
            if "10" in path_str: nivel = "Décimo"
            elif "11" in path_str: nivel = "Undécimo"
            elif "12" in path_str: nivel = "Duodécimo"
            elif "7" in path_str: nivel = "Sétimo"
            elif "materno" in path_str: nivel = "Materno Infantil"
            
            # Modalidad
            modalidad = "TECNICA" if "técnica" in path_str or "tecnica" in path_str else "ACADEMICA"
            
            # Nombre Materia (Especialidad - Subárea)
            subarea = file.replace(".pdf", "").replace("_", " ").strip()
            especialidad = path_parts[-1] if len(path_parts) > 0 and path_parts[-1] != "." else "General"
            
            # Ajuste de nombre para dropdown
            if especialidad.lower() in ["10", "11", "12", "técnica", "académica", "iii_ciclo", "mep_ordenado"]:
                subject = subarea
            else:
                subject = f"{especialidad} - {subarea}"

            # 2. MINERÍA DE TEXTO (LO NUEVO)
            # -----------------------------------------------------------
            extracted_text = ""
            print(f"   📖 Leyendo contenido de: {file}...", end="\r")
            
            try:
                with pdfplumber.open(full_path) as pdf:
                    # Leemos las primeras 20 páginas (donde suele estar el programa de estudio)
                    # Leer el PDF entero podría tardar horas, 20 páginas es suficiente contexto.
                    max_pages = min(len(pdf.pages), 30) 
                    for i in range(max_pages):
                        page_text = pdf.pages[i].extract_text()
                        if page_text:
                            extracted_text += page_text + " "
                
                # Limpieza básica
                extracted_text = clean_text(extracted_text)
                
                # BÚSQUEDA DE EVIDENCIAS (MINERÍA)
                evidencias = []
                if "infografía" in extracted_text.lower(): evidencias.append("Infografía")
                if "ensayo" in extracted_text.lower(): evidencias.append("Ensayo")
                if "mapa mental" in extracted_text.lower(): evidencias.append("Mapa Mental")
                if "código" in extracted_text.lower() or "programa" in extracted_text.lower(): evidencias.append("Código Fuente")
                if "prototipo" in extracted_text.lower(): evidencias.append("Prototipo")
                
                evidencia_txt = f"Evidencias Sugeridas: {', '.join(evidencias)}" if evidencias else "Definir evidencia según contexto."

                # RECORTAR PARA BASE DE DATOS (SQLite no aguanta novelas enteras)
                # Guardamos los primeros 10,000 caracteres
                content_preview = f"{evidencia_txt} || CONTEXTO REAL: " + extracted_text[:10000]

            except Exception as e:
                print(f"\n   ❌ Error leyendo {file}: {e}")
                content_preview = "Lectura fallida. Se usará estructura estándar."

            # 3. GUARDAR EL REGISTRO CON EL CONTENIDO REAL
            entry = {
                "modalidad": modalidad,
                "level": nivel,
                "subject": subject,
                "unit": "Programa Oficial 2026",
                "topic": content_preview, # AQUÍ VA EL TEXTO DEL PDF
                "period": "Anual"
            }
            data.append(entry)
            count += 1

print(f"\n\n✅ LECTURA PROFUNDA FINALIZADA.")
print(f"   📚 Archivos procesados: {count}")
print(f"   💾 Base de datos generada: {OUTPUT_FILE}")
print("   (Ahora el sistema sabe qué hay dentro de cada PDF)")

# GUARDAR JSON
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)