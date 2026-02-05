/**
 * OMNI GENERATOR V1.0 (VARIETY ENGINE)
 * "The Arsenal of Evaluation"
 *
 * Capabilities:
 * 1. Traditional: Exams, Quizzes.
 * 2. Alternative: Podcasts, Dioramas, Lapbooks.
 * 3. Quick Checks: Exit Tickets, Plickers.
 * 4. Performance: Oral Rubrics, Field Trip Checklists.
 */

import jsPDF from "jspdf";
import "jspdf-autotable";

// --- ARCHETYPE DEFINITIONS ---
export const ARCHETYPES = {
  TECH: "The Tech-Savvy (Simulators, AI)",
  SOCIAL: "The Social-Constructivist (Debates)",
  MAKER: "The Maker (STEAM/Prototyping)",
  GAMER: "The Gamer (Escape Rooms, XP)",
  RESEARCHER: "The Researcher (Flipped Classroom)",
};

/**
 * Generates an "Alternative Evaluation" prompt/rubric.
 * @param {string} type - 'Podcast', 'Diorama', 'Lapbook'
 * @param {object} context - { subject, topic, level }
 */
export function generateAlternativeProject(type, context) {
  const doc = new jsPDF();

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`PROYECTO ALTERNATIVO: ${type.toUpperCase()}`, 105, 20, {
    align: "center",
  });

  doc.setFontSize(12);
  doc.text(`Asignatura: ${context.subject} | Nivel: ${context.level}`, 20, 35);
  doc.text(`Tema: ${context.topic}`, 20, 45);

  // Instructions based on Type
  let instructions = "";
  if (type === "Podcast") {
    instructions =
      "Objetivo: Crear un episodio de audio de 5 minutos explicando el tema.\n" +
      "Requisitos: Guion técnico, efectos de sonido, dicción clara.\n" +
      "Roles: Guionista, Locutor, Ingeniero de Sonido.";
  } else if (type === "Diorama") {
    instructions =
      "Objetivo: Representar tridimensionalmente el escenario/concepto.\n" +
      "Requisitos: Materiales reciclables, tarjeta explicativa, escala adecuada.";
  }

  doc.setFont("helvetica", "normal");
  doc.text("INSTRUCCIONES:", 20, 60);
  doc.text(instructions, 20, 70);

  // Generic Rubric
  doc.autoTable({
    startY: 100,
    head: [["Criterio", "Inicial (1)", "Intermedio (2)", "Avanzado (3)"]],
    body: [
      [
        "Creatividad",
        "Uso básico de recursos",
        "Recursos variados",
        "Originalidad excepcional",
      ],
      [
        "Contenido",
        "Menciona el tema",
        "Explica conceptos clave",
        "Analiza y profundiza",
      ],
      [
        "Formato",
        "Incumple requisitos",
        "Cumple parcialmente",
        "Cumple todos los requisitos",
      ],
    ],
  });

  doc.save(`${type}_${context.subject}.pdf`);
}

/**
 * Generates a "Quick Check" (Ticket de Salida).
 * Prints 4 tickets per page for economy.
 */
export function generateExitTicket(context) {
  const doc = new jsPDF();

  // Create 4 quadrants
  const tickets = [
    { x: 10, y: 10 },
    { x: 105, y: 10 },
    { x: 10, y: 148 },
    { x: 105, y: 148 },
  ];

  tickets.forEach((pos) => {
    doc.rect(pos.x, pos.y, 90, 130);
    doc.setFontSize(10);
    doc.text("TIQUETE DE SALIDA", pos.x + 45, pos.y + 10, { align: "center" });
    doc.text(`Nombre: __________________`, pos.x + 5, pos.y + 25);

    doc.text("1. ¿Qué aprendí hoy?", pos.x + 5, pos.y + 40);
    doc.line(pos.x + 5, pos.y + 50, pos.x + 85, pos.y + 50);
    doc.line(pos.x + 5, pos.y + 60, pos.x + 85, pos.y + 60);

    doc.text("2. Una duda que tengo:", pos.x + 5, pos.y + 75);
    doc.line(pos.x + 5, pos.y + 85, pos.x + 85, pos.y + 85);

    doc.text("3. Emoji de hoy:", pos.x + 5, pos.y + 100);
    // Placeholder circle for emoji
    doc.circle(pos.x + 45, pos.y + 115, 8);
  });

  doc.save(`ExitTickets_${context.subject}.pdf`);
}
