import { jsPDF } from "jspdf";

/**
 * Generador de PDF Industrial Grade con Marca de Agua Dinámica
 * @param {string} title - Título del documento
 * @param {string} content - Contenido principal
 * @param {object} subscriber - Datos del usuario (nombre, cedula)
 */
export const generateSecurePDF = (title, content, subscriber) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 1. MARCA DE AGUA (ANTIPIRATERÍA)
    // Diagonal Watermark
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(40);
    doc.text(subscriber.name.toUpperCase(), pageWidth / 2, pageHeight / 2, {
        angle: 45,
        align: 'center',
        opacity: 0.2 // Note: jsPDF opacity support depends on version/plugin, simulated here logic-wise
    });

    // 2. ENCABEZADO OFICIAL
    doc.setTextColor(0, 51, 102); // #003366 MEP Blue
    doc.setFontSize(16);
    doc.text("MINISTERIO DE EDUCACIÓN PÚBLICA", 10, 20);
    doc.setFontSize(14);
    doc.text(title, 10, 30);

    // 3. METADATA DE SUSCRIPTOR (IDENTIDAD INYECTADA)
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generado por: ${subscriber.name} | ID: ${subscriber.id}`, 10, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 45);

    // 4. CONTENIDO
    doc.setTextColor(0);
    doc.setFontSize(12);
    // Split text logic would go here
    doc.text(content, 10, 60);

    // 5. PIE DE PÁGINA (HASH DE INTEGRIDAD)
    const securityHash = btoa(`${subscriber.id}-${Date.now()}`);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`AulaPlan Secure Doc | Hash: ${securityHash}`, 10, pageHeight - 10);

    return doc;
};
