import os
import sys
import time
from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT

# -----------------------------------------------------------------------------
# CONFIGURACIÓN
# -----------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(os.path.dirname(BASE_DIR), "public", "assets")

class GeneradorCotizacion:
    def __init__(self, cliente, datos_cotizacion):
        self.cliente = cliente
        self.cot = datos_cotizacion
        self.styles = getSampleStyleSheet()
        self._setup_styles()

    def _setup_styles(self):
        self.styles.add(ParagraphStyle(name='QuoteHeader', parent=self.styles['Normal'], fontSize=24, fontName='Helvetica-Bold', textColor=colors.HexColor('#003366')))
        self.styles.add(ParagraphStyle(name='QuoteSub', parent=self.styles['Normal'], fontSize=10, textColor=colors.grey))

    def generar_pdf(self, filename="Cotizacion_Formal.pdf"):
        doc = SimpleDocTemplate(filename, pagesize=LETTER)
        story = []

        # 1. Encabezado Formal
        story.append(Paragraph("MisPlanesCR", self.styles['QuoteHeader']))
        story.append(Paragraph("Soluciones Educativas Inteligentes | Lic. Max Salazar Sánchez", self.styles['QuoteSub']))
        story.append(Spacer(1, 0.5*cm))
        story.append(Paragraph("COTIZACIÓN DE SERVICIOS PROFESIONALES", self.styles['Heading2']))
        story.append(Spacer(1, 1*cm))

        # 2. Datos Cliente y Validez
        data_info = [
            ["CLIENTE:", self.cliente['nombre']],
            ["FECHA:", time.strftime("%d/%m/%Y")],
            ["VÁLIDA HASTA:", self.cot['valid_until']],
            ["COTIZACIÓN #:", self.cot['number']]
        ]
        t_info = Table(data_info, colWidths=[4*cm, 10*cm])
        t_info.setStyle(TableStyle([('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'), ('ALIGN', (0,0), (-1,-1), 'LEFT')]))
        story.append(t_info)
        story.append(Spacer(1, 1*cm))

        # 3. Detalle Económico
        data_oferta = [
            ["DESCRIPCIÓN", "CANTIDAD", "PRECIO UNIT.", "TOTAL"],
            [f"Licenciamiento Anual MisPlanesCR\nModalidad: {self.cliente.get('modalidad', 'Estándar')}", 
             str(self.cot['seats']), 
             f"${self.cot['price_per_seat']}", 
             f"${self.cot['total']}"]
        ]
        t_oferta = Table(data_oferta, colWidths=[8*cm, 3*cm, 3.5*cm, 3.5*cm])
        t_oferta.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#003366')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('ALIGN', (1,0), (-1,-1), 'CENTER'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(t_oferta)
        story.append(Spacer(1, 0.5*cm))

        # 4. Inversión y Gancho
        story.append(Paragraph("BENEFICIOS INCLUIDOS:", self.styles['Heading4']))
        items = [
            "• Acceso Ilimitado al Motor RAG (Planeamientos, GTAs, Exámenes).",
            "• Identidad Institucional Blindada (Logos y Membretes).",
            "• Soporte Técnico Prioritario.",
            "• Actualizaciones Curriculares MEP 2026."
        ]
        for item in items:
            story.append(Paragraph(item, self.styles['BodyText']))
        
        story.append(Spacer(1, 1.5*cm))
        story.append(Paragraph("___________________________________", self.styles['Normal']))
        story.append(Paragraph("Lic. Max Salazar Sánchez", self.styles['BodyText']))
        story.append(Paragraph("Director General", self.styles['QuoteSub']))

        doc.build(story)
        print(f"💰 Cotización generada: {os.path.abspath(filename)}")

if __name__ == "__main__":
    gen = GeneradorCotizacion(
        {"nombre": "CTP de Prueba", "modalidad": "Técnica"},
        {"valid_until": "05/02/2026", "number": "COT-2026-001", "seats": 60, "price_per_seat": 65, "total": 3900}
    )
    gen.generar_pdf()
