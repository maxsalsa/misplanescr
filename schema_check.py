# -*- coding: utf-8 -*-
"""
ANTIGRAVITY SCHEMA CHECK V4
Validación idempotente de estructura Neon DB
"""
import psycopg2
import os

NEON_URL = "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

def verificar_y_fortalecer_schema():
    print("🔧 Verificando estructura de Neon DB...")
    conn = None
    try:
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        # 1. Tabla Principal
        cur.execute("""
        CREATE TABLE IF NOT EXISTS m_mep_respaldo (
            id_programa TEXT PRIMARY KEY,
            programa_nombre TEXT,
            subarea_id TEXT,
            docente TEXT,
            contenido_json JSONB,
            version_kaizen TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        
        # 2. Migraciones Idempotentes (Directas y Simples)
        alter_commands = [
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS keywords TEXT[];",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS complejidad_nivel INTEGER DEFAULT 5;",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS tipo_asignatura TEXT DEFAULT 'Técnica';",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS tiempo_estimado_min INTEGER DEFAULT 80;",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS vector_resumen TEXT;",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS subarea_id TEXT;",
            "ALTER TABLE m_mep_respaldo ADD COLUMN IF NOT EXISTS docente TEXT;"
        ]
        
        for cmd in alter_commands:
            try:
                cur.execute(cmd)
                conn.commit()
            except Exception as e:
                print(f"   Nota migración ({cmd[:30]}...): {e}")
                conn.rollback()

        print("✅ Esquema Neon validado y listo (Versión Simplificada).")
        
    except Exception as e:
        print(f"❌ Error fortaleciendo BD: {e}")
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    verificar_y_fortalecer_schema()
