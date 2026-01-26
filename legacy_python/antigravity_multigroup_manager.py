# -*- coding: utf-8 -*-
"""
ANTIGRAVITY MULTI-GROUP MANAGER
Gestor de Inicialización y Configuración Masiva de Grupos
"""
import psycopg2
import os
import json
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityMultiGroupManager:
    """
    Gestor Multi-Grupo: Orquesta la configuración del Dashboard Docente.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def inicializar_panel_docente(self, lista_grupos):
        """
        Configura la interfaz para múltiples grupos de forma automática.
        """
        print(f"🚀 Inicializando Panel para {len(lista_grupos)} grupos...")
        
        configs_grupos = []
        
        for grupo in lista_grupos:
            grupo_id = grupo.get('id')
            es_guia = grupo.get('es_guia', False)
            tipo = grupo.get('tipo', 'Materia Regular') # Materia, Guia, Especialidad
            nivel = grupo.get('nivel')
            materia = grupo.get('materia')
            carga = grupo.get('carga_horaria', 1)
            
            print(f"   🔹 Procesando {grupo_id} ({tipo})...")
            
            feature_set = {}
            
            # 1. Configuración de Rol (Backend Logic)
            if es_guia:
                # Lógica de Docente Guía
                feature_set.update(self._activar_modulo_conducta(grupo_id))
                feature_set.update(self._activar_modulo_citaciones(grupo_id))
                feature_set['asistencia_mode'] = 'Diaria Total (IMAS/Becas)'
            else:
                # Lógica de Profesor de Materia
                feature_set['planeamiento'] = f"Cargar Indicadores de {materia} ({nivel})"
                feature_set['evaluacion'] = self._cargar_pesos_materia(tipo)
                feature_set['asistencia_mode'] = f"Bloque de {carga} Lecciones"

            # 2. Configuración de Asistencia (1-4 Lecciones)
            feature_set.update(self._configurar_bloque_asistencia(grupo_id, carga))
            
            # 3. Consolidación de Configuración
            config = {
                "unique_group_id": grupo_id,
                "display_name": f"{grupo_id} - {materia}",
                "role_context": "Guide Teacher" if es_guia else "Subject Teacher",
                "active_modules": feature_set
            }
            configs_grupos.append(config)
            
        return configs_grupos

    def _activar_modulo_conducta(self, grupo_id):
        return {
            "conduct_manager": True,
            "conduct_baseline": 100,
            "ticket_system": "Enabled"
        }

    def _activar_modulo_citaciones(self, grupo_id):
         return {
            "citations_generator": True,
            "pdf_templates": ["Citación Padre", "Amonestación Escrita"]
        }

    def _cargar_pesos_materia(self, tipo):
        if tipo == 'Especialidad':
            return {"mode": "Diferenciada", "rubrica": "Técnica"}
        return {"mode": "Reglamento Académico", "rubrica": "Sumativa"}

    def _configurar_bloque_asistencia(self, grupo_id, carga):
        return {
            "attendance_grid": {
                "blocks": carga,
                "weight_per_block": round(100/carga, 2) # Impacto simple por lección para UI
            }
        }
        
    def aplicar_plan_masivo(self, plan_id, grupos_destino):
        """
        Simula la copia de un plan a múltiples grupos.
        """
        print(f"\n⚡ Aplicando Plan {plan_id} a {len(grupos_destino)} grupos: {grupos_destino}")
        # En prod: Iterar IDs y duplicar registro en DB
        return {"status": "Success", "affected_groups": grupos_destino}

# Test Drive
if __name__ == "__main__":
    manager = AntigravityMultiGroupManager()
    
    # Matriz de Control del Usuario
    grupos_docente = [
        {"id": "11-1_INFO", "materia": "Informática", "nivel": "11mo", "es_guia": False, "tipo": "Materia", "carga_horaria": 2},
        {"id": "11-2_INFO", "materia": "Informática", "nivel": "11mo", "es_guia": False, "tipo": "Materia", "carga_horaria": 2},
        {"id": "10-1_GUIA", "materia": "Guía", "nivel": "10mo", "es_guia": True, "tipo": "Guia", "carga_horaria": 1},
        {"id": "12-3_ESP", "materia": "Especialidad", "nivel": "12mo", "es_guia": False, "tipo": "Especialidad", "carga_horaria": 4}
    ]
    
    # 1. Inicializar Panel
    configs = manager.inicializar_panel_docente(grupos_docente)
    print("\n🖥️ CONFIGURACIÓN DE PANEL (Frontend Payload):")
    print(json.dumps(configs, indent=2, ensure_ascii=False))
    
    # 2. Carga en Lote
    manager.aplicar_plan_masivo("PLAN-INFO-11-U1", ["11-1_INFO", "11-2_INFO"])
