import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export 

export async function logAction({
    action,
    details,
    severity = 'INFO',
    metadata = {}
}: {
    action;
    details;
    severity?;
    metadata?;
}) {
    try {
        const session = await auth();
        const userId = session?.user?.id || 'SYSTEM_ANONYMOUS';

        // In a real Antigravity system, we would write to a specialized table.
        // For now, we console log structurally so Vercel/Datadog picks it up,
        // and if 'SecurityLog' table becomes available, we uncomment the prisma call.

        const logEntry = {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            userId,
            action,
            severity,
            details,
            metadata.stringify(metadata)
        };

        console.log(`[ANTIGRAVITY_AUDIT]`, JSON.stringify(logEntry));

        /* 
        // FUTURE SCHEMA IMPLEMENTATION:
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                severity,
                details,
                metadata
            }
        }); 
        */

    } catch (e) {
        console.error("AUDIT_FAILURE not log action", e);
    }
}
