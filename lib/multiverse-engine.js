/**
 * MULTIVERSE ENGINE V1.0 (OMNI-GENESIS)
 * "The God-Tier Pedagogical Engine"
 * 
 * Capabilities:
 * - Generates a Suite of 4 Resources per Unit (Plan, GTA, Visual, Quiz).
 * - Adapts based on Diagnostic Result (Remedial vs Enrichment).
 * - Enforces Business Logic (Watermarks for Free Tier).
 */

import { analyzeDiagnosticState } from './diagnostic-engine';
import { spinKaleidoscope } from './kaleidoscope-engine';

export function generateMultiverse(unitContext, diagnosticData, userTier = "FREE") {
    // 1. Analyze Diagnostic State
    // diagnosticData: { score: number, total: number }
    const diagAnalysis = analyzeDiagnosticState(diagnosticData || { score: 80, total: 100 }); // Default to standard if null

    const isRemedial = diagAnalysis.status === "REQUIERE NIVELACIÓN";
    const isHighPot = diagAnalysis.status === "ALTA DOTACIÓN / AVANZADO";

    // 2. Determine Strategy Flavor via Kaleidoscope
    const creativeSpin = spinKaleidoscope(unitContext.subjectType || "GENERAL");

    // 3. Generate The Suite
    const suite = {
        meta: {
            unit: unitContext.title,
            diagnosticState: diagAnalysis.status,
            ui_tags: isRemedial ? ["Nivelación", "Concreto"] : isHighPot ? ["Reto", "STEAM"] : ["Estándar", "Creative"],
            color_theme: isRemedial ? "bg-amber-50" : isHighPot ? "bg-purple-50" : "bg-blue-50",
            isPremium: userTier === "ULTRA"
        },
        resources: {}
    };

    // RESOURCE A: PLAN DE MEDIACIÓN (The Core)
    suite.resources.plan = {
        title: "Plan de Mediación Pedagógica",
        type: "DOC",
        content: {
            strategy: creativeSpin,
            mediation: `La persona docente ${isRemedial ? 'guía paso a paso' : 'reta'} al estudiantado a ${creativeSpin.description}.`,
            rubric: isHighPot ? "Rúbrica de 4 niveles (incluye 'Experto')." : "Rúbrica estándar 1-3.",
            adaptation: isRemedial ? "Simplificación de consignas." : "Ampliación de complejidad."
        }
    };

    // RESOURCE B: GTA (Autonomous Guide)
    suite.resources.gta = {
        title: `Guía de Trabajo Autónomo: ${unitContext.title}`,
        type: "PDF",
        structure: {
            preparo: "Materiales: Cuaderno, lápiz, dispositivo móvil. ambiente silencioso.",
            recordar: isRemedial ? "Repaso de conceptos clave con ejemplos visuales." : "Activación de conocimientos previos mediante preguntas divergentes.",
            practica: isHighPot ? "Resolución de problemas de caso complejo." : "Ejercicios de práctica guiada."
        }
    };

    // RESOURCE C: VISUAL RESOURCE
    suite.resources.visual = {
        title: isRemedial ? "Infografía Paso a Paso" : "Mapa Mental de Conexiones",
        type: "IMG_DESC",
        description: isRemedial
            ? "Una guía visual numerada que explica el proceso sin texto excesivo."
            : "Un diagrama de redes que conecta este tema con otras asignaturas."
    };

    // RESOURCE D: QUICK ASSESSMENT
    suite.resources.quiz = {
        title: isRemedial ? "Tiquete de Salida (Verificación)" : "Trivia de Competencia (Kahoot)",
        type: "QUIZ",
        items: [
            "Pregunta 1: Concepto Clave",
            "Pregunta 2: Aplicación",
            "Pregunta 3: Análisis" // Only for standard/high
        ]
    };

    // 4. BUSINESS LOGIC (Watermark)
    if (userTier !== "ULTRA") {
        Object.keys(suite.resources).forEach(key => {
            suite.resources[key].watermark = "PREVIEW ONLY - UPGRADE TO AULAPLAN ULTRA";
            suite.resources[key].downloadable = false;
        });
    }

    return suite;
}
