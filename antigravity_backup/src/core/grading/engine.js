/**
 * 🧮 MEP EVALUATION ENGINE (CORE LOGIC)
 * Handles the calculation of grades based on the 5 Official Components.
 * Supports "Professor Guía" Conduct Logic.
 */

// Official MEP Scale (Reglamento de Evaluación de los Aprendizajes)
const RUBROS_ESTANDAR = {
    ACADEMICO: {
        cotidiano: 45,
        tareas: 10,
        pruebas: 35,
        proyecto: 10, // O Asistencia en algunos casos
        conducta: "Nota por aparte (100 pts - deducciones)"
    },
    TECNICO_TALLER: {
        cotidiano: 60,
        pruebas: 30,
        asistencia: 10,
        conducta: "Nota por aparte"
    }
};

/**
 * Calcula la Nota Final de un estudiante en una asignatura.
 * @param {Object} entries - Entradas de notas { cot: [90, 80], tar: [100], ... }
 * @param {Object} weights - Pesos de la asignatura { cotidiano: 45, tareas: 10, ... }
 */
export function calculateFinalGrade(entries, weights) {
    let totalScore = 0;
    const breakdown = {};

    for (const [component, weight] of Object.entries(weights)) {
        const scores = entries[component] || [];
        if (scores.length === 0) {
            breakdown[component] = 0;
            continue;
        }

        // Promedio simple del componente
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;

        // Puntos obtenidos (Regla de Tres)
        const points = (average * weight) / 100;

        breakdown[component] = parseFloat(points.toFixed(2));
        totalScore += points;
    }

    return {
        finalGrade: parseFloat(totalScore.toFixed(2)),
        breakdown,
        status: totalScore >= 70 ? 'APROBADO' : (totalScore >= 60 ? 'AMPLIACION' : 'REPROBADO')
    };
}

/**
 * LÓGICA DE CONDUCTA (PROFESOR GUÍA)
 * Calcula la nota de conducta basada en boletas de infracción.
 * @param {Array} infractions - Lista de boletas { level: "leve" | "grave" | "mgrave", points: 5 }
 */
export function calculateConductGrade(infractions) {
    let currentGrade = 100;
    const deductions = [];

    // Reglamento de Evaluación (Artículos REA)
    const RULES = {
        leve: { points: [1, 5], label: "Falta Leve" },
        grave: { points: [6, 10], label: "Falta Grave" },
        mgrave: { points: [11, 35], label: "Falta Muy Grave" } // Puede implicar expulsión
    };

    for (const item of infractions) {
        // En un sistema real, el punto exacto lo define el docente o el reglamento interno
        // Aquí asumimos que la boleta ya trae los puntos definidos por el 'Guide Teacher'
        let pointsToDeduct = item.points || 0;

        // Safety Check
        if (pointsToDeduct > 0) {
            currentGrade -= pointsToDeduct;
            deductions.push({
                date: item.date,
                infraction: item.infraction,
                points: pointsToDeduct,
                newGrade: Math.max(0, currentGrade)
            });
        }
    }

    return {
        finalConductGrade: Math.max(0, currentGrade),
        deductions
    };
}

/**
 * 🧠 RAG INTEGRATION: INDICATOR FETCHER
 * Simula la extracción de indicadores para Rúbricas.
 */
import { generateMEPPlan } from '../ia-engine/ai-service'; // Reutilizamos el bridge

export async function generateRubric(topic, level, type) {
    // LLAMA AL CEREBRO VECTORIAL
    // Solicita indicadores específicos para "Trabajo Cotidiano" o "Proyecto"
    // "Dame 3 indicadores de logro para evaluar 'El Ciclo del Agua' en Ciencias 4to"

    /* 
       Pseudo-código de conexión con experto.py:
       const indicators = await BridgeJS.query(`Indicadores evaluación para ${topic} ${level}`);
    */

    return {
        title: `Rúbrica de ${type}: ${topic}`,
        rows: [
            { indicator: "Identifica las fases...", levels: ["Inicial (1)", "Intermedio (2)", "Avanzado (3)"] },
            { indicator: "Explica la importancia...", levels: ["Incorrecto", "Parcial", "Completo"] }
        ]
    };
}
