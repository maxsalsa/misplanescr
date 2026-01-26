'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { PlanSchema } from '@/lib/validators/mep-schema';
import { revalidatePath } from 'next/cache';
import { logAction } from '@/audit/logger';

export async function savePlanToNeon(data) {
    try {
        await logAction({ action: "PLAN_SAVE_ATTEMPT", details: "Initiating save sequence" });

        // 1. Validate Session
        const session = await auth();
        if (!session?.user?.id) {
            await logAction({ action: "AUTH_FAILURE", details: "User not authenticated", severity: 'WARNING' });
            return {
                success: false,
                message: "Acceso denegadoón expirada."
            };
        }

        // 2. Validate Data Integrity (Zod Schema)
        const validation = PlanSchema.safeParse(data);
        if (!validation.success) {
            await logAction({ action: "SCHEMA_VALIDATION_ERROR", details: "Zod parse failed", metadata: validation.error.format(), severity: 'WARNING' });
            return {
                success: false,
                message: "Error de Validación incompletos o formato incorrecto (DUA).",
                errors: validation.error.format()
            };
        }

        const plan = validation.data;

        // 3. 🛡️ ANTIGRAVITY POLICY ENFORCEMENT (Normativa MEP)
        // Using dynamic import to avoid circular dep issues in some Next.js edge cases, though standard import is fine usually.
        const { validateMEPCompliance } = await import('@/policy/server-validator');
        const compliance = validateMEPCompliance(plan);

        if (!compliance.valid) {
            // BLOCK ACTION
            await logAction({
                action: "POLICY_BLOCK",
                details: `Blocked save due to ${compliance.code}`,
                severity: 'BLOCK',
                metadata: { reason: compliance.reason, planTitle: plan.unidad }
            });

            return {
                success: false,
                message: `⛔ BLOQUEO NORMATIVO: ${compliance.reason}`
            };
        }

        // 4. Persist to NEON (PedagogicalPlan Table)
        const newResource = await prisma.pedagogicalPlan.create({
            data: {
                title: `${plan.asignatura} - ${plan.unidad}`,
                subject: plan.asignatura,
                level: plan.nivel,
                content.stringify(plan),
                status: 'PUBLISHED',
                userId: session.user.id,
            }
        });

        // 5. Success Audit
        await logAction({
            action: "PLAN_CREATED",
            details: "Plan successfully saved to Neon DB",
            metadata: { resourceId: newResource.id }
        });

        // 6. Revalidate Cache
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/planning');

        return {
            success: true,
            message: "Plan guardado exitosamente en Neon DB.",
            id: newResource.id
        };

    } catch (error) {
        console.error("Neon Persistence Error:", error);
        await logAction({ action: "DB_CRITICAL_FAILURE", details.stringify(error), severity: 'CRITICAL' });
        return {
            success: false,
            message: "Error Crítico de Base de Datos. El equipo Antigravity ha sido notificado."
        };
    }
}
