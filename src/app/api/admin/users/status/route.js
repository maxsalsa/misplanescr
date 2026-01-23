import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function PATCH(request) {
    try {
        const session = await auth();

        // Security Check: Only Admins
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { userId, status } = body;

        if (!userId || !status) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { status: status }
        });

        console.log(`[ADMIN AUDIT] User ${updatedUser.email} status changed to ${status} by ${session.user.email}`);

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("[Non-Critical Error]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
