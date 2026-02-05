"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Guarda las notas de un grupo de estudiantes de forma atómica.
 * @param {Array} grades - Array de objetos con datos de la nota
 * @param {String} subject - Materia
 * @param {String} period - Periodo
 */
export async function saveGrades(grades, subject, period) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    if (!grades || !Array.isArray(grades) || !subject || !period) {
      return { error: "Datos incompletos" };
    }

    // TRANSACCIÓN ATÓMICA (ACID)
    await prisma.$transaction(
      grades.map((g) => {
        // Cálculo de seguridad si el frontend falla
        const finalScore =
          (parseFloat(g.cotidiano) || 0) +
          (parseFloat(g.tareas) || 0) +
          (parseFloat(g.pruebas) || 0) +
          (parseFloat(g.proyecto) || 0) +
          (parseFloat(g.asistencia) || 0);

        return prisma.grade.upsert({
          where: {
            userId_studentId_subject_period: {
              userId: session.user.id,
              studentId: g.id,
              subject: subject,
              period: period,
            },
          },
          update: {
            cotidiano: parseFloat(g.cotidiano || 0),
            tareas: parseFloat(g.tareas || 0),
            pruebas: parseFloat(g.pruebas || 0),
            proyecto: parseFloat(g.proyecto || 0),
            asistencia: parseFloat(g.asistencia || 0),
            final: finalScore,
            details: g.details || {}, // Soporte para Rúbrica 1-3
            studentName: g.name,
          },
          create: {
            userId: session.user.id,
            studentId: g.id,
            studentName: g.name,
            subject: subject,
            period: period,
            cotidiano: parseFloat(g.cotidiano || 0),
            tareas: parseFloat(g.tareas || 0),
            pruebas: parseFloat(g.pruebas || 0),
            proyecto: parseFloat(g.proyecto || 0),
            asistencia: parseFloat(g.asistencia || 0),
            final: finalScore,
            details: g.details || {},
          },
        });
      })
    );

    revalidatePath("/dashboard/grades");
    return { success: true, count: grades.length };
  } catch (error) {
    console.error("Error en saveGrades:", error);
    return { error: "Error al guardar en base de datos. Intente de nuevo." };
  }
}

/**
 * Obtiene las notas guardadas para un contexto dado.
 */
export async function getGrades(subject, period) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Auth required" };

    const grades = await prisma.grade.findMany({
      where: {
        userId: session.user.id,
        subject: subject,
        period: period
      }
    });
    return { success: true, data: grades };
  } catch (e) {
    return { error: e.message };
  }
}
