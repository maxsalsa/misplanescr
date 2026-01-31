"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Marca la asistencia de un grupo para una fecha dada.
 * @param {string} groupId 
 * @param {Date} date 
 * @param {Array<{studentId: string, status: string}>} records 
 */
export async function markAttendance(groupId, date, records) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    // Validar permisos del docente sobre el grupo
    // ... (Simplificado)

    try {
        // Usar transacción para atomicidad
        await db.$transaction(
            records.map(record =>
                db.attendance.create({
                    data: {
                        date: new Date(date),
                        status: record.status,
                        studentId: record.studentId,
                        // groupId: groupId // Si agregamos relación directa en Attendance
                    }
                })
            )
        );

        // Lógica de Alertas (Trigger)
        const absentStudents = records.filter(r => r.status === "ABSENT");
        if (absentStudents.length > 0) {
            // Simulación de notificación a padres
            console.log(`🔔 ALERTA DE INASISTENCIA: ${absentStudents.length} estudiantes marcados como ausentes.`);
            // Aquí se llamaría a un servicio de Email o WhatsApp
            await notifyParents(absentStudents);
        }

        return { success: true };
    } catch (error) {
        console.error("Error marking attendance:", error);
        return { success: false, error: "Failed to save attendance" };
    }
}

async function notifyParents(absentRecords) {
    // Mock notification service
    for (const record of absentRecords) {
        // Buscar email del padre via Student -> Parent
        const student = await db.student.findUnique({
            where: { id: record.studentId },
            include: { parent: true }
        });

        if (student?.parent?.email) {
            console.log(`📧 Enviando email a ${student.parent.email} sobre inasistencia de ${student.name}`);
        }
    }
}
