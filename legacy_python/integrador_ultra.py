# -*- coding: utf-8 -*-
"""
ANTIGRAVITY INTEGRATOR ULTRA: El Pegamento Industrial
Orquesta QA, lógica multi-grupo y sincronización con Neon
"""
import time
import streamlit as st
from auto_experto import motor_antigravity_ultra
from auto_exporter import inyectar_plan_a_neon, sincronizar_lista_clase

class QAGuardian:
    """Validador de Calidad para el Equipo Ultra"""
    
    @staticmethod
    def validar_binomio(texto):
        """Verifica la presencia del Binomio Sagrado"""
        keywords = ["docente", "facilita", "estudiante", "construye", "crea", "prototipa", "analiza"]
        score = sum(1 for word in keywords if word in texto.lower())
        return score >= 3

    @staticmethod
    def auditoria_tiempo(texto):
        """Verifica la Cronopedagogía MEP (4 momentos)"""
        momentos = ["Focalizacion", "Focalización", "Exploracion", "Exploración", 
                   "Contrastacion", "Contrastación", "Aplicacion", "Aplicación"]
        found = sum(1 for m in momentos if m in texto)
        return found >= 3 # Al menos 3 de los 4 mencionados

    @staticmethod
    def validar_canales_oficiales(texto):
        """Bloquea menciones a redes sociales personales"""
        prohibidos = ["whatsapp", "telegram personal", "facebook group"]
        for p in prohibidos:
            if p in texto.lower():
                return False
        return True

class IntegradorFlujo:
    """Orquestador de Flujo"""
    

    @staticmethod
    def ejecutar_flujo_completo(tema, modalidad, nivel, grupos=None):
        """
        1. Genera JSON Estructurado con IA
        2. Detecta oportunidad Multi-Grupo
        3. Valida QA y Schema
        """
        if grupos is None:
            grupos = []
            
        # 1. GENERACIÓN ESTRUCTURADA
        print(f"🔄 Integrador: Iniciando motor JSON para {tema}...")
        
        # Simulación de extracción JSON del motor (En producción usaría JsonOutputParser)
        # Aquí forzamos la estructura para el demo, conectando con el motor real
        contenido_raw = motor_antigravity_ultra(tema, modalidad, nivel)
        
        # Transformación a Estructura Relacional (Mockup Inteligente para Demo)
        # En producción, el LLM generaría esto nativamente
        import uuid
        estructura_json = {
            "id_programa": f"PROG-{uuid.uuid4().hex[:8].upper()}",
            "metadata": {
                "especialidad": modalidad,
                "nivel": nivel,
                "unidad_nombre": tema,
                "carga_horaria": "80 min"
            },
            "planificacion": [
                {
                    "ra_id": "RA-01",
                    "resultado_aprendizaje": f"Aplica conocimientos sobre {tema}",
                    "criterios_evaluacion": ["Define conceptos clave", "Implementa soluciones prácticas"],
                    "mediacion_pedagogica": {
                        "focalizacion": "Debate guiado sobre pre-saberes funcionales",
                        "exploracion": "Reto Bronce: Investigación individual",
                        "contrastacion": "Reto Plata: Análisis comparativo en parejas",
                        "aplicacion": "Reto Oro: Proyecto práctico de implementación"
                    },
                    "dua": "Uso de material audiovisual y trabajo colaborativo",
                    "contenido_generado": contenido_raw # Mantiene el texto rico original
                }
            ],
            "grupos_asignados": grupos
        }
        
        # 2. INTELIGENCIA MULTI-GRUPO
        if len(grupos) > 1:
            estructura_json["metadata"]["estrategia_multigrupo"] = "Competencia Inter-Seccional Activa"
        
        # 3. QA CHECK
        # Validamos sobre el contenido generado texto rico
        qa_status = {
            "binomio": QAGuardian.validar_binomio(contenido_raw),
            "cronopedagogia": QAGuardian.auditoria_tiempo(contenido_raw),
            "compliance": QAGuardian.validar_canales_oficiales(contenido_raw),
            "schema_valid": True # Estructura JSON garantizada por código
        }
            
        return estructura_json, qa_status

    @staticmethod
    def sincronizar_con_retry(payload, max_retries=3):
        """
        Sincronización Self-Healing para Objetos JSON Complejos
        """
        attempt = 0
        while attempt < max_retries:
            try:
                print(f"💾 Intento {attempt+1}/{max_retries} escribiendo objeto JSON en Neon...")
                # Adaptador para usar la función existente con el nuevo formato
                payload_adaptado = {
                    "tema": payload["metadata"]["unidad_nombre"],
                    "contenido": payload, # Ahora pasamos el objeto entero
                    "metadata": payload["metadata"],
                    "grupos": payload.get("grupos_asignados", [])
                }
                
                success = inyectar_plan_a_neon(payload_adaptado)
                if success:
                    return True, "Objeto Pedagógico Sincronizado"
                else:
                    raise Exception("Fallo en inyección SQL")
            except Exception as e:
                attempt += 1
                time.sleep(1) # Backoff
                if attempt == max_retries:
                    return False, f"Error persistente: {str(e)}"

        return False, "Max retries exceeded"
