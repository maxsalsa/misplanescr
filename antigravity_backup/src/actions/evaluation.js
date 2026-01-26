'use server';

import { prisma } from '@/lib/neon'; // Assuming neon lib exposes prisma client instance
// If prisma comes from @/lib/prisma, adjust accordingly. 
// Standard in this project seems to be @/lib/prisma based on auth.ts
// I will use @/lib/prisma

import { prisma as db } from '@/lib/prisma';

export async function submitGrade(studentId, component, value, rubricId) {
    // 🛡️ REGLA DE ORO: BLOQUEO DE PERSISTENCIA
    if (!rubricId) {
        return {
            success: false,
            error: "VIOLACIÓN DE NORMATIVA: No se puede registrar una calificación sin un instrumento técnico (Rúbrica/Lista Cotejo) vinculado."
        };
    }

    try {
        const record = await db.evaluationLog.create({
            data: {
                studentId,
                component,
                grade: parseFloat(value),
                rubricLinked: true, // Confirmed
            }
        });
        return { success: true, data: record };
    } catch (e) {
        return { success: false, error: "Error de integridad en Neon DB." };
    }
}
