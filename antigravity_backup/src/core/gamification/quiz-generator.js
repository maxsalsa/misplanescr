/**
 * 🎮 QUIZ GENERATOR BRIDGE (GAMIFICATION ENGINE)
 * Conecta el Frontend (Student Dashboard) con el Cerebro Python (auto_experto.py).
 */

import { spawn } from 'child_process';
import path from 'path';

export async function generateLiveQuiz(topic, level) {
    return new Promise((resolve, reject) => {
        // 1. Definir Ruta Real del Script (Sin inventar)
        // Se asume ejecución desde raiz del proyecto
        const pythonScript = path.join(process.cwd(), 'python_core', 'auto_experto.py');

        // 2. Ejecutar Proceso Python (Isolation)
        // Pasamos el flag "--quiz-only" para que solo devuelva el JSON del juego
        const pyProcess = spawn('python', [pythonScript, "--quiz-only", topic, level]);

        let dataBuffer = '';
        let errorBuffer = '';

        pyProcess.stdout.on('data', (data) => {
            dataBuffer += data.toString();
        });

        pyProcess.stderr.on('data', (data) => {
            errorBuffer += data.toString();
        });

        pyProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`❌ Quiz Gen Error: ${errorBuffer}`);
                reject(new Error("Fallo en el Motor de Gamificación. Intenta más tarde."));
                return;
            }

            try {
                // 3. Parsing Seguro con Fallback
                // Buscamos el JSON entre los logs del script
                const jsonMatch = dataBuffer.match(/\{.*\}/s);
                if (jsonMatch) {
                    const quizData = JSON.parse(jsonMatch[0]);
                    resolve(quizData);
                } else {
                    // Fallback Manual si el script devuelve texto plano
                    resolve({
                        title: `Reto Rápido: ${topic}`,
                        questions: [
                            { q: "¿En qué consiste este tema?", options: ["A", "B", "C"], answer: "A" }
                        ]
                    });
                }
            } catch (e) {
                reject(new Error("Error procesando la respuesta del Cerebro IA."));
            }
        });
    });
}
