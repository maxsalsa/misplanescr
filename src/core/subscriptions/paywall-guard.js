/**
 * 🛡️ PAYWALL GUARD
 * Backend Logic to strictly prevent unauthorized downloads.
 */

import { prisma } from '@/lib/db'; // Hypothetical Connection

export async function verifyDownloadPermission(userId) {
    console.log(`🔒 Verificando permisos para UserID: ${userId}`);

    // 1. Check in Neon DB
    /* const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionStatus: true, subscriptionPlan: true }
    }); */

    // MOCK RESPONSE
    const user = { subscriptionStatus: 'ACTIVE', subscriptionPlan: 'FREE' }; // Change to test

    if (!user) throw new Error("Usuario no encontrado.");

    if (user.subscriptionStatus !== 'ACTIVE') {
        console.warn(`⛔ BLOQUEO: Usuario ${userId} inactivo intentando descargar.`);
        return {
            allowed: false,
            reason: "SUBSCRIPTION_INACTIVE",
            watermarkLevel: "AGGRESSIVE"
        };
    }

    // Enterprise/Premium Logic
    if (user.subscriptionPlan === 'FREE') {
        return {
            allowed: false,
            reason: "PLAN_LIMIT_REACHED",
            watermarkLevel: "LIGHT" // Maybe allow 1 download?
        };
    }

    console.log("✅ ACCESO CONCEDIDO: Descarga Limpia autorizada.");
    return {
        allowed: true,
        watermarkLevel: "NONE"
    };
}
