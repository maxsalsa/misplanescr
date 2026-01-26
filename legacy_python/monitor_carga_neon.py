# -*- coding: utf-8 -*-
"""
MONITOR DE CARGA NEON
Visualiza el progreso de la Ingesta Masiva (Meta: 170 Programas)
"""
import psycopg2
import os

NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

def check_progreso_neon():
    """
    Consulta estadísticas reales de la Memoria Oficial.
    """
    try:
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        # Conteo por Versiones
        cur.execute("SELECT version_kaizen, COUNT(*) FROM m_mep_respaldo GROUP BY version_kaizen")
        stats = cur.fetchall()
        
        total_diamond = 0
        print("\n📊 REPORTE DE ESTADO NEON DB")
        print("==============================")
        for version, count in stats:
            print(f"🔹 {version}: {count} unidades")
            if "DIAMANTE" in version or "Omni" in version:
                total_diamond += count
                
        # Proyección Alfa 50 + Wave 2
        meta = 170
        avance = (total_diamond / meta) * 100
        
        print("\n🚀 PROGRESO GLOBAL (Meta 170)")
        print(f"█{'█'*int(avance/5)}{'.'*(20-int(avance/5))}█ {avance:.1f}% ({total_diamond}/{meta})")
        print("==============================\n")
        
        cur.close()
        conn.close()
    except Exception as e:
        print(f"❌ Error de conexión: {e}")

if __name__ == "__main__":
    check_progreso_neon()
