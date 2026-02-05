"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validación estricta
const RequestSchema = z.object({
  type: z.string().min(1, "Seleccione un tipo"),
  date: z.string().min(1, "La fecha es obligatoria"),
  reason: z.string().min(10, "La justificación debe ser detallada"),
});

export async function createHRRequest(formData) {
  try {
    // 1. Validar Datos
    const rawData = {
      type: formData.get("type"),
      date: formData.get("date"),
      reason: formData.get("reason"),
    };
    const validated = RequestSchema.parse(rawData);

    // 2. Guardar en DB (Simulamos usuario Max Salazar por ahora)
    // En producción se usa: const session = await auth();
    const user = await prisma.user.findUnique({
      where: { email: "max.salazar@mep.go.cr" },
    });
    if (!user) return { success: false, error: "Usuario no autorizado" };

    await prisma.administrativeRequest.create({
      data: {
        type: validated.type,
        dateStart: new Date(validated.date), // Convertir String a Date
        description: validated.reason,
        userId: user.id,
        status: "PENDIENTE",
      },
    });

    // 3. Actualizar Cache (Para que la tabla se refresque sola)
    revalidatePath("/dashboard/hr");
    return { success: true };
  } catch (error) {
    console.error("Error RRHH:", error);
    return { success: false, error: "Error de conexión. Intente nuevamente." };
  }
}
