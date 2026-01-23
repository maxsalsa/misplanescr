'use server';

import { prisma as db } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

/**
 * UTILERÍAS ADMINISTRATIVAS - V49 SENTINEL
 * Exclusivo para Super Admin.
 */

/**
 * Obtiene todos los usuarios del sistema.
 */
export async function getAllUsers() {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== 'SUPER_ADMIN') return [];

    // @ts-ignore
    const users = await db.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            plan: true,
            status: true,
            createdAt: true,
            _count: {
                // @ts-ignore
                select: { planes: true } // Relation name: planes
            }
        }
    });

    return users.map(u => ({
        ...u,
        // @ts-ignore
        totalPlans: u._count.planes
    }));
}

/**
 * Obtiene logs de auditoría (Simulados con DB real si existiera tabla logs, 
 * por ahora retornamos actividad reciente real de usuarios)
 */
export async function getSystemLogs() {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== 'SUPER_ADMIN') return [];

    // Usamos los planes recientes de todos como "Log"
    // @ts-ignore
    const recentPlans = await db.plan.findMany({
        take: 10,
        orderBy: { updatedAt: 'desc' },
        include: { user: { select: { name: true } } }
    });

    return recentPlans.map(p => ({
        id: p.id,
        action: 'UPDATE_PLAN',
        // @ts-ignore
        user: p.user.name,
        details: `Modificó plan de ${p.asignatura}`,
        timestamp: p.updatedAt
    }));
}

/**
 * Obtiene estadísticas crudas de la BD
 */
export async function getDatabaseStats() {
    const session = await auth();
    // @ts-ignore
    if (session?.user?.role !== 'SUPER_ADMIN') return null;

    const userCount = await db.user.count();
    // @ts-ignore
    const planCount = await db.plan.count();

    // Future: Count active sessions?

    return {
        users: userCount,
        plans: planCount,
        dbStatus: 'CONNECTED (Neon)',
        version: 'V49.2'
    };
}
