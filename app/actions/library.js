"use server";
import { prisma } from "@/lib/db";
import { getSecureSession, logAction } from "@/lib/security";

export async function getUserPlans() {
  const user = await getSecureSession();
  // SOLO devuelve los planes DE ESTE USUARIO
  return await prisma.pedagogicalPlan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });
}

export async function deletePlan(planId) {
  try {
    const user = await getSecureSession();

    // VERIFICACIÓN DE PROPIEDAD (CRÍTICO)
    // Intentamos borrar SOLO si el userId coincide.
    const deleted = await prisma.pedagogicalPlan.deleteMany({
      where: { 
        id: planId,
        userId: user.id // <-- AQUÍ ESTÁ EL CANDADO
      }
    });

    if (deleted.count === 0) {
      await logAction(user.id, "DELETE_FAIL", `Intento fallido ID: ${planId}`);
      return { success: false, error: "No autorizado o archivo no existe." };
    }

    await logAction(user.id, "DELETE_SUCCESS", `Plan eliminado ID: ${planId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error de sistema." };
  }
}