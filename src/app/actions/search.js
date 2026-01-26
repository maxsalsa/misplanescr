'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function globalSearchAction(query) {
    if (!query || query.length < 2) return { results: [] };

    try {
        const searchTerm = query.toLowerCase();

        // 1. SEARCH STUDENTS (Estudiantes)
        const students = await prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { identifier: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 5
        });

        // 2. SEARCH PLANS (Planeamientos, Asignaturas, Subáreas)
        // Groups are often part of the 'level' or 'title'
        const plans = await prisma.pedagogicalPlan.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { subject: { contains: query, mode: 'insensitive' } }, // Asignatura
                    { level: { contains: query, mode: 'insensitive' } },   // Grupo/Nivel
                    { content: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 5
        });

        // 3. SEARCH GRADES (Boletas, Evaluaciones)
        // Search grades by type or linked student name
        const grades = await prisma.grade.findMany({
            where: {
                OR: [
                    { type: { contains: query, mode: 'insensitive' } },
                    { feedback: { contains: query, mode: 'insensitive' } },
                    { student: { name: { contains: query, mode: 'insensitive' } } }
                ]
            },
            include: { student: true },
            take: 5
        });

        // FORMAT RESULTS
        const formattedResults = [
            ...students.map(s => ({ type: 'student', title: s.name, subtitle: `Estudiante - ${s.condition || 'Regular'}`, url: '/estudiantes' })),
            ...plans.map(p => ({
                type: 'plan', title: p.title, subtitle: `Plan - ${p.subject} (${p.level})`, url: `/dashboard/planning/${p.id}` // Assuming view route
            })),
            ...grades.map(g => ({ type: 'grade', title: `${g.type} - ${g.value}`, subtitle: `Boleta - ${g.student.name}`, url: '/dashboard/grading' }))
        ];

        return { success: true, results: formattedResults };

    } catch (error) {
        console.error("Search Error:", error);
        return { success: false, error: "Error buscando datos." };
    }
}
