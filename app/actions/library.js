"use server";
import { prisma } from "@/lib/db";
import { getSecureSession, logAction } from "@/lib/security";

export async function getUserPlans() {
  const user = await getSecureSession();
  // SOLO devuelve los planes DE ESTE USUARIO (Excluyendo Papelera)
  return await prisma.lessonPlan.findMany({
    where: {
      userId: user.id,
      status: { not: "TRASH" },
    },
    orderBy: { createdAt: "desc" },
  });
}

// REFACTORED FOR LESSONPLAN MODEL & SOFT DELETE
export async function deletePlan(planId) {
  try {
    const user = await getSecureSession();

    // SOFT DELETE (Update status to TRASH)
    const deleted = await prisma.lessonPlan.updateMany({
      where: {
        id: planId,
        userId: user.id,
      },
      data: {
        status: "TRASH",
      },
    });

    if (deleted.count === 0) {
      return { success: false, error: "No autorizado o archivo no existe." };
    }

    await logAction(
      user.id,
      "DELETE_SOFT",
      `Plan movido a papelera ID: ${planId}`,
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error de sistema." };
  }
}

export async function restorePlan(planId) {
  try {
    const user = await getSecureSession();

    // RESTORE (Update status to DRAFT) - Could be restored to previous status if tracked, but DRAFT is safe
    const restored = await prisma.lessonPlan.updateMany({
      where: {
        id: planId,
        userId: user.id,
      },
      data: {
        status: "DRAFT", // O 'PUBLISHED' si quisiéramos ser más específicos
      },
    });

    if (restored.count === 0) {
      return { success: false, error: "No se pudo restaurar." };
    }

    await logAction(user.id, "RESTORE", `Plan restaurado ID: ${planId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error de sistema." };
  }
}
