import { prisma } from "@/lib/db";
import { z } from "zod";

// ESQUEMAS DE VALIDACIÓN (REGLAS ESTRICTAS)
export const PlanSchema = z.object({
  subject: z.string().min(2, "Asignatura requerida"),
  grade: z.string().min(1, "Nivel requerido"),
  topic: z.string().min(5, "El tema debe ser detallado"),
  duration: z.string(),
  inclusionContext: z.string().optional()
});

// FUNCIÓN DE AUDITORÍA (GRABAR LOG)
export async function logAction(userId, action, details) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, details }
    });
  } catch (e) {
    console.error("Fallo crítico en auditoría:", e);
  }
}

// SIMULADOR DE SESIÓN SEGURA (MOCK ZERO TRUST)
// En producción, esto validará el Token JWT real.
export async function getSecureSession() {
  // POR AHORA: Retorna al Super Admin para que funcione la demo
  const user = await prisma.user.findUnique({
    where: { email: "max.salazar@mep.go.cr" }
  });
  if (!user) throw new Error("ACCESO DENEGADO: Credenciales inválidas.");
  return user;
}