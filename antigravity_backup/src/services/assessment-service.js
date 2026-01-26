import OpenAI from 'openai';

// Singleton instance (Reuse the same config as AI Service in real app)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
    dangerouslyAllowBrowser: true
});

/**
 * Servicio de Evaluación Dinámica ("NetAcad-Killer")
 * Genera ítems de evaluación únicos, contextualizados y variados.
 */
export const AssessmentService = {

    /**
     * Genera un Quiz Dinámico basado en un tema.
     * @param {Object} config
     * @param {string} config.tema - Tema a evaluar (ej: "Sistema Digestivo")
     * @param {string} config.dificultad - 'facil', 'intermedio', 'dificil'
     * @param {number} config.cantidad - Cantidad de preguntas
     * @param {string} config.tipo - 'seleccion', 'pareo', 'analisis'
     */
    async generarQuiz(config) {
        console.log(`[ASSESSMENT MOTOR] Generando quiz: ${config.tema} (${config.dificultad})`);

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
            return mockQuizGenerator(config);
        }

        // Implementation for Real AI call would go here
        // For prototype speed, we use the advanced mock generator
        return mockQuizGenerator(config);
    }
};

/**
 * 🛠️ MOCK GENERATOR (Simulación Avanzada)
 * Para demostración instantánea sin latencia de IA.
 */
function mockQuizGenerator({ tema, dificultad }) {
    // Retraso artificial para "sentir" el proceso
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                titulo: `Evaluación de ${tema}`,
                nivel: dificultad,
                total_puntos: 20,
                instrucciones: "Instrucciones: Analice cuidadosamente cada imagen o pregunta antes de responder. Tiene 2 intentos.",
                items: [
                    {
                        id: 1,
                        tipo: "image_analysis",
                        pregunta: "¿Qué componente crítico se muestra en el diagrama?",
                        imagen_prompt: tema, // Trigger para MediaService
                        opciones: ["Opción A Correcta", "Distractor 1", "Distractor 2"],
                        correcta: 0,
                        feedback: "¡Exacto! Es la parte central del sistema."
                    },
                    {
                        id: 2,
                        tipo: "critical_thinking",
                        pregunta: `Si el sistema falla en ${tema}, ¿cuál sería la consecuencia inmediata?`,
                        opciones: ["Fallo general", "Reinicio seguro", "Nada ocurre"],
                        correcta: 1,
                        feedback: "Correcto. Los sistemas modernos tienen fail-safe."
                    },
                    {
                        id: 3,
                        tipo: "process_order",
                        pregunta: "Ordene los pasos correctos del proceso:",
                        items_orden: ["Inicio", "Proceso A", "Proceso B", "Fin"],
                        correcta_secuencia: [0, 1, 2, 3]
                    }
                ]
            });
        }, 1500);
    });
}
