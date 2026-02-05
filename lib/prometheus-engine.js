/**
 * PROMETHEUS ENGINE V1.0 (DIGITAL CURATOR)
 * "The Netflix of Education"
 *
 * Capabilities:
 * - Generates Slide Decks (PPT Structure).
 * - Curates Video Resources (Smart Links + Guides).
 * - Designs Infographic Prompts.
 * - Framework: Teacher as Leader.
 */

/**
 * GENERATE SLIDE DECK PROTOCOL
 * @param {string} topic - The lesson topic.
 * @param {number} slideCount - Target number of slides.
 */
export function generateSlideDeck(topic, slideCount = 5) {
  return {
    title: `Presentación Interactiva: ${topic}`,
    target: "Proyección en Clase / Flipped Classroom",
    slides: [
      {
        number: 1,
        type: "Title",
        content: {
          title: topic,
          subtitle: "Exploración Docente",
          note: "Docente: Use esta slide para activar conocimientos previos.",
        },
        visual_prompt: "Abstract background with educational icons.",
      },
      {
        number: 2,
        type: "Hook",
        content: {
          headline: "¿Sabías que...?",
          body: ["Dato curioso 1", "Dato curioso 2"],
          note: "Genere debate con estos datos.",
        },
        visual_prompt: "High impact image related to the curious fact.",
      },
      {
        number: 3,
        type: "Core Concept",
        content: {
          headline: "Concepto Clave",
          body: "Definición clara y concisa.",
          note: "Pida a los estudiantes que parafraseen.",
        },
        visual_prompt: "Diagram or Schema of the concept.",
      },
      {
        number: slideCount,
        type: "Closure",
        content: {
          headline: "Conclusiones",
          body: "Resumen de puntos principales.",
          note: "Tiquete de salida: ¿Qué me llevo hoy?",
        },
        visual_prompt: "Checklist visual.",
      },
    ],
  };
}

/**
 * VIDEO CURATOR PROTOCOL
 * @param {string} query - Search term.
 */
export function curateVideoResource(query) {
  const safeQuery = encodeURIComponent(`MEP Costa Rica ${query} educativo`);
  return {
    type: "Video Curado",
    smart_link: `https://www.youtube.com/results?search_query=${safeQuery}`,
    instruction:
      "Docente, asigne este video como tarea previa (Aula Invertida) o proyéctelo para iniciar el debate.",
    viewing_guide: [
      "Antes de ver: ¿Qué sabemos sobre este tema?",
      "Durante el video: Anota 3 palabras clave.",
      "Después de ver: ¿Cómo se relaciona con lo visto en clase?",
    ],
  };
}

/**
 * INFOGRAPHIC DESIGNER PROTOCOL
 * @param {string} concept - Concept to visualize.
 */
export function designInfographic(concept) {
  return {
    type: "Infograma Pedagógico",
    title: `Guía Visual: ${concept}`,
    designer_prompt: `A clean, modern infographic explaining ${concept}. Use a step-by-step layout. Color palette: Educational Blue and Growth Green. Icons: Vector style.`,
    text_structure: {
      header: concept,
      steps: [
        "Paso 1: Definición",
        "Paso 2: Características",
        "Paso 3: Ejemplo Real",
      ],
      footer: "Antigravity MEP 2026",
    },
  };
}

/**
 * GAMIFIED REVIEW PROTOCOL
 * @param {string} topic
 */
export function generateGamifiedReview(topic) {
  return {
    type: "Repaso Gamificado (Kahoot/Quizizz Style)",
    title: `Reto de Conocimiento: ${topic}`,
    questions: [
      {
        q: "¿Cuál es la característica principal de...?",
        options: ["A", "B", "C"],
        correct: "A",
        time: "20s",
      },
      {
        q: "Verdadero o Falso: ...",
        options: ["V", "F"],
        correct: "V",
        time: "10s",
      },
    ],
  };
}
