"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Recupear planes con paginación
 * @param {Object} params - { page, limit, userId }
 */
// ... imports

/**
 * Recupear planes con paginación
 */
export async function getPlans({ page = 1, limit = 9, userId }) {
  try {
    const skip = (page - 1) * limit;

    if (!userId) throw new Error("ID de usuario requerido");

    // GOD MODE RESOLUTION
    let queryUserId = userId;
    if (userId === "max_salazar_id") {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: "max@misplanescr.com" },
            { email: "admin@aulaplanea.com" },
          ],
        },
      });
      if (user) queryUserId = user.id;
    }

    const [plans, total] = await Promise.all([
      prisma.lessonPlan.findMany({
        // FIXED: pedagogicalPlan -> lessonPlan
        where: {
          userId: queryUserId,
          status: { not: "TRASH" },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lessonPlan.count({ where: { userId: queryUserId } }),
    ]);

    return {
      success: true,
      data: plans,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  } catch (error) {
    console.error("Error fetching plans:", error);
    return { success: false, error: "Error al cargar los planes." };
  }
}

/**
 * Recuperar un plan único por ID
 */
export async function getPlanById(id) {
  try {
    const plan = await prisma.lessonPlan.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true, institution: true } },
      },
    });
    if (!plan) return { success: false, error: "Plan no encontrado" };
    return { success: true, data: plan };
  } catch (error) {
    return { success: false, error: "Error al recuperar el plan" };
  }
}

/**
 * Crear un nuevo plan vacío
 */
export async function createPlan(data) {
  try {
    const newPlan = await prisma.lessonPlan.create({
      data: {
        ...data,
        // Ensure content is valid JSON
        content: data.content || {},
      },
    });

    revalidatePath("/dashboard/plans");
    return { success: true, data: newPlan };
  } catch (error) {
    console.error("Create Plan Error:", error);
    return { success: false, error: "No se pudo crear el plan." };
  }
}
