"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

/**
 * Fetches "Official Templates" from the LessonPlan table.
 * 
 * Logic:
 * 1. Filter by 'subject' (if provided).
 * 2. Ideally, we should tag official templates. 
 *    Since existing data is "Massively Ingested", we assume mostly official ones exist or we filter by a convention.
 *    For now, we fetch ALL plans that match the subject, assuming the DB was populated with these.
 *    User instruction: "query prisma.lessonPlan.findMany({ where: { subject: 'Turismo' } })"
 */
export async function getOfficialTemplates(subject = null) {
    const session = await auth();
    if (!session?.user) return [];

    const where = {};

    // Strict Subject Filtering
    if (subject) {
        where.subject = { contains: subject, mode: 'insensitive' };
    }

    // Optional: If we want to ensure it's an "Official" template, maybe filter by a specific User ID (Admin) 
    // or checks for specific metadata in 'content'.
    // For the requested scope, we trust the filter by subject as per instruction.

    try {
        const templates = await db.lessonPlan.findMany({
            where,
            orderBy: { title: 'asc' },
            take: 20, // Limit for UI performance
            select: {
                id: true,
                title: true,
                subject: true,
                level: true,
                content: true, // Needed to show Evidence/Moments
                updatedAt: true
            }
        });

        // Transform content if necessary (e.g. valid JSON parsing)
        // Prisma handles JSON automatically.

        return templates;
    } catch (error) {
        console.error("Error fetching official templates:", error);
        return [];
    }
}
