
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Genera el Instrumento de Evaluación Sumativa (PDF)
 * Cumple con Normativa 1er Año - I Periodo
 */
export const generateSummativeInstrument = (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;

    // --- 1. ENCABEZADO OFICIAL MEP ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("MINISTERIO DE EDUCACIÓN PÚBLICA", pageWidth / 2, 15, { align: "center" });
    doc.text(`DIRECCIÓN REGIONAL DE EDUCACIÓN: ${data.regional || "__________"}`, pageWidth / 2, 20, { align: "center" });
    doc.text(`CENTRO EDUCATIVO: ${data.institutionName || "__________"}`, pageWidth / 2, 25, { align: "center" });

    // Escudo (Simulated placeholder)
    // doc.addImage("/escudo.png", "PNG", 10, 10, 20, 20);

    doc.line(margin, 30, pageWidth - margin, 30);

    // --- 2. DATOS ADMINISTRATIVOS ---
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    let yPos = 40;
    const lineHeight = 7;

    doc.text(`Docente: ${data.teacherName || "_________________"}`, margin, yPos);
    doc.text(`Asignatura: ${data.subject}`, pageWidth / 2 + 10, yPos);
    yPos += lineHeight;

    doc.text(`Nivel: ${data.level || "Primer Año"}`, margin, yPos);
    doc.text(`Periodo: I Periodo (Evaluación Sumativa)`, pageWidth / 2 + 10, yPos);
    yPos += lineHeight;

    doc.text(`Estudiante: ____________________________________`, margin, yPos);
    doc.text(`Sección: ${data.section || "_______"}`, pageWidth / 2 + 10, yPos);
    yPos += lineHeight * 2;

    // --- 3. TÍTULO DEL INSTRUMENTO ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 51, 102); // Azul Institucional
    doc.text("INSTRUMENTO DE EVALUACIÓN SUMATIVA", pageWidth / 2, yPos, { align: "center" });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("(Sustituye a la Prueba Escrita en I Periodo de Primer Año)", pageWidth / 2, yPos + 6, { align: "center" });
    doc.setTextColor(0);
    yPos += 20;

    // --- 4. INSTRUCCIONES ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const instrucciones = "INSTRUCCIONES GENERALES:\nLea cuidadosamente cada indicador. Marque con una equis (X) el nivel de logro alcanzado por la persona estudiante en cada actividad evaluativa. Utilice la información para realimentar el proceso educativo.";
    doc.text(instrucciones, margin, yPos, { maxWidth: pageWidth - (margin * 2) });
    yPos += 20;

    // --- 5. CUERPO: TABLA DE EVALUACIÓN ---

    // Mock Data if not provided (Neon Sync placeholder)
    const indicators = data.indicators || [
        { indicator: "Reconoce vocales en palabras simples.", criteria: "Identifica a/e/i/o/u" },
        { indicator: "Escribe su nombre completo.", criteria: "Trazo legible" },
        { indicator: "Asocia imagen con palabra.", criteria: "Relación semántica" },
        { indicator: "Sigue instrucciones orales.", criteria: "Ejecución motora" },
    ];

    const tableBody = indicators.map((ind, index) => [
        index + 1,
        ind.indicator,
        "", // Inicia
        "", // Intermedio
        "", // Avanzado
        ""  // Puntos
    ]);

    doc.autoTable({
        startY: yPos,
        head: [['#', 'Indicador de Aprendizaje', 'Inicial (1)', 'Intermedio (2)', 'Avanzado (3)', 'Pts']],
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 9 },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 80 },
            2: { cellWidth: 20 },
            3: { cellWidth: 20 },
            4: { cellWidth: 20 },
            5: { cellWidth: 15 }
        }
    });

    yPos = doc.lastAutoTable.finalY + 20;

    // --- 6. SELLO Y FIRMAS (SOBERANÍA) ---
    const boxHeight = 40;

    // Sello Comité
    doc.setDrawColor(150);
    doc.rect(margin, yPos, 60, boxHeight);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("SELLO COMITÉ DE EVALUACIÓN", margin + 30, yPos + 20, { align: "center" });

    // Firmas
    doc.setTextColor(0);
    doc.line(margin + 80, yPos + 30, pageWidth - margin, yPos + 30);
    doc.text("Firma del Padre / Madre / Encargado", margin + 80, yPos + 35);

    // --- 7. PIE DE PÁGINA (BUSINESS LOGIC) ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(100);
        doc.text("Documento validado por la tecnología de MisPlanesCR (Lic. Max Salazar Sánchez - 60906359)", pageWidth / 2, doc.internal.pageSize.height - 10, { align: "center" });
    }

    // Save
    doc.save(`Instrumento_Sumativo_${data.subject}_${data.group || "General"}.pdf`);
};

/**
 * DIAGNOSTIC INSTRUMENT GENERATOR (RADAR MODE)
 * Supports: Checklist, Rating Scale, Anecdotal.
 * Dimensions: Cognitive, Socio-affective, Psychomotor.
 */
export const generateDiagnosticInstrument = (data, type) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;

    // HEADER (Simplified for Diagnostic)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("MINISTERIO DE EDUCACIÓN PÚBLICA", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("INSTRUMENTO DE EVALUACIÓN DIAGNÓSTICA", pageWidth / 2, 22, { align: "center" });

    // CONTEXT
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Asignatura: ${data.subject}`, margin, 35);
    doc.text(`Docente: ${data.teacherName}`, margin, 40);
    doc.text(`Dimensión: ${data.dimension || "Integral"}`, pageWidth / 2, 35);
    doc.text(`Tipo: ${type}`, pageWidth / 2, 40);

    let yPos = 55;

    // BODY GENERATION BASED ON TYPE
    if (type === "Lista de Cotejo (Checklist)") {
        const tableBody = data.items.map((item, index) => [
            index + 1,
            item,
            "", // SI
            "", // NO
            ""  // OBSERVACIONES
        ]);

        doc.autoTable({
            startY: yPos,
            head: [['#', 'Indicador / Rasgo', 'SÍ', 'NO', 'Observaciones']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [46, 204, 113], textColor: 255 }, // Emerald for Diagnostic
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 90 },
                2: { cellWidth: 15 },
                3: { cellWidth: 15 },
                4: { cellWidth: 50 }
            }
        });
    } else if (type === "Escala de Calificación") {
        const tableBody = data.items.map((item, index) => [
            index + 1,
            item,
            "", "", "", "", "", // 1-5
        ]);

        doc.autoTable({
            startY: yPos,
            head: [['#', 'Indicador / Rasgo', '1', '2', '3', '4', '5']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        });
    } else if (type === "Registro Anecdótico") {
        const tableBody = data.students.map((student) => [
            student,
            "", // Fecha/Hora
            "", // Incidente/Observación
            ""  // Interpretación
        ]);

        doc.autoTable({
            startY: yPos,
            head: [['Estudiante', 'Fecha/Hora', 'Descripción del Hecho', 'Interpretación']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [155, 89, 182], textColor: 255 },
            styles: { minCellHeight: 20 } // More space for writing
        });
    }

    // FOOTER
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Validado por Antigravity Prime (MEP 2026 Compatible)", pageWidth / 2, pageHeight - 10, { align: "center" });

    doc.save(`Diagnostico_${type}_${data.subject}.pdf`);
};
