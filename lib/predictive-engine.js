/**
 * 🔮 PREDICTIVE ENGINE (THE AMBASSADOR)
 * Handles proactive draft generation based on MEP Calendar & Teacher History.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// MEP OFFICIAL DATES (MOCKED)
const MEP_CALENDAR = [
    { event: 'CIERRE_I_TRIMESTRE', date: '2026-04-15', type: 'EXAM' },
    { event: 'EFEMERIDE_JUAN_SANTAMARIA', date: '2026-04-11', type: 'ACTO_CIVICO' }
];

export async function checkPredictiveTriggers(userId) {
    const today = new Date();
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { neuroProfile: true } // Check inclusion needs
    });

    if (!user || user.subscriptionStatus === 'FREE') return null;

    for (const entry of MEP_CALENDAR) {
        const eventDate = new Date(entry.date);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // RULE: T-7 DAYS (PROACTIVE WINDOW)
        if (diffDays === 7) {
            // Check Duplicity
            const existing = await prisma.predictiveDraft.findFirst({
                where: { userId, eventType: entry.event }
            });

            if (existing) continue; // Already handled

            // CONTEXT AWARENESS (HISTORY)
            // In a real scenario, we query vector store for 'Last Topics'
            const context = "Tema Recientes: Geometría y Álgebra";

            // GENERATE DRAFT
            console.log(`🔮 ORACLE: Generating Draft for ${entry.event} (User: ${user.name})`);

            // INCLUSION VALIDATION
            let draftContent = `Borrador de ${entry.type} para ${entry.event}.`;
            if (user.neuroProfile?.conditions?.includes('ALTA_DOTACION')) {
                draftContent += "\n[MODO DESAFÍO ACTIVO]: Retos de Pensamiento Crítico incluidos.";
            }

            // SAVE DRAFT
            await prisma.predictiveDraft.create({
                data: {
                    teacherId: userId, // Mapped to 'teacherId' in schema
                    type: 'EXAMEN', // Defaulting based on event type
                    title: `Propuesta: ${entry.event}`,
                    contentJson: { body: draftContent }, // Storing as JSON
                    status: 'PENDING'
                }
            });

            return {
                type: 'PREDICTIVE_ALERT',
                message: `Lic. ${user.name}, he preparado su borrador de ${entry.type}.`,
                action: 'REVIEW_DRAFT'
            };
        }
    }

    return null;
}
