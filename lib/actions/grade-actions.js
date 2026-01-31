"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Registra o actualiza una calificación.
 * @param {Object} payload { studentId, planId, score, feedback }
 */
export async function submitGrade({ studentId, planId, score, feedback }) {
    try {
        // Validation
        const numScore = parseFloat(score);
        if (isNaN(numScore) || numScore < 0 || numScore > 100) {
            throw new Error("La nota debe estar entre 0 y 100.");
        }

        const grade = await prisma.grade.upsert({
            where: {
                studentId_planId: {
                    studentId,
                    planId
                }
            },
            update: {
                score: numScore,
                feedback
            },
            create: {
                studentId,
                planId,
                score: numScore,
                feedback
            }
        });

        revalidatePath("/dashboard/grades");
        return { success: true, data: grade };

    } catch (error) {
        console.error("Grade Error:", error);
        return { success: false, error: error.message };
    }
}
