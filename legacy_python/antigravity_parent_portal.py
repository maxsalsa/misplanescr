# -*- coding: utf-8 -*-
"""
ANTIGRAVITY PARENT PORTAL & REINFORCEMENT ACTS
Módulo de Comunicación Familiar, Portal de Padres y Actas de Compromiso
"""
import json
import hashlib
import hmac
import os
import csv
from datetime import datetime

class AntigravityParentPortal:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def generar_acta_refuerzo(self, estudiante_data, compromisos_dua, compromisos_hogar):
        """
        Genera el Acta de Refuerzo Académico con validez legal.
        Caso Ej: María López (Nivel 1).
        """
        print(f"👨‍👩‍👧 Generando Acta de Refuerzo para: {estudiante_data['nombre']}...")
        
        acta = {
            "institucion": "CTP Mercedes Norte",
            "titulo": "ACUERDO DE REFUERZO ACADÉMICO - UPRE",
            "fecha": datetime.now().isoformat(),
            "estudiante": estudiante_data,
            "situacion_detectada": {
                "indicador": estudiante_data['indicador_bajo'],
                "nivel_actual": "1 (Inicial)",
                "riesgo": "Alto"
            },
            "plan_accion_concertado": {
                "compromiso_docente": compromisos_dua,
                "compromiso_encargado": compromisos_hogar,
                "fecha_revision": "En 3 días hábiles"
            }
        }
        
        # Sellar Integridad
        payload = json.dumps(acta, sort_keys=True)
        security_hash = hmac.new(self.master_key.encode(), payload.encode(), hashlib.sha256).hexdigest()
        
        acta['metadata_legal'] = {
            "hash_integridad": security_hash,
            "qr_validacion": f"UPRE-ACTA-{security_hash[:8].upper()}",
            "estado": "PENDIENTE_FIRMA_PADRE"
        }
        
        return acta

    def generar_recomendaciones_hogar(self, estudiante_id, tipo_riesgo):
        """
        Algoritmo de Generación de Recomendaciones personalizado.
        """
        recomendaciones = {
            "ACADEMICO": {
                "titulo": "Estrategia de Éxito Académico",
                "tips": [
                    "Establecer 'Hora Silenciosa': 45 mins de estudio técnico diario.",
                    "Revisar el 'Portafolio de Evidencias' en la App Antigravity (Semanal).",
                    "Fomentar la práctica con simuladores en casa (si hay acceso)."
                ],
                "accion_padre": "Supervisar avance en proyectos."
            },
            "AUSENTISMO": {
                "titulo": "Vinculación al Centro Educativo",
                "tips": [
                    "Conversar sobre metas profesionales y futuro laboral.",
                    "Validar asistencia diaria mediante Notificaciones Push.",
                    "Asegurar transporte y alimentación (Beca)."
                ],
                "accion_padre": "Justificar ausencias en < 3 días."
            },
            "CONDUCTA": {
                "titulo": "Convivencia y Valores",
                "tips": [
                    "Reforzar límites y respeto en el uso de redes sociales.",
                    "Practicar escucha activa sobre conflictos escolares.",
                    "Revisar reglamento interno junto al estudiante."
                ],
                "accion_padre": "Firmar boletas de conducta digitalmente."
            }
        }
        
        seleccion = recomendaciones.get(tipo_riesgo, recomendaciones["ACADEMICO"])
        
        return {
            "estudiante_id": estudiante_id,
            "perfil_riesgo": tipo_riesgo,
            "plan_hogar": seleccion
        }

    def simular_portal_padres(self, estudiante_id):
        """
        Simula la vista que tendría el padre en su celular.
        """
        print(f"\n📱 Accediendo al PORTAL PARA PADRES (Vista Móvil) - ID: {estudiante_id}")
        # Fetch data real (simulada)
        progreso = {"asistencia": "95%", "promedio_ti": "82", "estado": "🟢 Estable (Mejorando)"}
        return progreso

if __name__ == "__main__":
    portal = AntigravityParentPortal()
    
    # 1. Caso María López (Refuerzo Académico)
    acta_maria = portal.generar_acta_refuerzo(
        estudiante_data={"id": "EST-05", "nombre": "María López", "seccion": "10-1", "indicador_bajo": "Identifica componentes internos del hardware"},
        compromisos_dua="Aplicar Ruta Inclusiva: Simuladores visuales y tarjetas táctiles.",
        compromisos_hogar="Supervisar entrega de 'Mapa Mental' en 3 días."
    )
    
    # Exportar Acta JSON
    with open("acta_refuerzo_maria_lopez.json", "w", encoding='utf-8') as f:
        json.dump(acta_maria, f, indent=2, ensure_ascii=False)
        print("   ✅ Acta generada: acta_refuerzo_maria_lopez.json")

    # 2. Recomendaciones Generales (Diferentes Riesgos)
    recs_academico = portal.generar_recomendaciones_hogar("EST-05", "ACADEMICO")
    recs_ausentismo = portal.generar_recomendaciones_hogar("EST-99", "AUSENTISMO")
    
    # Exportar CSV de Recomendaciones
    with open("recomendaciones_hogar_10_1.csv", "w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Estudiante ID", "Riesgo", "Título Plan", "Tip 1", "Acción Padre"])
        writer.writerow([
            recs_academico['estudiante_id'], recs_academico['perfil_riesgo'], 
            recs_academico['plan_hogar']['titulo'], recs_academico['plan_hogar']['tips'][0],
            recs_academico['plan_hogar']['accion_padre']
        ])
        writer.writerow([
            recs_ausentismo['estudiante_id'], recs_ausentismo['perfil_riesgo'],
            recs_ausentismo['plan_hogar']['titulo'], recs_ausentismo['plan_hogar']['tips'][0],
            recs_ausentismo['plan_hogar']['accion_padre']
        ])
    print("   ✅ Recomendaciones exportadas: recomendaciones_hogar_10_1.csv")

    # 3. Portal View
    vista = portal.simular_portal_padres("EST-05")
    print(f"   📲 Visualización Padre: {vista}")
