import jsPDF from "jspdf";
import "jspdf-autotable";

// PROTOCOL GUTENBERG ENGINE V3000
// MOTOR DE GENERACIÓN PDF OFICIAL (MEP COSTA RICA)

export class PdfGenerator {
    constructor(planData, context) {
        this.plan = planData;
        this.context = context; // { teacherName, schoolName, period }
        this.doc = new jsPDF({ orientation: "portrait" });
        this.primaryColor = [0, 56, 147]; // MEP Blue
    }

    generate() {
        this.addHeader();
        this.addAdminTable();
        this.addPedagogicalMatrix();
        this.addFooter();
        // MARCA DE AGUA CONDICIONAL
        if (this.context.subscriptionStatus === "FREE") {
            this.addDiagonalWatermark();
        }
        return this.doc;
    }

    addPedagogicalMatrix() {
        const d = this.doc;

        // DETECCIÓN DE TERMINOLOGÍA (MEGATRÓN)
        const isTechnical = this.plan.level.includes("Técnico") || this.plan.subject.includes("Taller") || this.plan.subject.includes("Tecnolog");
        const col1 = isTechnical ? "Resultados de Aprendizaje (RA)" : "Habilidades / Aprendizajes Esperados";
        const col3 = isTechnical ? "Criterios de Desempeño" : "Indicadores de Evaluación";

        // DATA MATRIX
        d.autoTable({
            startY: d.lastAutoTable.finalY + 5,
            head: [[col1, 'Estrategias de Mediación', col3]],
            // ... other autoTable options and body data would go here
        });
    }

    addDiagonalWatermark() {
        const d = this.doc;
        const pageHeight = d.internal.pageSize.height;
        const pageWidth = d.internal.pageSize.width;

        d.setTextColor(255, 200, 200); // Rojo pálido
        d.setFontSize(50);
        d.setFont("helvetica", "bold");

        // Rotar y estampar
        d.saveGraphicsState();
        d.setGState(new d.GState({ opacity: 0.2 }));
        d.text("VISTA PREVIA - SIN LICENCIA", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
        d.setFontSize(20);
        d.text("SUSCRÍBASE AL 6090-6359", pageWidth / 2, (pageHeight / 2) + 20, { align: "center", angle: 45 });
        d.restoreGraphicsState();
    }

    addFooter() {
        const d = this.doc;
        const pageHeight = d.internal.pageSize.height;
        const pageWidth = d.internal.pageSize.width;

        // FIRMAS
        d.setDrawColor(150);
        d.line(20, pageHeight - 30, 80, pageHeight - 30); // Firma Docente
        d.line(130, pageHeight - 30, 190, pageHeight - 30); // Firma Director

        d.setFontSize(8);
        d.setTextColor(100);
        d.text("Firma del Docente", 50, pageHeight - 25, { align: "center" });
        d.text("Vo.Bo. Dirección / Coord. Técnica", 160, pageHeight - 25, { align: "center" });

        // TRAZABILIDAD FORENSE (HUELLA DIGITAL)
        // Convierte el PDF en un "Origen de Verdad" rastreable
        const forensicString = `Licencia intransferible perteneciente a: ${this.context.teacherName.toUpperCase()} | ID: ${this.context.userId || "GUEST_USER"} | Hash: ${Date.now().toString(36).toUpperCase()}`;

        d.setFont("courier", "normal");
        d.setFontSize(6);
        d.setTextColor(150);
        d.text(forensicString, pageWidth / 2, pageHeight - 15, { align: "center" });

        d.setFont("helvetica", "bold");
        d.setTextColor(200);
        d.text("Generado por AULAPLAN ULTRA (IA) - Documento Oficial", pageWidth / 2, pageHeight - 10, { align: "center" });
    }
}
