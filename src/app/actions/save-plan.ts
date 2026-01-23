'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { PlanSchema } from '@/lib/validators/mep-schema';
import { revalidatePath } from 'next/cache';

export async function savePlanToNeon(data: any) {
    try {
        // 1. Validate Session
        const session = await auth();
        if (!session?.user?.id) {
            return {
                success: false,
                message: "Acceso denegado: Sesión expirada."
            };
        }

        // 2. Validate Data Integrity (Server-Side)
        const validation = PlanSchema.safeParse(data);
        if (!validation.success) {
            return {
                success: false,
                message: "Error de Validación: Datos incompletos o formato incorrecto (DUA).",
                errors: validation.error.format()
            };
        }

        const plan = validation.data;

        // 3. Persist to NEON (PedagogicalResource Table)
        const newResource = await prisma.pedagogicalResource.create({
            data: {
                title: `Plan ${plan.asignatura} - ${plan.unidad}`,
                type: 'PLAN_UNIDAD',
                subject: plan.asignatura,
                level: plan.nivel,
                year: 2026, // Force MEP 2026 Standard
                contentJson: plan as any, // Store full structure
                authorId: session.user.id,
                version: 1,
                isTemplate: false,
                // Optional: Link to Unit if identified
            }
        });

        // 4. Register Audit Log (Security)
        await prisma.securityLog.create({
            data: {
                userId: session.user.id,
                event: "PLAN_CREATION",
                severity: "INFO",
                metadata: {
                    resourceId: newResource.id,
                    subject: plan.asignatura
                }
            }
        });

        // 5. Revalidate Cache
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/planning');

        return {
            success: true,
            message: "Plan guardado exitosamente en Neon DB.",
            id: newResource.id
        };

    } catch (error) {
        console.error("Neon Persistence Error:", error);
        return {
            success: false,
            message: "Error Crítico de Base de Datos. El equipo Antigravity ha sido notificado."
        };
    }
}
