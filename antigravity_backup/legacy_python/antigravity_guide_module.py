# -*- coding: utf-8 -*-
"""
ANTIGRAVITY GUIDE MODULE
Gestión de Conducta, Expediente y Asistencia Guía
"""
import psycopg2
import os
import json
from psycopg2.extras import Json
from datetime import datetime

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityGuideModule:
    """
    Módulo Guía: Administra el expediente conductual y la asistencia oficial.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        
        # Reglamento de Evaluación de los Aprendizajes (Puntos a restar)
        self.baremos_faltas = {
            "Leve": {"min": 1, "max": 5, "default": 3},
            "Grave": {"min": 6, "max": 10, "default": 8},
            "Muy Grave": {"min": 11, "max": 45, "default": 15}, # Max varia, suele ser hasta perdida total en casos extremos
        }

    def procesar_falta(self, estudiante_id, historial_actual, tipo_falta, descripcion, puntos_custom=None):
        """
        Registra una nueva boleta y recalcula la nota de conducta.
        """
        baremo = self.baremos_faltas.get(tipo_falta, {"default": 0})
        puntos_restar = puntos_custom if puntos_custom else baremo['default']
        
        # Validar rangos
        if puntos_custom:
            if puntos_custom < baremo['min'] or puntos_custom > baremo['max']:
                print(f"⚠️ Puntos fuera de rango para falta {tipo_falta}. Ajustando a default.")
                puntos_restar = baremo['default']

        nueva_boleta = {
            "fecha": datetime.now().strftime("%Y-%m-%d"),
            "tipo_falta": tipo_falta,
            "descripcion": descripcion,
            "puntos_restados": puntos_restar,
            "estado": "Pendiente Firma",
            "id_boleta": f"BOL-{int(datetime.now().timestamp())}"
        }
        
        historial_actual.append(nueva_boleta)
        nota_actual = self._calcular_nota_conducta(historial_actual)
        
        return nota_actual, historial_actual

    def _calcular_nota_conducta(self, historial):
        nota = 100
        for boleta in historial:
            nota -= boleta['puntos_restados']
        return max(0, nota) # No puede ser negativa

    def consolidar_grupo_guia(self, grupo_id, lista_estudiantes):
        """
        Genera el JSON maestro 'docencia_guia' para Neon DB.
        lista_estudiantes: [{'id': '...', 'historial': [], 'asistencia_mensual': '...'}, ...]
        """
        print(f"👮 Consolidando Grupo Guía: {grupo_id}...")
        
        expedientes_procesados = []
        alertas = []
        
        for est in lista_estudiantes:
            nota_conducta = self._calcular_nota_conducta(est.get('historial', []))
            
            expediente = {
                "estudiante_id": est['id'],
                "nota_conducta_actual": nota_conducta,
                "historial_boletas": est.get('historial', []),
                "asistencia_mensual_oficial": est.get('asistencia_mensual', "100%"),
                "status_conducta": "Alerta" if nota_conducta < 70 else "Regular"
            }
            
            if nota_conducta < 70:
                alertas.append(f"Estudiante {est['id']} en riesgo (Nota: {nota_conducta})")
                
            expedientes_procesados.append(expediente)

        json_maestro = {
            "docencia_guia": {
                "docente_admin": self.super_user,
                "grupo_id": grupo_id,
                "es_grupo_guia": True,
                "fecha_corte": datetime.now().strftime("%Y-%m-%d"),
                "resumen_alertas": alertas,
                "estudiantes_expediente": expedientes_procesados
            }
        }
        
        self._guardar_gestion(grupo_id, json_maestro)

    def procesar_boleta_conducta(self, estudiante_id, tipo_falta, descripcion):
        """
        Resta puntos del 100 inicial y prepara la generación del PDF.
        Método wrapper solicitado para 'Ejecución Automática'.
        """
        # Mapeo Exacto Solicitado
        faltas_reglamento = {
            "Leve": 5,
            "Grave": 10,
            "Muy Grave": 20
        }
        
        puntos_a_restar = faltas_reglamento.get(tipo_falta, 0)
        
        # Simular recuperación de historial existente (en prod vendría de self.get_expediente)
        historial_mock = [] 
        
        # Reutilizamos la lógica robusta existente
        nota_actual, nuevo_historial = self.procesar_falta(estudiante_id, historial_mock, tipo_falta, descripcion, puntos_a_restar)
        
        # 2. Trigger Frontend Alert
        alerta = None
        if nota_actual < 70:
            alerta = "CRÍTICO: Estudiante en condición de reprobación de conducta."
            
        # 3. Trigger PDF Generation (Simulado)
        pdf_path = self._generar_citacion_pdf(estudiante_id, tipo_falta, nuevo_historial[-1])
        
        return {
            "estudiante_id": estudiante_id,
            "nueva_nota_conducta": nota_actual,
            "puntos_restados": puntos_a_restar,
            "alerta_frontend": alerta,
            "documento_generado": pdf_path
        }

    def _generar_citacion_pdf(self, est_id, falta, boleta):
        """
        Simula la creación del PDF oficial.
        """
        filename = f"CITACION_{est_id}_{boleta['id_boleta']}.pdf"
        # Aquí iría lógica de ReportLab o HTML-to-PDF
        print(f"📄 Generando PDF Oficial: {filename}...")
        return f"/docs/citaciones/{filename}"

    def _guardar_gestion(self, grupo_id, data):
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO guide_management_antigravity (id, docente_admin, grupo_id, gestion_json, updated_at)
                        VALUES (gen_random_uuid(), %s, %s, %s, NOW())
                    """, (self.super_user, grupo_id, Json(data)))
            print(f"✅ Gestión Guía Sincronizada: {grupo_id}")
        except Exception as e:
            print(f"❌ Error Guide DB: {e}")

# Test Drive
if __name__ == "__main__":
    manager = AntigravityGuideModule()
    
    # 1. Prueba de Ejecución Automática (Wrapper)
    print("\n🎫 Ejecutando 'Módulo de Citaciones y Boletas'...")
    resultado_boleta = manager.procesar_boleta_conducta("EST-999-TEST", "Grave", "Falta de respeto a la autoridad")
    print(json.dumps(resultado_boleta, indent=2))
    
    # 2. Consolidación Grupo (Legacy Test)
    print("\n👮 Consolidación Masiva...")
    historial_mock = []
    # Usamos la lógica base para llenar datos
    manager.procesar_falta("EST-777", historial_mock, "Leve", "Uniforme incompleto", 5)
    
    estudiantes_mock = [
        {"id": "EST-777", "historial": historial_mock, "asistencia_mensual": "95%"},
        {"id": "EST-888", "historial": [], "asistencia_mensual": "100%"}
    ]
    
    manager.consolidar_grupo_guia("11-2_INFORMATICA", estudiantes_mock)
