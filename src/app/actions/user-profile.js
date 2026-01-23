"use server";
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

/**
 * 🔒 SERVER ACTION: UPDATE USER PROFILE
 * Persist identity data to Neon DB.
 */
export async function updateUserProfile(formData) {
    const session = await auth();

    if (!session?.user?.email) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                professionalId: formData.professionalId,
                specialty: formData.specialty,
                region: formData.region,
                // Log the event for security
                securityLogs: {
                    create: {
                        event: "PROFILE_UPDATE",
                        severity: "INFO",
                        metadata: { ...formData }
                    }
                }
            }
        });

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Profile Update Failed:", error);
        return { success: false, error: "Database Error" };
    }
}
