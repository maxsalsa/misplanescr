/**
 * TECHNICIAN ENGINE V1.1 (ETP SPECIALIST)
 * "The Megatron Protocol"
 * 
 * Capabilities:
 * - Enforces ETP Terminology: "Resultado de Aprendizaje (RA)" instead of Objectives.
 * - Injects Mandatory Safety Protocols (INS/MEP rules).
 * - Generates "Listas de Cotejo" (Proceso) and "Rúbricas de Producto" (Resultado).
 * - Context: Technical High Schools (CTP) & Institutes (IPEC).
 */

export const ETP_SPECIALTIES = {
    MECANICA: { name: "Mecánica de Precisión / Automotriz", risk: "HIGH" },
    SOFTWARE: { name: "Desarrollo de Software", risk: "LOW" },
    TURISMO: { name: "Turismo Ecológico", risk: "MEDIUM" },
    AGRO: { name: "Agroecología", risk: "MEDIUM" },
    ALIMENTOS: { name: "Industria Alimentaria", risk: "HIGH" },
    EXECUTIVE: { name: "Ejecutivo para Centros de Servicio", risk: "LOW" }
};

/**
 * Generates a Technical Workshop Plan (Taller).
 * Enforces SAFETY and RA.
 */
export function generateTechnicalPlan(specialtyKey, moduleName, raText) {
    const specialty = ETP_SPECIALTIES[specialtyKey] || { name: specialtyKey, risk: "LOW" };

    // Safety Phase Logic
    let safetyPhase = "Charla de Seguridad: Ergonomía frente al computador (5 min).";
    if (specialty.risk === "HIGH") {
        safetyPhase = "PROTOCOLO ROJO: Verificación de EPP (Gafas, Botas, Guantes) + Charla de Seguridad de 5 min.";
    } else if (specialty.risk === "MEDIUM") {
        safetyPhase = "PROTOCOLO AMARILLO: Revisión de entorno y equipo de campo.";
    }

    return {
        type: "PLAN_TALLER_ETP",
        header: {
            specialty: specialty.name,
            module: moduleName,
            ra: `Resultado de Aprendizaje: ${raText || "[Inserte RA del Programa Oficial]"}`
        },
        phases: {
            inicio: `${safetyPhase} Activación de conocimientos previos.`,
            desarrollo: "Práctica Guiada: El estudiante ejecuta el procedimiento bajo supervisión (Aprender Haciendo).",
            cierre: "Limpieza de Taller (5S) y Bitácora de Aprendizaje."
        },
        evaluation: {
            type: "Lista de Cotejo (Práctica)",
            focus: "Desempeño (Hacer)"
        }
    };
}

/**
 * Generates a Safety Checklist based on Risk Level.
 */
export function generateSafetyChecklist(specialtyKey) {
    const specialty = ETP_SPECIALTIES[specialtyKey];

    let items = ["Uso correcto del uniforme"];
    if (specialty?.risk === "HIGH") {
        items = [
            ...items,
            "Gafas de seguridad puestas permanentemente",
            "Botas de seguridad antideslizantes",
            "Cabello recogido / Sin joyas",
            "Área de trabajo libre de obstáculos"
        ];
    } else if (specialty?.name === "ALIMENTOS") {
        items = [
            ...items,
            "Redecilla y Cubrebocas",
            "Lavado de manos (Protocolo correcto)",
            "Uñas cortas y sin esmalte"
        ];
    } else {
        items = [...items, "Postura ergonómica", "Orden en el puesto de trabajo"];
    }

    return {
        title: `Lista de Cotejo de Seguridad: ${specialty?.name || "General"}`,
        items: items,
        scale: "CUMPLE / NO CUMPLE (El incumplimiento detiene la práctica)"
    };
}

/**
 * Generates a Product Rubric (For the "Finished Product").
 */
export function generateProductRubric(productName) {
    return {
        title: `Rúbrica de Producto Terminado: ${productName}`,
        criteria: [
            { name: "Acabado / Presentación", levels: ["Excelente", "Bueno", "Deficiente"] },
            { name: "Funcionalidad", levels: ["Opera 100%", "Fallo Menor", "No Funciona"] },
            { name: "Tiempo de Entrega", levels: ["A tiempo", "Retraso Justificado", "Tardío"] },
            { name: "Uso de Materiales", levels: ["Eficiente", "Desperdicio Mínimo", "Desperdicio Alto"] }
        ]
    };
}
