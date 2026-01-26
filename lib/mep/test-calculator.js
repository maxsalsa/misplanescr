
/**
 * MEP TEST CALCULATOR (Reglamento de Evaluación de los Aprendizajes)
 * 
 * Regla Oficial:
 * 1. Constante (K) = Puntos Totales / Total Lecciones
 * 2. Puntos por Indicador = Lecciones * K
 * 3. Redondeo:
 *    - Decimales >= 0.50 -> Redondeo hacia arriba (Ceil/Round)
 *    - Decimales < 0.50 -> Redondeo hacia abajo (Floor)
 *    * Nota Math.round() hace esto estándar (x.5 sube), pero implementamos lógica explícita para seguridad.
 */

export [];
}

export 

export 

export function calculateTestGrid(input) {
    // 1. Sum Total Lessons
    const totalLessons = input.indicators.reduce((acc, curr) => acc + curr.lessons, 0);

    if (totalLessons === 0) {
        throw new Error("El total de lecciones no puede ser 0.");
    }

    // 2. Calculate Measure Constant (K)
    // We keep precision for internal calculation
    const k = input.totalPoints / totalLessons;

    // 3. Calculate Distribution
    const distribution = input.indicators.map(ind => {
        const raw = ind.lessons * k;

        // MEP Rounding Logic extraction
        const integerPart = Math.floor(raw);
        const decimalPart = raw - integerPart;

        let final = integerPart;
        // ">= 0.50 sube"
        // Using a epsilon for float comparison safety
        if (decimalPart >= 0.4999999) {
            final = integerPart + 1;
        }

        return {
            indicatorId: ind.id,
            description: ind.description,
            lessons: ind.lessons,
            rawPoints: raw,
            finalPoints: final
        };
    });

    const calculatedPoints = distribution.reduce((acc, curr) => acc + curr.finalPoints, 0);

    return {
        totalLessons,
        constantK: k,
        distribution,
        calculatedPoints
    };
}
