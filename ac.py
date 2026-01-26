import os
import psycopg2
from dotenv import load_dotenv

# Configuración
load_dotenv()
DB_URL = os.getenv("DATABASE_URL")
if "sslmode" not in DB_URL: DB_URL += "?sslmode=require"

def audit():
    print("--- 🕵️‍♂️ AUDITORÍA FORENSE DE NEON DB ---")
    try:
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
        
        # 1. Conteo Total
        cursor.execute("SELECT COUNT(*) FROM mep_programs_core;")
        total = cursor.fetchone()[0]
        print(f"📊 Total de Programas en Núcleo: {total}")
        
        if total == 0:
            print("❌ ALERTA ROJA: La tabla está vacía. El script anterior no guardó nada.")
            return

        # 2. Calidad de los Datos (¿Están llenas las columnas nuevas?)
        cursor.execute("""
            SELECT 
                COUNT(fundamentacion) as fund_ok,
                COUNT(perfil_salida) as perfil_ok,
                COUNT(distribucion_anual) as dist_ok
            FROM mep_programs_core
            WHERE length(fundamentacion) > 50; 
        """)
        calidad = cursor.fetchone()
        print(f"🧠 Programas con Fundamentación válida: {calidad[0]}")
        print(f"🧠 Programas con Perfil de Salida válido: {calidad[1]}")
        print(f"🧠 Programas con Distribución válida: {calidad[2]}")

        # 3. Muestra de un registro (El primero que encuentre lleno)
        print("\n--- 🔬 MUESTRA DE ADN (Primer registro válido) ---")
        cursor.execute("""
            SELECT filename, subject, left(fundamentacion, 200) 
            FROM mep_programs_core 
            WHERE fundamentacion IS NOT NULL 
            LIMIT 1;
        """)
        sample = cursor.fetchone()
        
        if sample:
            print(f"Archivo: {sample[0]}")
            print(f"Materia: {sample[1]}")
            print(f"Fundamentación (Extracto): {sample[2]}...")
        else:
            print("⚠️ No encontré ningún registro con fundamentación extraída. Los PDFs podrían ser imágenes escaneadas sin OCR.")

        conn.close()

    except Exception as e:
        print(f"❌ Error de conexión: {e}")

if __name__ == "__main__":
    audit()