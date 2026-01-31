import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await auth();

    // 1. Security Check
    if (!session?.user || (session.user.role !== "DIRECTOR" && session.user.role !== "GOD_TIER")) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const schoolId = session.user.schoolId;
    const whereClause = schoolId ? { user: { schoolId } } : {};

    try {
        // 2. Fetch Data
        const allPlans = await db.lessonPlan.findMany({
            where: whereClause,
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        // 3. Generate JSON (Mocking a ZIP for now)
        const data = JSON.stringify(allPlans, null, 2);
        const filename = `respaldo_institucional_${schoolId || 'global'}_${new Date().toISOString().split('T')[0]}.json`;

        // 4. Return as Download
        return new NextResponse(data, {
            headers: {
                "Content-Type": "application/json",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });

    } catch (error) {
        console.error("Export error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
