# -*- coding: utf-8 -*-
"""
ANTIGRAVITY FULL-STACK ARCHITECT
Generador de 'Single Source of Truth' (Integración Total Backend-Frontend)
"""
import psycopg2
import os
import json
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityFullStackArchitect:
    """
    Arquitecto Full-Stack: Garantiza la coherencia entre Neon DB y la UI.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def configurar_grupo_guia(self, docente_id, grupo_id):
        """
        Activa las funciones de administración de conducta en el Frontend.
        """
        # Lógica de Backend simulada (en prod iría a DB)
        print(f"🔧 Configurando Grupo Guía: {grupo_id} para Docente {docente_id}...")
        
        # 1. Recuperar lista de estudiantes (Simulado)
        # 2. Inicializar Nota de Conducta en 100
        # 3. Habilitar Boletario
        
        return {
            "status": "Modo Guía Activado",
            "grupo_id": grupo_id,
            "features_enabled": ["Descuento de puntos", "Generador de citaciones", "Expediente conductual"],
            "ui_flags": {
                "show_conduct_tab": True,
                "highlight_color": "#FFD700" # Premium/Gold indicator
            }
        }

    def generar_single_source_of_truth(self, grupo_id, tipo_materia, es_guia=False):
        """
        Genera el Objeto Maestro JSON para el Frontend.
        tipo_materia: 'tecnica', 'academica', 'complementaria'
        """
        
        # Configuración Dinámica según Tipo
        config_visual = {}
        if tipo_materia == 'tecnica':
             config_visual = {"theme": "industrial_dark", "icon_set": "tools", "eval_mode": "competencias"}
        elif tipo_materia == 'academica':
             config_visual = {"theme": "academic_clean", "icon_set": "books", "eval_mode": "sumativa"}
             
        # Objeto Maestro
        ssot = {
            "meta": {
                "grupo_id": grupo_id,
                "tipo_asignatura": tipo_materia,
                "generated_at": "NOW()",
                "admin": self.super_user
            },
            "rol_docente": {
                "is_guia": es_guia,
                "permissions": ["read", "write", "manage_conduct"] if es_guia else ["read", "write"]
            },
            "backend_sync": {
                "tables_involved": ["m_mep_respaldo", "classroom_records_antigravity", "guide_management_antigravity"]
            },
            "frontend_logic": {
                "ui_config": config_visual,
                "evaluacion": {
                    "reglamento_id": "MEP-2026-V10",
                    "scales": "3-2-1" if tipo_materia == 'tecnica' else "0-100"
                },
                "asistencia": {
                    "mode": "diaria_total" if es_guia else "por_bloque",
                    "bloque_max": 4
                }
            }
        }
        
        return ssot

# Test Drive
if __name__ == "__main__":
    architect = AntigravityFullStackArchitect()
    
    # 1. Activar Modo Guía
    config_guia = architect.configurar_grupo_guia("DOC-MAX", "10-1_ELECTRO")
    print("\n🔧 CONFIG GUÍA (Output):")
    print(json.dumps(config_guia, indent=2))
    
    # 2. Generar SSOT para Materia Técnica (sin ser guía)
    ssot_tecnica = architect.generar_single_source_of_truth("12-1_CIBER", "tecnica", es_guia=False)
    print("\n🏗️ SSOT TÉCNICA (Output):")
    print(json.dumps(ssot_tecnica, indent=2))
    
    # 3. Generar SSOT para Grupo Guía (Académico)
    ssot_guia = architect.generar_single_source_of_truth("7-1_SECCION", "academica", es_guia=True)
    print("\n🏗️ SSOT GUÍA ACADÉMICA (Output):")
    print(json.dumps(ssot_guia, indent=2))
