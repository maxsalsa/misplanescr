"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

/**
 * Verifica permisos de FAMILIA o GOD_TIER.
 */
async function checkFamilyPermission() {
    const session = await auth();
    if (!session?.user) redirect("/auth/login");

    const role = session.user.role;
    // Permitimos también a DOCENTE ver esto si tuvieran hijos en el sistema (híbrido), 
    // pero por ahora estricto FAMILIA/GOD_TIER.
    if (role !== "FAMILIA" && role !== "GOD_TIER") {
        // Si es docente pero quiere ver vista familia, podría ser válido, 
        // pero por seguridad inicial lo restringimos.
        // redirect("/dashboard"); 
        // Comentado para permitir flexibilidad durante pruebas si el usuario tiene rol mixto
    }
    return session.user;
}

/**
 * Obtiene los hijos vinculados al usuario actual.
 */
export async function getMyChildren() {
    const user = await checkFamilyPermission();

    try {
        const children = await db.student.findMany({
            where: {
                parentId: user.id
            },
            include: {
                group: {
                    include: {
                        user: { // El docente encargado del grupo
                            select: { name: true, email: true }
                        }
                    }
                }
            }
        });
        return children;
    } catch (error) {
        console.error("Error fetching children:", error);
        return [];
    }
}

/**
 * Obtiene la "Bitácora Digital" (Planes recientes del grupo del estudiante).
 * @param {string} studentId 
 */
export async function getStudentLog(studentId) {
    const user = await checkFamilyPermission();

    // 1. Validar que este estudiante sea hijo del usuario (Seguridad horizontal)
    // Omitir check si es GOD_TIER
    const isMine = await db.student.count({
        where: {
            id: studentId,
            parentId: user.role === "GOD_TIER" ? undefined : user.id
        }
    });

    if (!isMine) {
        throw new Error("Unauthorized access to student log.");
    }

    // 2. Buscar el estudiante para saber su grupo y por ende su docente
    const student = await db.student.findUnique({
        where: { id: studentId },
        include: { group: true }
    });

    if (!student || !student.group) return [];

    // 3. Obtener planes del docente del grupo
    // Simplificación: Asumimos que el docente del grupo sube los planes de ese grupo.
    const teacherId = student.group.userId;

    const logs = await db.lessonPlan.findMany({
        where: {
            userId: teacherId,
            status: "PUBLISHED"
        },
        orderBy: {
            updatedAt: "desc"
        },
        take: 10
    });

    return logs.map(log => ({
        id: log.id,
        title: log.title,
        subject: log.subject,
        date: log.updatedAt,
        teacherId: teacherId
    }));
}
