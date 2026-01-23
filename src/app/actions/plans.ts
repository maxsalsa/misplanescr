'use server';

import { prisma as db } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

/**
 * Guarda un planeamiento en la base de datos real (Neon).
 * Reemplaza a lib/plans-service.js
 */
export async function savePlanAction(planData: any) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("No autenticado");
    }

    try {
        console.log("💾 [V48] Guardando Plan en Neon:", planData.title);

        // @ts-ignore
        const newPlan = await db.plan.create({
            data: {
                userId: session.user.id,
                asignatura: planData.title.split('-')[0].trim() || "General",
                nivel: planData.description.split(':')[2]?.trim() || "Sin Nivel",
                // Mapeo del JSON completo al campo jsonCompleto
                jsonCompleto: planData.data || {},
                // Valores por defecto para campos obligatorios del schema V34
                perfil: 'ACADEMICO',
                valores: [],
                ejesTransversales: []
            }
        });

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/planning');

        return { success: true, planId: newPlan.id };
    } catch (error) {
        console.error("❌ Error guardando plan en Neon:", error);
        return { success: false, error: "Error de base de datos" };
    }
}

export async function getMyPlansAction() {
    const session = await auth();
    if (!session?.user?.id) return [];

    // @ts-ignore
    return await db.plan.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' }
    });
}
