import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const { students, period, subject } = await req.json();

    for (const s of students) {
        const existing = await db.grade.findFirst({
            where: { studentId: s.id, period: period, userId: session.user.id }
        });

        const dataPayload = {
            studentId: s.id, studentName: s.name, subject, period,
            cotidiano: parseFloat(s.cotidiano), tareas: parseFloat(s.tareas),
            pruebas: parseFloat(s.pruebas), proyecto: parseFloat(s.proyecto),
            asistencia: parseFloat(s.asistencia), final: parseFloat(s.final),
            details: s.details || {}, userId: session.user.id
        };

        if (existing) {
            await db.grade.update({ where: { id: existing.id }, data: dataPayload });
        } else {
            await db.grade.create({ data: dataPayload });
        }
    }
    return NextResponse.json({ success: true });
  } catch (error) { return new NextResponse("Error", { status: 500 }); }
}

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const grades = await db.grade.findMany({ where: { userId: session.user.id } });
    return NextResponse.json(grades);
}