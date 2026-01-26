import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(req) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const students = await prisma.student.findMany({
            where: { teacherId: session.user.id },
            select: { section: true, has7600: true, isGifted: true }
        });

        // Agrupar por sección
        const groupsMap = new Map();
        students.forEach(s => {
            if (!groupsMap.has(s.section)) {
                groupsMap.set(s.section, { name: s.section, has7600: false, isGifted: false });
            }
            const group = groupsMap.get(s.section);
            if (s.has7600) group.has7600 = true;
            if (s.isGifted) group.isGifted = true;
        });

        return NextResponse.json({ groups: Array.from(groupsMap.values()) });

    } catch (error) {
        console.error("API GROUPS ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
