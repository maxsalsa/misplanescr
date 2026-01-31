"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Meta anual estimada de planes (simplificado para el MEP)
// En MEP varía por materia/modalidad, pero usaremos 40 semanas como base de cálculo.
const ESTIMATED_ANNUAL_PLANS = 40;

async function checkStudentPermission() {
    const session = await auth();
    if (!session?.user) redirect("/auth/login");

    // Permitir también a GOD_TIER ver esto
    if (session.user.role !== "ESTUDIANTE" && session.user.role !== "GOD_TIER") {
        // Si es otro rol, redirigir (o manejar error)
        redirect("/dashboard");
    }
    return session.user;
}

/**
 * Obtiene el progreso curricular del estudiante actual.
 * @returns {Promise<{percent: number, level: string, points: number}>}
 */
export async function getStudentProgress() {
    const user = await checkStudentPermission();

    // 1. Obtener datos del estudiante (vinculado al usuario)
    // Asumimos que el User ESTUDIANTE tiene un registro en tabla Student asociado por email o userId.
    // *Nota*: En el schema actual, Student no tiene `userId` directo, se vincula por email o se asume identidad.
    // Para este MVP, asumiremos que el email del usuario coincide con el email del Student.

    const student = await db.student.findFirst({
        where: { email: user.email },
        include: { group: true }
    });

    if (!student || !student.group) {
        return { percent: 0, level: "Novato", points: 0 };
    }

    // 2. Contar planes publicados por el docente de su grupo
    const teacherId = student.group.userId;
    const publishedPlansCount = await db.lessonPlan.count({
        where: {
            userId: teacherId,
            status: "PUBLISHED"
        }
    });

    // 3. Calcular porcentaje (Tope 100%)
    const rawPercent = (publishedPlansCount / ESTIMATED_ANNUAL_PLANS) * 100;
    const percent = Math.min(100, Math.round(rawPercent));

    // 4. Gamificación Simple (Niveles)
    let level = "Explorador";
    if (percent > 20) level = "Aprendiz";
    if (percent > 40) level = "Practicante";
    if (percent > 60) level = "Especialista";
    if (percent > 80) level = "Maestro";
    if (percent >= 100) level = "Leyenda Académica";

    return {
        percent,
        level,
        points: publishedPlansCount * 50 // 50 XP por plan subido
    };
}

/**
 * Obtiene los recursos educativos extraídos de los planes recientes.
 */
export async function getStudentResources() {
    const user = await checkStudentPermission();

    const student = await db.student.findFirst({
        where: { email: user.email },
        include: { group: true }
    });

    if (!student || !student.group) return [];

    const teacherId = student.group.userId;

    // Obtener últimos planes
    const plans = await db.lessonPlan.findMany({
        where: { userId: teacherId, status: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
        take: 20
    });

    const resources = [];

    // Extraer URLs o Materiales del campo JSON `content`
    // Estructura esperada en content: { resources: [{ title, url, type }] }
    // Si no tiene esa estructura, buscamos campos genéricos o creamos mocks basados en el título.

    plans.forEach(plan => {
        // Safe parsing del contenido JSON
        const content = plan.content || {};

        // 1. Si hay recursos explícitos
        if (content.resources && Array.isArray(content.resources)) {
            content.resources.forEach(res => {
                resources.push({
                    id: Math.random().toString(36).substr(2, 9),
                    title: res.title || plan.title,
                    type: res.type || "link",
                    url: res.url || "#",
                    date: plan.updatedAt
                });
            });
        }

        // 2. (Fallback) Si el contenido es texto plano o estructura vieja, 
        // y el plan menciona palabras clave como "Video", "Guía", agregamos un mock para demo.
        // Esto es para asegurar que el estudiante vea ALGO en la demo.
        if (resources.length === 0 && plan.title) {
            resources.push({
                id: plan.id,
                title: `Material de Clase: ${plan.title}`,
                type: "document",
                url: `/dashboard/plans/${plan.id}`, // Enlace al plan
                date: plan.updatedAt
            });
        }
    });

    return resources;
}
