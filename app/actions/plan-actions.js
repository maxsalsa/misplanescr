"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Recupear planes con paginación
 * @param {Object} params - { page, limit, userId }
 */
export async function getPlans({ page = 1, limit = 9, userId }) {
    try {
        const skip = (page - 1) * limit;

        // Validación básica de usuario
        if (!userId) throw new Error("ID de usuario requerido");

        // GOD MODE: Resolver ID de Max Salazar si es la simulación
        let queryUserId = userId;
        if (userId === "max_salazar_id") {
            // Intentamos con la cuenta que sabemos que existe
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: "max@misplanescr.com" },
                        { email: "admin@aulaplanea.com" } // Fallback safe
                    ]
                }
            });
            if (user) queryUserId = user.id;
        }

        const [plans, total] = await Promise.all([
            prisma.pedagogicalPlan.findMany({
                where: { userId: queryUserId },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: { _count: { select: { rows: true } } }
            }),
            prisma.pedagogicalPlan.count({ where: { userId: queryUserId } })
        ]);

        return {
            success: true,
            data: plans,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page
            }
        };
    } catch (error) {
        // En producción no queremos logs sucios, pero necesitamos saber qué pasó si falla algo crítico
        // console.error("Error fetching plans:", error);
        return { success: false, error: "Error al cargar los planes. Intente nuevamente." };
    }
}

/**
 * Crear un nuevo plan vacío
 */
export async function createPlan(data) {
    try {
        const newPlan = await prisma.pedagogicalPlan.create({
            data: {
                ...data,
                metadata: data.metadata || {}, // Robustez JSON
            }
        });

        revalidatePath("/dashboard/plans");
        return { success: true, data: newPlan };
    } catch (error) {
        return { success: false, error: "No se pudo crear el plan." };
    }
}
