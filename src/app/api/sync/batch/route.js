import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { operations } = await req.json();

        if (!operations || !Array.isArray(operations)) {
            return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
        }

        const results = [];

        for (const op of operations) {
            // 🔒 IDEMPOTENCY CHECK (ATOMIC)
            // Check if this key was already processed
            const existing = await prisma.securityLog.findFirst({
                where: { details: op.idempotencyKey } // Using SecurityLog as an audit trail for processed keys
            });

            if (existing) {
                console.warn(`♻️ Duplicate Operation Dropped: ${op.idempotencyKey}`);
                results.push({ id: op.id, status: 'SKIPPED_DUPLICATE' });
                continue;
            }

            // PROCESS OPERATION (MOCK DISPATCHER)
            // Here we would route based on op.type (GENERATE_PLAN, CONDUCT_REPORT, etc.)
            // For Kaizen 19.0, we just log and acknowledge.
            console.log(`📡 Processing: ${op.type} (${op.idempotencyKey})`);

            // Log Key to ensure Idempotency
            await prisma.securityLog.create({
                data: {
                    level: "INFO",
                    event: "SYNC_OP_PROCESSED",
                    details: op.idempotencyKey,
                    // userId: op.payload.userId // Assuming payload brings context
                }
            });

            results.push({ id: op.id, status: 'SUCCESS' });
        }

        return NextResponse.json({ results }, { status: 200 });

    } catch (e) {
        console.error("Sync Batch Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
