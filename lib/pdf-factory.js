/**
 * PDF FACTORY V3000 (GUTENBERG PROTOCOL)
 * "The 30-Second Promise"
 *
 * Capabilities:
 * - Modality Polymorphism: ACADEMICA | TECNICA | CINDEA | PREESCOLAR
 * - DUA Auto-Pilot: Separate column for Universal Design adjustments.
 * - Rubric Engine: Auto-renders 3-level JSON rubrics.
 */
import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePDF(planData) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // --- HEADER (INSTITUTIONAL IDENTITY) ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("MINISTERIO DE EDUCACIÓN PÚBLICA", pageWidth / 2, 10, { align: "center" });

    doc.setFontSize(10);
    doc.text(`DIRECCION REGIONAL: ${planData.regional || "San José Norte"}`, 14, 20);
    doc.text(`CENTRO EDUCATIVO: ${planData.school || "Escuela Metálica"}`, 14, 25);

    // --- CONTEXT BLOCK ---
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const rightX = pageWidth - 80;
    doc.text(`Docente: ${planData.teacher.name || "N/A"}`, 14, 35);
    doc.text(`Asignatura: ${planData.subject}`, 14, 40);
    doc.text(`Nivel/Sección: ${planData.level || "N/A"}`, 14, 45);

    doc.text(`Periodo: ${planData.period || "I Semestre 2026"}`, rightX, 35);

    // --- CONTAINER LOGIC (Unit vs Month) ---
    // CASE A: PRIMARIA -> Show Month (Longitudinal)
    // CASE B: SECUNDARIA/TECNICA -> Show Unit Title (Strict Container)
    // CASE C: CINDEA -> Show Module

    if (planData.modality === "PREESCOLAR" || planData.modality === "PRIMARIA") {
        doc.text(`Mes: ${planData.month || "N/A"}`, rightX, 40);
    } else if (planData.modality === "CINDEA") {
        doc.text(`Módulo: ${planData.unitTitle || "N/A"}`, rightX, 40);
    } else {
        // SECUNDARIA / TECNICA (Standard)
        // Do NOT force month. Show Unit Context.
        doc.setFontSize(8);
        doc.text(`Unidad: ${planData.unitTitle || "U. Temática"}`, rightX, 40, { maxWidth: 60, align: "right" });
        doc.setFontSize(9);
    }

    doc.text(`Modalidad: ${planData.modality}`, rightX, 50); // Moved down slightly

    // --- TEMPLATE SWITCHER (POLYMORPHISM) ---
    const startY = 55;

    switch (planData.modality) {
        case "PREESCOLAR":
            generatePreschoolTemplate(doc, planData, startY);
            break;
        case "TECNICA":
            generateTechnicalTemplate(doc, planData, startY);
            break;
        case "CINDEA":
            generateCindaeTemplate(doc, planData, startY);
            break;
        default: // ACADEMICA (DIURNA/NOCTURNA)
            generateAcademicTemplate(doc, planData, startY);
            break;
    }

    // --- FOOTER (SIGNATURES) ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text("_".repeat(40), 14, pageHeight - 30);
    doc.text("_".repeat(40), pageWidth - 80, pageHeight - 30);
    doc.text("Firma de la Persona Docente", 14, pageHeight - 25);
    doc.text("Sello / Firma Dirección", pageWidth - 80, pageHeight - 25);

    return doc.output("blob");
}

/**
 * ACADEMIC TEMPLATE (7° - 11°)
 * Columns: Aprendizaje Esperado | Indicador (Pauta) | Estrategias de Mediación (Secuencia) | Apoyos DUA
 */
function generateAcademicTemplate(doc, data, startY) {
    const tableColumn = ["Aprendizaje Esperado", "Indicador (Pauta)", "Estrategias de Mediación (Binomio Sagrado)", "Apoyos DUA"];
    const tableRows = [];

    // ENFORCE JSON SCHEMA: "rubrica" array drives the rows
    const rubricItems = data.rubrica || [];

    // Construct Mediation String (Didactic Sequence)
    // We only show this fully in the first row or distributed? 
    // MEP Standard: Usually repeated or merged. We will put it in every row for clarity or use a variable.
    // Let's format it nicely.
    const strategies = data.estrategias || {};
    const mediationText = [
        `INICIO: ${strategies.inicio || "Recuperación de previos."}`,
        `DESARROLLO: ${strategies.desarrollo || "Estrategia Principal."}`,
        `CIERRE: ${strategies.cierre || "Síntesis."}`,
        strategies.pausa_activa ? `[PAUSA ACTIVA]: ${strategies.pausa_activa.actividad} (${strategies.pausa_activa.duracion})` : ""
    ].filter(Boolean).join("\n\n");

    // Construct DUA String
    const adecuaciones = data.adecuaciones || {};
    const duaText = [
        adecuaciones.acceso?.length ? `ACCESO: ${adecuaciones.acceso.join(", ")}` : "",
        adecuaciones.no_significativa?.length ? `NO SIGNIFICATIVA: ${adecuaciones.no_significativa.join(", ")}` : "",
        adecuaciones.alta_dotacion?.length ? `ALTA DOTACIÓN: ${adecuaciones.alta_dotacion.join(", ")}` : ""
    ].filter(Boolean).join("\n\n") || "DISEÑO UNIVERSAL:\n- Visual\n- Tiempos Flexibles";

    if (rubricItems.length > 0) {
        rubricItems.forEach(item => {
            tableRows.push([
                item.aprendizaje || "N/A", // Matches schema 'unidad' or derived outcome? Schema trace suggests 'rubrica' has indicators. We map 'indicador' to column 2.
                // Column 1 'Aprendizaje Esperado' isn't explicitly in 'rubrica' item in user prompt but usually pairs with indicator. 
                // We'll use item.indicador for both or assume item has it. User prompt: { "indicador": "String", "niveles": ... }
                // Let's assume input might have 'outcome' or we map indicator to it.
                item.aprendizaje || "Ver Programa",
                item.indicador,
                mediationText,
                duaText
            ]);
        });
    } else {
        // Fallback if data is empty (QA Empty State)
        tableRows.push(["-", "-", mediationText, duaText]);
    }

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: "grid",
        headStyles: { fillColor: [22, 65, 148], fontSize: 8, halign: 'center' }, // MEP Blue
        styles: { fontSize: 8, cellPadding: 3, valign: 'middle' },
        columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 35 },
            2: { cellWidth: 'auto' }, // Strategy gets max space
            3: { cellWidth: 30 }      // DUA
        }
    });

    addRubricFooter(doc, data);
}

