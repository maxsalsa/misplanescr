"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

/**
 * Fetches curriculum data filtered by specialty or specific criteria.
 * Used by the Architect Engine frontend.
 */
export async function getCurriculumData(specialty = null) {
    const session = await auth();
    // Optional: Check permissions (e.g. only Director/Admin can see raw curriculum)
    // if (!session?.user) return [];

    const where = {};
    if (specialty) {
        where.specialty = { contains: specialty, mode: 'insensitive' };
    }

    try {
        const data = await db.curriculum.findMany({
            where,
            orderBy: { createdAt: "desc" },
            take: 50 // Limit for MVP
        });
        return data;
    } catch (error) {
        console.error("Error fetching curriculum:", error);
        return [];
    }
}
