# -*- coding: utf-8 -*-
"""
ANTIGRAVITY STUDENT SYNC ENGINE
Motor de Ingesta, Matricula y Contexto de Evaluación
"""
import psycopg2
import os
import json
from psycopg2.extras import Json
import uuid

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityStudentSyncEngine:
    """
    Student Sync Engine: Carga estudiantes y configura su contexto evaluativo.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def inyectar_datos_grupo(self, grupo_data, rol_docente):
        """
        Sincroniza la planificación con el registro de evaluación y conducta.
        """
        grupo_id = grupo_data.get('id')
        modalidad = grupo_data.get('modalidad', 'diurna') # diurna / nocturna
        print(f"🔄 Sincronizando Grupo: {grupo_id} ({modalidad}) | Rol: {rol_docente}...")
        
        # 1. Simulación de Ingesta de Lista de Clase (Normalmente vendría de un CSV o PIAD)
        estudiantes_mock = self._generar_lista_estudiantes(grupo_id, modalidad, 5) # 5 estudiantes ejemplo
        
        # 2. Configuración de Evaluacion (Indicadores)
        # Recuperaríamos de Neon DB los indicadores del plan vinculado
        indicadores_plan = ["Configura servidor Apache", "Gestiona usuarios Linux", "Despliega base de datos"]
        
        registros_evaluacion = []
        registros_conducta = []
        
        for est in estudiantes_mock:
            # Inicializar Cuadro de Notas
            reg_notas = {
                "estudiante_id": est['id'],
                "nombre": est['nombre'],
                "cotidiano": {ind: 0 for ind in indicadores_plan}, # 0 pts iniciales
                "tareas": [],
                "pruebas": []
            }
            registros_evaluacion.append(reg_notas)
            
            # Inicializar Conducta (Solo si es Guía)
            if rol_docente == "Guía":
                reg_cond = {
                    "estudiante_id": est['id'],
                    "nota_conducta": 100,
                    "historial_boletas": [],
                    "alertas": []
                }
                registros_conducta.append(reg_cond)

        # 3. Respuesta de Configuración
        response = {
            "status": "Success",
            "message": f"🚀 Grupo {grupo_id} configurado con éxito para Max Salazar.",
            "enrollment_count": len(estudiantes_mock),
            "config": {
                "modalidad": modalidad,
                "role_feature_guia": (rol_docente == "Guía"),
                "attendance_blocks": "1-4 Lecciones"
            },
            "data_preview": {
                "evaluacion": registros_evaluacion[0], # Preview primer estudiante
                "conducta": registros_conducta[0] if registros_conducta else None
            }
        }
        
        return response

    def _generar_lista_estudiantes(self, grupo_id, modalidad, cantidad):
        """
        Genera IDs y nombres inteligentes según modalidad.
        """
        lista = []
        prefix = "EST-N" if modalidad == "nocturna" else "EST-D"
        
        for i in range(cantidad):
            uid = f"{prefix}-{str(uuid.uuid4())[:8].upper()}-2026"
            lista.append({
                "id": uid,
                "nombre": f"Estudiante {modalidad.capitalize()} {i+1}"
            })
        return lista

# Test Drive
if __name__ == "__main__":
    engine = AntigravityStudentSyncEngine()
    
    # Caso 1: Diurno - Desarrollo Web - Profesor Materia
    grupo_diurno = {"id": "11-1_WEB_DIURNO", "modalidad": "diurna", "nivel": "11mo"}
    print("\n☀️ SYNC DIURNO (Materia):")
    res_diurno = engine.inyectar_datos_grupo(grupo_diurno, "Materia")
    print(json.dumps(res_diurno, indent=2, ensure_ascii=False))
    
    # Caso 2: Nocturno - Nivel 2 - Docente Guía
    grupo_nocturno = {"id": "NIVEL_2_NOCT_GUIA", "modalidad": "nocturna", "nivel": "Nivel 2"}
    print("\n🌙 SYNC NOCTURNO (Guía):")
    res_nocturno = engine.inyectar_datos_grupo(grupo_nocturno, "Guía")
    print(json.dumps(res_nocturno, indent=2, ensure_ascii=False))