/**
 * TECHNICAL TEMPLATE (CTP: 10° - 12°)
 * Columns: Resultado de Aprendizaje | Criterios de Desempeño | Mediación | Tiempo
 */
function generateTechnicalTemplate(doc, data, startY) {
    const tableColumn = ["Resultado de Aprendizaje (RAP)", "Criterios de Desempeño", "Estrategias de Mediación (Práctica Técnica)", "Tiempo Est."];
    const tableRows = [];

    data.content.forEach(row => {
        tableRows.push([
            row.outcome,
            row.criteria || row.indicator, // Failover for Technical
            row.mediation,
            row.time || "40 min"
        ]);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: "grid",
        headStyles: { fillColor: [46, 204, 113], fontSize: 8, halign: 'center', textColor: 255 }, // Tech Green
        styles: { fontSize: 8, cellPadding: 3, valign: 'middle' },
    });

    addRubricFooter(doc, data); // Technical also uses rubrics
}

/**
 * CINDEA/IPEC TEMPLATE (Adultos)
 * Columns: Módulo / Habilidad | Aprendizaje Base | Estrategias Andragógicas
 */
function generateCindaeTemplate(doc, data, startY) {
    const tableColumn = ["Habilidad / Competencia", "Aprendizaje Base", "Estrategia de Mediación (Andragogía)"];
    const tableRows = [];

    data.content.forEach(row => {
        tableRows.push([
            "Pensamiento Crítico", // Default for CINDEA usually
            row.outcome,
            row.mediation
        ]);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: "grid",
        headStyles: { fillColor: [230, 126, 34], fontSize: 8, halign: 'center' }, // Orange for Adult Ed
        styles: { fontSize: 9, cellPadding: 3, valign: 'middle' }
    });

    addRubricFooter(doc, data);
}

/**
 * PRESCHOOL TEMPLATE (Materno / Transición)
 * Columns: Ámbito | Indicador | Estrategias Lúdicas | Observaciones
 */
function generatePreschoolTemplate(doc, data, startY) {
    const tableColumn = ["Ámbito / Dimensión", "Indicador", "Estrategias Lúdicas", "Observaciones"];
    const tableRows = [];

    data.content.forEach(row => {
        tableRows.push([
            row.domain || "Desarrollo Personal",
            row.indicator,
            row.mediation,
            "" // Teacher fills this by hand usually
        ]);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: "grid",
        headStyles: { fillColor: [255, 107, 107], fontSize: 8, halign: 'center' }, // Pastel Red
        styles: { fontSize: 9, cellPadding: 4, valign: 'top' }
    });
}

/**
 * RUBRIC ENGINE (1-3 SCALING)
 * Parses JSON strings safely.
 */
function addRubricFooter(doc, data) {
    if (!doc.lastAutoTable) return;

    const lastY = doc.lastAutoTable.finalY + 15;

    // Title
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60);
    doc.text("INSTRUMENTO DE EVALUACIÓN (RÚBRICA SUMATIVA)", 14, lastY);

    const rubricCols = ["Indicador", "Nivel Inicial (1 pt)", "Nivel Intermedio (2 pts)", "Nivel Avanzado (3 pts)"];
    const rubricRows = data.content.map(row => {
        let rubric = { levels: { "1": "N/A", "2": "N/A", "3": "N/A" } };

        try {
            // SAFE PARSING: Handle String, Object, or Null
            if (typeof row.rubric === 'string') {
                rubric = JSON.parse(row.rubric);
            } else if (typeof row.rubric === 'object' && row.rubric !== null) {
                rubric = row.rubric;
            }
        } catch (e) {
            console.error("Rubric Parsing Error", e);
        }

        // Handle numeric keys "1","2","3" or named "inicial" check
        const L1 = rubric.levels["1"] || rubric.levels.inicial || "Menciona...";
        const L2 = rubric.levels["2"] || rubric.levels.intermedio || "Caracteriza...";
        const L3 = rubric.levels["3"] || rubric.levels.avanzado || "Analiza...";

        return [
            row.outcome, // Indicator matches outcome usually
            L1,
            L2,
            L3
        ];
    });

    doc.autoTable({
        head: [rubricCols],
        body: rubricRows,
        startY: lastY + 5,
        theme: "striped",
        headStyles: { fillColor: [200, 200, 200], textColor: 50, fontSize: 7, halign: 'center' },
        styles: { fontSize: 7, cellPadding: 2, valign: 'middle' },
        columnStyles: {
            0: { cellWidth: 40 }, // Indicator width
            // Auto for levels
        }
    });

    // Technical Debt Check: Reset Color
    doc.setTextColor(0);
}
