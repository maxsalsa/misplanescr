# -*- coding: utf-8 -*-
"""
ANTIGRAVITY LEGAL & ETHICS GUARD
Gestor de Protocolos de Actuación MEP (Bullying, Armas, Drogas, Ingreso)
"""
import psycopg2
import os
import json
from datetime import datetime
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityLegalGuard:
    """
    Legal Guard: Activa Rutas Críticas y genera Actas Oficiales.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        
        # Base de Conocimiento de Protocolos
        self.protocolos = {
            "bullying": {
                "nombre": "Protocolo de Actuación ante Situaciones de Violencia y Bullying",
                "pdf_ref": "Ruta_8_Pasos_Bullying.pdf",
                "pasos": [
                    "1. Detección y contención inmediata.",
                    "2. Comunicación a la Dirección.",
                    "3. Atención de la situación (Entrevistas por separado).",
                    "4. Comunicación con las familias.",
                    "5. Informe de Actuación.",
                    "6. Definición de Medidas (Correctivas/Restaurativas).",
                    "7. Referencia (Si aplica).",
                    "8. Seguimiento."
                ]
            },
            "armas": {
                "nombre": "Hallazgo o Tenencia de Armas",
                "pdf_ref": "Ruta_Hallazgo_Armas.pdf",
                "pasos": [
                    "⚠️ EMERGENCIA: Mantener la calma.",
                    "1. No manipule el arma (salvo riesgo inminente).",
                    "2. Resguardo de la zona y los estudiantes.",
                    "3. Notificar a Dirección y llamar al 9-1-1.",
                    "4. Acta de Hallazgo (Recolección si aplica Policía no llega).",
                    "5. Notificar a Padres/Encargados."
                ]
            },
            "drogas": {
                "nombre": "Hallazgo o Consumo de Drogas",
                "pdf_ref": "Protocolo_Drogas_2024.pdf",
                "pasos": [
                    "1. Abordaje no confrontativo.",
                    "2. Decomiso/Recolección de sustancia (Cadena de Custodia).",
                    "3. Notificación a Dirección.",
                    "4. Acta de Hallazgo.",
                    "5. Comunicación con Padres."
                ]
            },
            "ingreso": {
                "nombre": "Control de Ingreso y Permanencia (Circular 2025)",
                "pdf_ref": "Circular_DREH_SC02_CTPMN_DIR_016_2025.pdf",
                "pasos": [
                    "1. Verificación de Identidad.",
                    "2. Revisión visual (No plásticos un solo uso).",
                    "3. Registro en Bitácora de Visitantes.",
                    "4. Prohibición de ingreso de animales (salvo ley)."
                ]
            }
        }

    def activar_protocolo_mep(self, tipo_incidente, estudiante_id):
        """
        Carga la ruta de actuación oficial del MEP desde Neon DB.
        """
        key = tipo_incidente.lower()
        # Mapeo simple de keywords
        if "bull" in key or "violencia" in key: key = "bullying"
        elif "arma" in key: key = "armas"
        elif "droga" in key: key = "drogas"
        elif "ingreso" in key or "animal" in key: key = "ingreso"
        
        protocolo = self.protocolos.get(key)
        
        if not protocolo:
            return {"status": "ERROR", "message": "Protocolo no identificado."}
            
        print(f"🚨 PROTOCOLO ACTIVADO: {protocolo['nombre']} para {estudiante_id}")

        # 1. Generar Acta Automática (Simulado)
        if key in ["armas", "drogas"]:
            doc_legal = self._generar_acta_hallazgo(estudiante_id, key)
        else:
            doc_legal = "Informe_Actuacion_Basico.pdf"

        # 2. Registrar Activación en Neon
        self._log_activacion(key, estudiante_id)

        return {
            "status": "PROTOCOLO_ACTIVO",
            "tipo": protocolo['nombre'],
            "alerta_ui": f"⚠️ ATENCIÓN: Siguiendo {protocolo['nombre']}",
            "guia_pasos": protocolo['pasos'],
            "documento_legal_generado": doc_legal,
            "pdf_referencia": protocolo['pdf_ref']
        }

    def _generar_acta_hallazgo(self, est_id, tipo):
        filename = f"ACTA_{tipo.upper()}_{est_id}_{datetime.now().strftime('%Y%m%d')}.pdf"
        print(f"   ✍️  Autocompletando {filename} con datos de Max Salazar...")
        return f"/docs/legal/{filename}"

    def _log_activacion(self, protocolo, est_id):
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO analytics_antigravity (id, plan_id, suscriptor_id, accion, timestamp)
                        VALUES (gen_random_uuid(), %s, %s, %s, NOW())
                    """, (f"PROT-{protocolo.upper()}", self.super_user, f"INCIDENTE_{est_id}"))
            print(f"   🛡️ Protocolo Logueado en Neon DB.")
        except Exception as e:
            print(f"   ⚠️ Error Logging DB: {e}")

# Test Drive
if __name__ == "__main__":
    guard = AntigravityLegalGuard()
    
    # 1. Incidente Crítico: Arma
    print("\n🔫 SIMULACRO DE HALLAZGO DE ARMA:")
    res_arma = guard.activar_protocolo_mep("posible arma blanca", "EST-PELIGRO-007")
    print(json.dumps(res_arma, indent=2, ensure_ascii=False))
    
    # 2. Incidente Bullying
    print("\n👊 REPORTING BULLYING:")
    res_bullying = guard.activar_protocolo_mep("bullying verbal", "EST-VICTIMA-008")
    print(json.dumps(res_bullying, indent=2, ensure_ascii=False))
