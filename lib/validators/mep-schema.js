import { z } from 'zod';

// ==========================================
// 🛡️ MEP VALIDATION SCHEMAS (ZOD)
// ==========================================

export const ResourceTypeEnum = z.enum([
    'PLAN_ANUAL', 'PLAN_UNIDAD', 'PLAN_DIARIO',
    'ACTIVIDAD_MEDIACION', 'RUBRICA', 'GUIA_AUTONOMA',
    'PRACTICA', 'REPASO', 'EXAMEN', 'CAPSULA_FAMILIA'
]);

// 1. Core Pedagogical Atomic Unit
export const PedagogicalResourceSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(5, "El título debe tener al menos 5 caracteres."),
    type,
    subject: z.string().min(3),
    level: z.string().min(1),
    contentJson: z.any(), // Flexible for now, or specific schema
    htmlContent: z.string().optional(),
    pdfSourceHash: z.string().optional()
});

// 2. Official MEP Plan Structure (Multi-Year Support)
export const PlanSchema = z.object({
    year: z.number().int().min(2024).max(2030).default(2026), // 📅 YEAR SELECTOR
    modalidad: z.string(),
    nivel: z.string(),
    asignatura: z.string(),
    unidad: z.string(),
    aprendizajes: z.array(z.object({
        resultado: z.string().min(10, "El RA debe ser descriptivo"),
        indicadores: z.array(z.string().min(5)),
        estrategias: z.string().min(20, "La mediación debe ser detallada")
    })).min(1, "Debe incluir al menos un aprendizaje esperado."),
    dua_active: z.boolean().default(false)
}).superRefine((data, ctx) => {
    // 🛡️ 2026 STRICT COMPLIANCE RULES
    if (data.year >= 2026) {
        if (!data.dua_active) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: " [MEP 2026] El DUA es obligatorio. Active 'dua_active: true'.",
                path: ["dua_active"]
            });
        }

        // Check for DUA Keywords in strategies
        const duaKeywords = ['ELECCION', 'MULTIFORMATO', 'ACCESIBILIDAD', 'REPRESENTACION', 'MOTIVACION'];
        data.aprendizajes.forEach((ap, index) => {
            const hasDua = duaKeywords.some(kw => ap.estrategias.toUpperCase().includes(kw));
            if (!hasDua) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `[MEP 2026] La estrategia #${index + 1} debe incluir sintaxis DUA explícita (Ej: 'Elección', 'Multiformato').`,
                    path: ["aprendizajes", index, "estrategias"]
                });
            }
        });
    }
});

// 3. Rubric / Evaluation
export const RubricSchema = z.object({
    title: z.string(),
    criterios: z.array(z.object({
        descripcion: z.string(),
        puntos: z.number().min(1).max(100),
        niveles: z.object({
            inicial: z.string(),
            intermedio: z.string(),
            avanzado: z.string()
        })
    }))
});

// 4. Global Resource Intelligence Schema
export const GlobalResourceSchema = z.object({
    sourceUrl: z.string().url(),
    pedagogicalData: z.object({
        objectives: z.array(z.string()),
        materials: z.array(z.string()),
        flow: z.string()
    }),
    adaptationData: z.object({
        dua_tags: z.array(z.string()).optional(),
        mep_compliant: z.boolean()
    }).optional()
});
