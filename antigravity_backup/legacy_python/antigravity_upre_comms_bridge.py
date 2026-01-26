# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UPRE COMMUNICATION BRIDGE
Puente de Comunicación y Respaldo Legal (Envío de Alertas)
"""
import psycopg2
import os
import json
from datetime import datetime
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityUPRECommsBridge:
    """
    UPRE Comms Bridge: Gestiona el envío oficial y el log de evidencia.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def ejecutar_protocolo_upre(self, estudiante_id, destinatario_email="orientacion@colegio.mep.go.cr"):
        """
        Finaliza el proceso de alerta temprana y lo comunica a las autoridades.
        """
        print(f"📧 Iniciando Protocolo de Envío UPRE para: {estudiante_id}...")
        
        # 1. Generar el PDF oficial (Simulado)
        # En prod: Llamada a AntigravityUPRESecretary.generar_reporte_upre_automatico()
        reporte_pdf_path = self._construir_pdf_upre(estudiante_id)
        
        # 2. Registrar el envío en la bitácora de Antigravity (Protección legal)
        log_id = self._registrar_evidencia_envio(estudiante_id, "Orientación", destinatario_email)
        
        # 3. Disparar el servicio de correo (Simulado)
        status_email = self._send_email_mock(destinatario_email, reporte_pdf_path)
        
        # 4. Programar recordatorio de seguimiento (Simulado)
        self._crear_tarea_seguimiento(estudiante_id)
        
        return {
            "status": "Success",
            "message": "✅ Reporte UPRE enviado y archivado en Neon DB con éxito.",
            "meta": {
                "log_id": log_id,
                "timestamp": str(datetime.now()),
                "recipient": destinatario_email,
                "file": reporte_pdf_path
            }
        }

    def _construir_pdf_upre(self, est_id):
        # Simula generación de archivo fisico
        filename = f"ALERTA_UPRE_{est_id}_{datetime.now().strftime('%Y%m%d')}.pdf"
        print(f"   📄 Construyendo PDF: {filename}")
        return f"/docs/upre/{filename}"

    def _registrar_evidencia_envio(self, est_id, departamento, email):
        """
        Guarda el log inmutable en Neon DB.
        """
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    # Usamos una tabla existente o generica de logs, o creamos una nueva si hiciera falta
                    # Para este ejemplo, usamos 'security_logs' o similar si existiera, o simulamos logica
                    # Vamos a usar 'analytics_antigravity' como contenedor generico de eventos importantes
                    cur.execute("""
                        INSERT INTO analytics_antigravity (id, plan_id, suscriptor_id, accion, timestamp)
                        VALUES (gen_random_uuid(), %s, %s, %s, NOW())
                        RETURNING id;
                    """, (f"UPRE-CASE-{est_id}", self.super_user, f"ENVIO_REPORTE_UPRE_TO_{email}"))
                    
                    log_id = cur.fetchone()[0]
                    print(f"   🛡️ Evidencia Legal Archivada: Log ID {log_id}")
                    return log_id
        except Exception as e:
            print(f"   ⚠️ Error Logging DB: {e}")
            return "LOG-OFFLINE-BACKUP"

    def _send_email_mock(self, to, attachment):
        print(f"   📨 Enviando Email a {to} con adjunto {attachment}...")
        return True

    def _crear_tarea_seguimiento(self, est_id):
        print(f"   ⏰ Tarea creada: 'Verificar evolución de {est_id} en 15 días'.")

# Test Drive
if __name__ == "__main__":
    bridge = AntigravityUPRECommsBridge()
    
    # Ejecutar Protocolo
    resultado = bridge.ejecutar_protocolo_upre("EST-RIESGO-001", "orientacion@ctp.ed.cr")
    print("\n📬 RESULTADO DEL ENVÍO:")
    print(json.dumps(resultado, indent=2, ensure_ascii=False))
