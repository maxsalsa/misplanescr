'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markWelcomeAsSeen(userId) {
    if (!userId) return;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { hasSeenWelcome: true }
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to mark welcome as seen:', error);
        return { success: false };
    }
}
