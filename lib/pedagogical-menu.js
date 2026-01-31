/**
 * PEDAGOGICAL MENU (THE CHEF)
 * Capabilities:
 * - 3 Flavors: Analytical, Creative, Technical.
 * - Visual Metadata: Icons, Colors, Tags.
 */

export const FLAVORS = {
    ANALYTICAL: {
        id: "FLAVOR_A",
        label: "Analítico (Investigador)",
        icon: "🧐",
        color: "bg-blue-50 border-blue-200 text-blue-800",
        tags: ["Debate", "Ensayo", "Estudio de Caso"]
    },
    CREATIVE: {
        id: "FLAVOR_B",
        label: "Creativo (Creador)",
        icon: "🎨",
        color: "bg-purple-50 border-purple-200 text-purple-800",
        tags: ["Podcast", "Maqueta", "Video"]
    },
    TECHNICAL: {
        id: "FLAVOR_C",
        label: "Técnico (Ingeniero)",
        icon: "🛠️",
        color: "bg-emerald-50 border-emerald-200 text-emerald-800",
        tags: ["Laboratorio", "Simulación", "Código"]
    }
};

/**
 * Returns a menu of 3 strategies for a given topic.
 */
export function generateMenu(topic) {
    return [
        {
            flavor: FLAVORS.ANALYTICAL,
            title: `Investigación Crítica: ${topic}`,
            mediation: `La persona docente plantea una pregunta controversial sobre ${topic}, mientras que la persona estudiante investiga fuentes y redacta un ensayo argumentativo.`,
            rubric: "1. Cita fuentes. 2. Contrasta autores. 3. Argumenta postura propia.",
            adecuaciones: {
                acceso: ["Lectores de pantalla", "Texto ampliado"],
                no_significativa: ["Tiempo extra para redacción"],
                alta_dotacion: ["Ensayo comparativo en otro idioma"]
            }
        },
        {
            flavor: FLAVORS.CREATIVE,
            title: `Producción Artística: ${topic}`,
            mediation: `La persona docente reta a crear una obra (Diorama/Podcast) sobre ${topic}, mientras que la persona estudiante diseña y presenta su creación explicando los conceptos clave.`,
            rubric: "1. Boceta idea. 2. Construye con estética. 3. Explica concepto a través de la obra.",
            adecuaciones: {
                acceso: ["Guías táctiles", "Instrucciones de audio"],
                no_significativa: ["Uso de moldes pre-hechos"],
                alta_dotacion: ["Integración de circuitos o tecnología"]
            }
        },
        {
            flavor: FLAVORS.TECHNICAL,
            title: `Laboratorio Práctico: ${topic}`,
            mediation: `La persona docente provee materiales para experimentar con ${topic}, mientras que la persona estudiante sigue el protocolo, registra datos y concluye basado en evidencia.`,
            rubric: "1. Sigue instrucciones. 2. Registra datos precisos. 3. Concluye basado en resultados.",
            adecuaciones: {
                acceso: ["Mesas adaptadas", "Herramientas ergonómicas"],
                no_significativa: ["Reducción de pasos"],
                alta_dotacion: ["Análisis estadístico de datos"]
            }
        }
    ];
}
