"use server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- SCHEMAS ---
const ActivitySchema = z.object({
    title: z.string().min(1, "Título requerido"),
    type: z.string(),
    date: z.string().transform(str => new Date(str)),
    maxPoints: z.number().min(1),
    percentage: z.number().min(0).max(100),
    indicator: z.string().min(5, "Justificación requerida"),
    sectionId: z.string()
});

const GradeSchema = z.object({
    studentId: z.string(),
    score: z.number().min(0),
    feedback: z.string().optional()
});

const AttendanceSchema = z.object({
    studentId: z.string(),
    status: z.enum(["P", "A", "T", "AJ"])
});

// --- ACTIONS: ACTIVIDADES ---

export async function createActivity(prevState, formData) {
    try {
        const session = await auth();
        if (!session) return { error: "No autorizado" };

        const raw = {
            title: formData.get("title"),
            type: formData.get("type"),
            date: formData.get("date"),
            maxPoints: parseInt(formData.get("maxPoints")),
            percentage: parseFloat(formData.get("percentage")),
            indicator: formData.get("indicator"),
            sectionId: formData.get("sectionId"),
        };

        const validated = ActivitySchema.parse(raw);

        await prisma.activity.create({
            data: {
                ...validated,
                userId: session.user.id
            }
        });

        revalidatePath(`/dashboard/classroom/${validated.sectionId}`);
        return { success: true, message: "Actividad creada." };
    } catch (e) {
        if (e instanceof z.ZodError) return { error: e.errors[0].message };
        return { error: "Error al crear actividad." };
    }
}

export async function deleteActivity(id, sectionId) {
    await prisma.activity.delete({ where: { id } });
    revalidatePath(`/dashboard/classroom/${sectionId}`);
    return { success: true };
}

// --- ACTIONS: CALIFICACIONES (BATCH) ---

export async function saveGradesBatch(activityId, grades, sectionId) {
    try {
        const session = await auth();
        if (!session) return { error: "No autorizado" };

        // Transaction for atomic update/create
        await prisma.$transaction(
            grades.map(g =>
                prisma.grade.upsert({
                    where: {
                        studentId_activityId: {
                            studentId: g.studentId,
                            activityId: activityId
                        }
                    },
                    update: { score: g.score, feedback: g.feedback },
                    create: {
                        studentId: g.studentId,
                        activityId: activityId,
                        score: g.score,
                        feedback: g.feedback
                    }
                })
            )
        );

        revalidatePath(`/dashboard/classroom/${sectionId}`);
        return { success: true, message: "Notas guardadas." };
    } catch (e) {
        console.error(e);
        return { error: "Error al guardar notas." };
    }
}

// --- ACTIONS: ASISTENCIA (BATCH) ---

export async function saveAttendanceBatch(sectionId, dateStr, records) {
    try {
        const session = await auth();
        if (!session) return { error: "No autorizado" };

        const date = new Date(dateStr);

        // Crear sesión de asistencia
        const attSession = await prisma.attendanceSession.create({
            data: {
                sectionId,
                date,
                records: {
                    create: records.map(r => ({
                        studentId: r.studentId,
                        status: r.status
                    }))
                }
            }
        });

        revalidatePath(`/dashboard/classroom/${sectionId}`);
        return { success: true, message: "Asistencia registrada." };
    } catch (e) {
        console.error(e);
        return { error: "Error al registrar asistencia." };
    }
}
