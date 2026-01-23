# -*- coding: utf-8 -*-
"""
DEMO DATA SEEDER
Genera datos de ejemplo para la cuenta demo ("Soporte TI" y "Desarrollo Web").
"""
import psycopg2
import json
import uuid
import os

# URL de Neon (Debe coincidir con la usada en otros scripts)
NEON_URL = "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

def seed_demo_data():
    conn = None
    try:
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        print("🌱 Iniciando Siembra de Datos Demo...")

        # 1. Crear Institución Demo
        inst_id = str(uuid.uuid4())
        # Note: Prisma models created via camelCase without @map are case-sensitive in Postgres if quoted, 
        # or require quote wrapping in raw SQL. "subscriptionPlan" is likely "subscriptionPlan" in DB.
        cur.execute("""
            INSERT INTO institutions (id, name, code, modality, educational_level, "subscriptionPlan")
            VALUES (%s, 'CTP Modelo Tecnológico', 'CTP-DEMO', 'Técnica', 'SECUNDARIA_TECNICA', 'premium')
            ON CONFLICT (code) DO NOTHING;
        """, (inst_id,))
        print("✅ Institución Demo creada/verificada.")

        # 2. Crear Grupos Demo
        grupos = [
            {"name": "10-1", "spec": "Desarrollo Web", "level": "10mo"},
            {"name": "11-2", "spec": "Soporte TI", "level": "11mo"}
        ]
        
        grupo_ids = []
        for g in grupos:
            g_id = str(uuid.uuid4())
            cur.execute("""
                INSERT INTO groups (id, name, section, specialty, level, institution_id, year)
                VALUES (%s, %s, %s, %s, %s, (SELECT id FROM institutions WHERE code='CTP-DEMO'), 2026)
                RETURNING id;
            """, (g_id, g['name'], g['name'], g['spec'], g['level']))
            gid_result = cur.fetchone()
            if gid_result:
                grupo_ids.append(gid_result[0])
                print(f"✅ Grupo {g['name']} ({g['spec']}) creado.")

        # 3. Crear Estudiantes Demo (Human Names)
        estudiantes = [
            {"n": "Ana", "a1": "Rojas", "a2": "Mora", "email": "ana.rojas@est.demo.cr"},
            {"n": "Carlos", "a1": "Vargas", "a2": "Solis", "email": "carlos.vargas@est.demo.cr"},
            {"n": "Elena", "a1": "Jimenez", "a2": "Castro", "email": "elena.jimenez@est.demo.cr"},
            {"n": "Luis", "a1": "Salaz", "a2": "Perez", "email": "luis.salas@est.demo.cr"},
            {"n": "Maria", "a1": "Lopez", "a2": "Ureña", "email": "maria.lopez@est.demo.cr"}
        ]

        if grupo_ids:
            for est in estudiantes:
                uid = str(uuid.uuid4())
                # Crear Usuario Estudiante
                cur.execute("""
                    INSERT INTO users (id, nombre1, apellido1, apellido2, email, role, password_hash, institution_id)
                    VALUES (%s, %s, %s, %s, %s, 'ESTUDIANTE', 'hash_demo', (SELECT id FROM institutions WHERE code='CTP-DEMO'))
                    ON CONFLICT (email) DO NOTHING
                    RETURNING id;
                """, (uid, est['n'], est['a1'], est['a2'], est['email']))
                
                user_res = cur.fetchone()
                if user_res:
                    # Asignar al primer grupo demo
                    cur.execute("""
                        INSERT INTO "_StudentGroups" ("A", "B")
                        VALUES (%s, %s)
                        ON CONFLICT DO NOTHING;
                    """, (grupo_ids[0], user_res[0]))
        
        print(f"✅ {len(estudiantes)} Estudiantes Demo creados y asignados.")

        conn.commit()
        print("🚀 Siembra de Datos Demo completada exitosamente.")

    except Exception as e:
        print(f"❌ Error sembrando datos: {e}")
        if conn: conn.rollback()
    finally:
        if conn: conn.close()

if __name__ == "__main__":
    seed_demo_data()
