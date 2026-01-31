"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

/**
 * Verifica si el usuario actual tiene permisos de DIRECTOR o GOD_TIER.
 * Si no, lanza un error o redirige.
 */
async function checkDirectorPermission() {
    const session = await auth();
    if (!session?.user) redirect("/auth/login");

    const role = session.user.role;
    if (role !== "DIRECTOR" && role !== "GOD_TIER") {
        // Retornamos null para manejarlo en la UI o redirigimos
        redirect("/dashboard");
    }
    return session.user;
}

/**
 * Obtiene los KPIs principales para el Dashboard del Director.
 * Agrupa planes por asignatura para simular departamentos.
 */
export async function getDirectorStats() {
    const user = await checkDirectorPermission();
    const schoolId = user.schoolId;

    // Si no hay schoolId (ej. GOD_TIER global), advertir o mostrar todo
    // Asumiremos que el Director SIEMPRE tiene schoolId. 
    // Si es GOD_TIER sin schoolId, podría ver todo (opcional).
    const whereClause = schoolId ? { user: { schoolId } } : {};

    try {
        // 1. Total de planes entregados
        const totalPlans = await db.lessonPlan.count({
            where: whereClause,
        });

        // 2. Planes por Asignatura (Departamentos)
        // Prisma no tiene un "groupBy" nativo súper flexible con relaciones en todas las versiones,
        // pero podemos hacer un groupBy simple en la tabla LessonPlan.
        const plansBySubject = await db.lessonPlan.groupBy({
            by: ["subject"],
            where: whereClause,
            _count: {
                id: true,
            },
        });

        // Formatear para gráfica
        const subjectStats = plansBySubject.map((item) => ({
            subject: item.subject || "Sin Asignatura",
            count: item._count.id,
        }));

        // 3. Docentes Activos (con al menos 1 plan)
        // Esto es una aproximación. Lo ideal sería status de login, pero usaremos actividad de planes por ahora.
        const activeTeachersCount = await db.user.count({
            where: {
                ... (schoolId ? { schoolId } : {}),
                planes: {
                    some: {}, // Tiene al menos un plan
                },
            },
        });

        return {
            totalPlans,
            activeTeachersCount,
            subjectStats,
        };
    } catch (error) {
        console.error("Error fetching director stats:", error);
        return {
            totalPlans: 0,
            activeTeachersCount: 0,
            subjectStats: [],
            error: "Error al cargar estadísticas.",
        };
    }
}

/**
 * Obtiene un reporte de cumplimiento filtrable.
 * @param {string} subjectFilter - Filtro opcional por asignatura
 * @param {string} levelFilter - Filtro opcional por nivel
 */
export async function getComplianceReport(subjectFilter, levelFilter) {
    const user = await checkDirectorPermission();
    const schoolId = user.schoolId;

    const whereClause = {
        ...(schoolId ? { user: { schoolId } } : {}),
        ...(subjectFilter ? { subject: subjectFilter } : {}),
        ...(levelFilter ? { level: levelFilter } : {}),
    };

    try {
        const plans = await db.lessonPlan.findMany({
            where: whereClause,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
            take: 50, // Paginación implícita para evitar sobrecarga
        });

        return plans.map(plan => ({
            id: plan.id,
            title: plan.title,
            subject: plan.subject || "N/A",
            level: plan.level || "N/A",
            teacherName: plan.user?.name || "Desconocido",
            teacherEmail: plan.user?.email,
            status: plan.status,
            lastModified: plan.updatedAt,
        }));
    } catch (error) {
        console.error("Error fetching compliance report:", error);
        return [];
    }
}

/**
 * Simula la descarga de un respaldo institucional generándolo como un objeto JSON masivo.
 * A futuro esto generaría un ZIP real.
 */
export async function generateInstitutionalBackup() {
    const user = await checkDirectorPermission();
    const schoolId = user.schoolId;

    if (!schoolId && user.role !== "GOD_TIER") {
        throw new Error("No school ID found for backup.");
    }

    const whereClause = schoolId ? { user: { schoolId } } : {};

    try {
        const allPlans = await db.lessonPlan.findMany({
            where: whereClause,
            include: {
                user: true, // Incluir datos del autor
            }
        });

        // En un escenario real, aquí crearíamos un ZIP con JSZip
        // Retornamos los datos crudos para que el cliente cree el Blob
        return JSON.stringify(allPlans, null, 2);
    } catch (error) {
        console.error("Error generating backup:", error);
        throw new Error("Failed to generate backup.");
    }
}
