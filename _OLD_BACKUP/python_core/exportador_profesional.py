import os
import time
import re
from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER, landscape
from reportlab.lib.units import cm, inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# -----------------------------------------------------------------------------
# CONFIGURACIÓN DE RUTAS Y ASSETS
# -----------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(os.path.dirname(BASE_DIR), "public", "assets")

# Logos (Simulados para el ejemplo)
ESCUDO_CR = os.path.join(ASSETS_DIR, "escudo_cr.png") 
# En producción real: Convertir a WebP/JPG optimizado antes de cargar

import os
import time
import re
from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pdfencrypt import StandardEncryption

from reportlab.lib.pdfencrypt import StandardEncryption
import qrcode

# -----------------------------------------------------------------------------
# CONFIGURACIÓN DE RUTAS Y ASSETS
# -----------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(os.path.dirname(BASE_DIR), "public", "assets")

class ExportadorBlindado:
    def __init__(self, tipo_doc, metadatos_inst, datos_docente, user_id="UNK", inst_id="UNK"):
        self.tipo_doc = tipo_doc
        self.inst = self.clean_metadata(metadatos_inst)
        self.docente = self.clean_metadata(datos_docente)
        self.user_id = user_id
        self.inst_id = inst_id
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def clean_metadata(self, data):
        """Sanitiza strings"""
        clean_data = {}
        for k, v in data.items():
            if isinstance(v, str):
                v = re.sub(r'[^\x00-\x7F\u00C0-\u00FF]', '', v)
                v = re.sub(r'\s+', ' ', v).strip().upper()
            clean_data[k] = v
        return clean_data

    def _generate_qr(self):
        """Genera QR de Trazabilidad en memoria"""
        data = f"MISPLANESCR|{self.user_id}|{self.inst_id}|{time.time()}"
        qr = qrcode.QRCode(box_size=10, border=1)
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')
        
        qr_path = os.path.join(os.getcwd(), "temp_qr.png")
        img.save(qr_path)
        return qr_path

    def _setup_custom_styles(self):
        self.styles.add(ParagraphStyle(name='HeaderAdmin', parent=self.styles['Normal'], fontName='Helvetica-Bold', fontSize=9, alignment=TA_CENTER, leading=11))
        self.styles.add(ParagraphStyle(name='BodyText', parent=self.styles['Normal'], fontName='Helvetica', fontSize=11, leading=13))

    def _watermark(self, canvas, doc):
        """Inyecta Marca de Agua y Pie de Página Intocable (FORENSE)"""
        width, height = LETTER
        canvas.saveState()
        
        # 1. Marca de Agua VISIBLE (Diagonal)
        # Capa hostil para fotocopias
        canvas.setFont('Helvetica-Bold', 60)
        canvas.setFillColor(colors.grey, alpha=0.08)
        canvas.translate(width/2, height/2)
        canvas.rotate(45)
        canvas.drawCentredString(0, 0, f"PROPIEDAD DE: {self.docente.get('nombre', 'MEP')}")
        canvas.restoreState()

        # 2. Micro-Texto INVISIBLE (Esteganografía simple)
        # Se dibuja en color blanco sobre blanco (o casi transparente) en los márgenes
        canvas.saveState()
        canvas.setFont('Helvetica', 4)
        canvas.setFillColor(colors.black, alpha=0.01) # Casi invisible
        # Cuadrícula de IDs
        for y in range(0, int(height), 100):
            for x in range(0, int(width), 200):
                canvas.drawString(x, y, f"ID:{self.user_id}|INS:{self.inst_id}")
        canvas.restoreState()

        # 3. QR de Trazabilidad (Esquina Inferior Derecha)
        canvas.saveState()
        try:
            qr_file = self._generate_qr()
            # Posición fija bottom-right
            canvas.drawImage(qr_file, width - 2.5*cm, 1*cm, width=1.5*cm, height=1.5*cm)
        except Exception as e:
            print(f"⚠️ Warning: QR Gen Failed: {e}")
        canvas.restoreState()

        # 4. Pie de Página LEGAL (Texto Plano)
        canvas.saveState()
        canvas.setFont('Helvetica', 7)
        canvas.setFillColor(colors.black)
        msg = f"Documento Oficial Generado por MisPlanesCR. Licencia Intransferible de {self.docente.get('nombre', 'Docente')}."
        canvas.drawCentredString(width/2.0, 0.5*cm, msg)
        canvas.restoreState()

    def _generar_encabezado(self):
        # ... (Código de encabezado existente o simplificado para brevedad del prompt)
        admin_text = [
            Paragraph("MINISTERIO DE EDUCACIÓN PÚBLICA", self.styles['HeaderAdmin']),
            Paragraph(f"DIRECCIÓN REGIONAL {self.inst.get('regional', '')}", self.styles['HeaderAdmin']),
            Paragraph(self.inst.get('nombre', 'INSTITUCIÓN'), self.styles['HeaderAdmin']),
        ]
        
        data = [[Paragraph("[CR]", self.styles['HeaderAdmin']), admin_text, Paragraph("[LOGO]", self.styles['HeaderAdmin'])]]
        t = Table(data, colWidths=[3*cm, 12*cm, 3*cm])
        t.setStyle(TableStyle([('ALIGN', (0,0), (-1,-1), 'CENTER'), ('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOX', (0,0), (-1,-1), 0.5, colors.black)]))
        return t

    def generar_pdf(self, contenido, filename="Plan_Blindado.pdf"):
        start_time = time.time()
        
        # 1. Configuración de Seguridad (Encriptación Real)
        # allowPrinting=True, allowCopy=False, allowModify=False
        enc = StandardEncryption("userpass", "owner-secret-key-max", canPrint=1, canCopy=0, canModify=0, canAnnotate=0)
        
        doc = SimpleDocTemplate(filename, pagesize=LETTER, encrypt=enc)
        
        # 2. Inyección de Metadatos Ocultos
        doc.title = f"Plan Oficial - {self.docente.get('nombre', '')}"
        doc.author = "MisPlanesCR Platform"
        doc.subject = f"Ref: {self.user_id}@{self.inst_id}"
        doc.keywords = [self.user_id, self.inst_id, "MEP_OFFICIAL"]

        story = []
        story.append(self._generar_encabezado())
        story.append(Spacer(1, 1*cm))
        story.append(Paragraph(self.tipo_doc.replace('_', ' '), self.styles['Heading1']))
        story.append(Paragraph(contenido.get('texto', 'Contenido protegido...'), self.styles['BodyText']))

        # Build con Callback de Watermark
        doc.build(story, onFirstPage=self._watermark, onLaterPages=self._watermark)
        
        elapsed = time.time() - start_time
        print(f"🔒 PDF Blindado generado en {elapsed:.3f}s")
        return os.path.abspath(filename)

if __name__ == "__main__":
    exp = ExportadorBlindado("PRUEBA_EXAMEN", {"nombre": "CTP Test"}, {"nombre": "Profe Max"}, "USR-123", "INS-456")
    exp.generar_pdf({"texto": "Examen Confidencial.\n\n1. Seleccione..."})
