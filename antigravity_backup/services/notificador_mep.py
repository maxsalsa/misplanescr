# -*- coding: utf-8 -*-
"""
ANTIGRAVITY NOTIFICADOR MEP: Sistema Oficial de Comunicación
Compatible con Microsoft 365 (Teams, Outlook, OneDrive institucional)
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List

class NotificadorMEP:
    """
    Sistema de notificaciones oficiales para el ecosistema MEP
    Formato oficial: CEDULA@est.mep.go.cr
    """
    
    def __init__(self):
        # Configuración SMTP del MEP (educativa - ajustar según servidor real)
        self.smtp_server = "smtp.office365.com"  # Servidor Outlook/Teams MEP
        self.smtp_port = 587
        self.remitente_docente = "docente_ultra@mep.go.cr"
    
    def enviar_reto_oficial(
        self, 
        correos_estudiantes: List[str], 
        tema: str, 
        reto_detalle: str,
        tipo_reto: str = "Oro"
    ) -> bool:
        """
        Envía reto de aprendizaje al correo oficial del MEP
        
        Args:
            correos_estudiantes: Lista de correos @est.mep.go.cr
            tema: Tema del reto
            reto_detalle: Descripción completa
            tipo_reto: "Bronce", "Plata" o "Oro"
        
        Returns:
            bool: True si se envió exitosamente
        """
        try:
            # Crear mensaje formal
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"🎯 NUEVO RETO {tipo_reto.upper()}: {tema}"
            msg['From'] = self.remitente_docente
            msg['To'] = ", ".join(correos_estudiantes)
            
            # Cuerpo del mensaje en formato oficial MEP
            cuerpo_html = f"""
            <html>
            <body style="font-family: Segoe UI, Tahoma, sans-serif;">
                <div style="background-color: #0078D4; color: white; padding: 20px;">
                    <h2>🎓 Ministerio de Educación Pública - Costa Rica</h2>
                </div>
                
                <div style="padding: 20px;">
                    <h3>Estimada comunidad estudiantil:</h3>
                    
                    <p>Se ha activado un nuevo <strong>Reto de Aprendizaje {tipo_reto}</strong> 
                    en la plataforma Microsoft Teams.</p>
                    
                    <div style="background-color: #F3F2F1; padding: 15px; margin: 20px 0; border-left: 5px solid #0078D4;">
                        <h4>{tema}</h4>
                        {reto_detalle}
                    </div>
                    
                    <p><strong>Entrega:</strong> A través de Microsoft Teams o OneDrive institucional</p>
                    <p><strong>Correo oficial:</strong> Responda solo desde su cuenta @est.mep.go.cr</p>
                    
                    <hr style="margin: 30px 0;">
                    
                    <p style="color: #666; font-size: 12px;">
                        Este mensaje fue generado automáticamente por Antigravity Ultra.<br>
                        Ministerio de Educación Pública | Costa Rica 2026
                    </p>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(cuerpo_html, 'html'))
            
            # Simulación de envío (en producción aquí iría el SMTP real)
            print(f"📧 [SISTEMA MEP] Notificación preparada:")
            print(f"   Destinatarios: {len(correos_estudiantes)} estudiantes")
            print(f"   Tema: {tema}")
            print(f"   Tipo: Reto {tipo_reto}")
            print(f"   ✅ Lista para envío via Outlook/Teams institucional")
            
            # En producción:
            # with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            #     server.starttls()
            #     server.login(usuario, contraseña)
            #     server.send_message(msg)
            
            return True
            
        except Exception as e:
            print(f"❌ Error en notificación MEP: {e}")
            return False
    
    def generar_anuncio_teams(
        self, 
        tema: str, 
        reto_detalle: str, 
        tipo_reto: str = "Oro",
        fecha_entrega: str = "Próxima sesión"
    ) -> str:
        """
        Genera texto formal listo para pegar en Teams o enviar por correo masivo
        
        Returns:
            str: Anuncio formateado para Teams
        """
        anuncio = f"""
╔══════════════════════════════════════════════════════════╗
║  🎓 MINISTERIO DE EDUCACIÓN PÚBLICA - COSTA RICA 2026  ║
╚══════════════════════════════════════════════════════════╝

📢 ANUNCIO OFICIAL - NUEVO RETO DE APRENDIZAJE

Estimada comunidad estudiantil,

Se ha activado el siguiente reto de aprendizaje en nuestra plataforma institucional:

🎯 RETO {tipo_reto.upper()}: {tema}

{reto_detalle}

📅 FECHA DE ENTREGA: {fecha_entrega}

📤 CANAL DE ENTREGA:
   - Microsoft Teams (Canal de la asignatura)
   - OneDrive institucional (carpeta compartida)
   - Correo oficial: su.cedula@est.mep.go.cr

⚠️ IMPORTANTE:
   • Use ÚNICAMENTE su correo institucional @est.mep.go.cr
   • NO envíe trabajos por redes sociales personales
   • Todas las entregas quedan registradas en el sistema MEP

🤝 TRABAJO COLABORATIVO:
   Use Microsoft Teams para coordinarse con sus compañeros de equipo.

---
Generado automáticamente por Antigravity Ultra
Ministerio de Educación Pública | Costa Rica
"""
        return anuncio
    
    def validar_correo_mep(self, correo: str) -> bool:
        """
        Valida que el correo sea formato oficial MEP
        """
        return correo.endswith("@est.mep.go.cr") or correo.endswith("@mep.go.cr")

if __name__ == "__main__":
    # Test del notificador
    notificador = NotificadorMEP()
    
    # Test 1: Generar anuncio para Teams
    anuncio = notificador.generar_anuncio_teams(
        tema="Configuración de Red LAN",
        reto_detalle="En equipos de 3, diseñen y simulen una red LAN empresarial usando Packet Tracer.",
        tipo_reto="Plata",
        fecha_entrega="Viernes 25 de enero"
    )
    print(anuncio)
    
    # Test 2: Enviar notificación
    correos_test = ["118230456@est.mep.go.cr", "209340567@est.mep.go.cr"]
    notificador.enviar_reto_oficial(
        correos_test,
        "Redes de Computadoras",
        "Completar el Reto Plata en Teams",
        "Plata"
    )
