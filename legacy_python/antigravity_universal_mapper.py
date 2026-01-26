# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UNIVERSAL MAPPER
Gestor de Equivalencias y Niveles (Diurna/Nocturna/Cursos Libres)
"""
import psycopg2
import os
import json
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityUniversalMapper:
    """
    Universal Mapper: Mapea contextos de jornada a currículo estándar.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        
        # Tabla de Equivalencias MEP (Técnica)
        self.equivalencias = {
            "Nivel 1": "10mo",
            "Nivel 2": "11mo", 
            "Nivel 3": "12mo"
        }

    def crear_instancia_grupo(self, nombre_grupo, modalidad, especialidad="Desarrollo Web"):
        """
        Crea el entorno de trabajo según si es 10mo o Nivel 1 Nocturno.
        """
        print(f"🌍 Mapeando Grupo: {nombre_grupo} ({modalidad}) - {especialidad}...")
        
        config_modalidad = {
            "diurna": {"niveles": ["10mo", "11mo", "12mo"], "alias_nivel": "Año", "escala_eval": "Semestral"},
            "nocturna": {"niveles": ["Nivel 1", "Nivel 2", "Nivel 3"], "alias_nivel": "Nivel", "escala_eval": "Semestral"},
            "cursos_libres": {"niveles": ["Básico", "Intermedio", "Avanzado"], "alias_nivel": "Módulo", "escala_eval": "Suficiencia"}
        }
        
        config_actual = config_modalidad.get(modalidad, config_modalidad['diurna'])
        
        # Detectar Nivel desde el nombre del grupo (Simulado parsing)
        nivel_detectado = self._detectar_nivel(nombre_grupo, modalidad)
        
        # Mapeo a Currículo Base (Neon DB)
        nivel_curriculo = nivel_detectado
        if modalidad == "nocturna":
            nivel_curriculo = self.equivalencias.get(nivel_detectado, nivel_detectado)
            
        print(f"   ↳ Contexto: {modalidad} | Nivel UI: {nivel_detectado} => Curriculo Neon: {nivel_curriculo}")

        return {
            "grupo": nombre_grupo,
            "modalidad": modalidad,
            "configuracion_ui": {
                "labels": config_actual,
                "dashboard_title": f"{especialidad} - {nivel_detectado}"
            },
            "backend_mapping": {
                "target_curriculum_level": nivel_curriculo, # El Key para buscar en m_mep_respaldo
                "evaluation_logic": config_actual['escala_eval']
            },
            "modules_active": ["Attendance", "Grades", "Conduct"] # Conducta activa para todos (Guía o no)
        }

    def _detectar_nivel(self, nombre, modalidad):
        # Heurística simple
        if "10" in nombre or "Nivel 1" in nombre: return "Nivel 1" if modalidad == "nocturna" else "10mo"
        if "11" in nombre or "Nivel 2" in nombre: return "Nivel 2" if modalidad == "nocturna" else "11mo"
        if "12" in nombre or "Nivel 3" in nombre: return "Nivel 3" if modalidad == "nocturna" else "12mo"
        return "10mo" # Default

# Test Drive
if __name__ == "__main__":
    mapper = AntigravityUniversalMapper()
    
    # 1. Caso Diurno (CTP)
    grupo_diurno = mapper.crear_instancia_grupo("11-3 Diurna", "diurna", "Desarrollo Web")
    print("\n☀️ CONFIG DIURNA:")
    print(json.dumps(grupo_diurno, indent=2, ensure_ascii=False))
    
    # 2. Caso Nocturno (CINDEA)
    grupo_nocturno = mapper.crear_instancia_grupo("Sección Nivel 2 Nocturna", "nocturna", "Desarrollo Web")
    print("\n🌙 CONFIG NOCTURNA:")
    print(json.dumps(grupo_nocturno, indent=2, ensure_ascii=False))
