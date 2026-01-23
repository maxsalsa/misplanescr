'use server';

import { prisma as db } from '@/lib/prisma';
import { auth } from '@/auth';

export async function getDashboardStats() {
    const session = await auth();

    if (!session?.user) {
        return {
            students: 0,
            groups: 0,
            pendingReports: 0,
            alerts: 0
        };
    }

    const userId = session.user.id;

    // Conteo Real desde DB
    // Nota: Como estamos iniciando, es posible que no haya muchos datos,
    // pero la consulta debe ser real.

    const studentsCount = await db.user.count({
        where: {
            role: 'ESTUDIANTE',
            // TODO: Filtrar por relación con el docente en tabla futura 'Enrollment'
        }
    });

    // @ts-ignore
    const plansCount = await db.plan.count({
        where: { userId }
    });

    // En un futuro, contar grupos reales
    const groupsCount = 0;

    return {
        students: studentsCount,
        groups: groupsCount,
        pendingReports: 0, // Placeholder
        alerts: 0, // Placeholder
        plansCreated: plansCount
    };
}

export async function getRecentActivity() {
    const session = await auth();
    if (!session?.user) return [];

    // Fetch last 5 plans created/modified
    // @ts-ignore
    const recentPlans = await db.plan.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
        take: 5
    });

    return recentPlans.map(plan => ({
        id: plan.id,
        type: 'grade', // Visual icon type
        detail: `Plan Modificado: ${plan.asignatura}`,
        time: plan.updatedAt.toLocaleDateString(),
        status: 'Terminado',
        score: null
    }));
}

export async function getUserProfile() {
    const session = await auth();
    if (!session?.user) return null;

    // Refresh data from DB to ensure plan status is up to date
    const dbUser = await db.user.findUnique({
        where: { id: session.user.id }
    });

    const fullName = dbUser ? `${dbUser.nombre1} ${dbUser.apellido1}` : session.user.name;

    return {
        name: fullName,
        email: dbUser?.email || session.user.email,
        institution: 'MEP Costa Rica', // TODO: Field in DB
        role: dbUser?.role || 'DOCENTE',
        plan: dbUser?.subscriptionStatus === 'ACTIVE' ? 'pro' : 'demo'
    };
}
