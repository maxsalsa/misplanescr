
/**
 * MOTOR MATEMÁTICO MEP (Reglamento de Evaluación de los Aprendizajes)
 * CERTIFICADOÓGICA DE ORO (Lineamientos MEP pág. 10-11)
 */

export 

export interface ExamSpecRow extends ExamObjective {
    rawPoints;
    finalPoints;
    constantK;
    decimalPart?;
}

export function calculateTableSpecs(totalPoints, objectives): { distribution, k, totalLessons } {
    // 1. Suma de Lecciones (Base del cálculo)
    const totalLessons = objectives.reduce((acc, obj) => acc + obj.lessons, 0);

    if (totalLessons === 0) {
        throw new Error("El total de lecciones no puede ser 0.");
    }

    // 2. Constante Administrativa (K)
    // Fórmula Puntos / Total Lecciones
    const constantK = totalPoints / totalLessons;

    // 3. Distribución por Indicador
    const distribution = objectives.map(obj => {
        const rawPoints = obj.lessons * constantK;
        const decimalPart = rawPoints % 1;

        // REGLA MEP: >= 0.50 sube, < 0.50 baja
        // Math.round() en JS hace x.5 sube, pero implementamos explícito para seguridad auditora.
        // Usamos un epsilon pequeño para precisión flotante.
        let finalPoints = Math.floor(rawPoints);
        if (decimalPart >= 0.4999999) {
            finalPoints = Math.ceil(rawPoints);
        }

        return {
            ...obj,
            rawPoints,
            finalPoints,
            constantK,
            decimalPart
        };
    });

    return { distribution, k: constantK, totalLessons };
}
