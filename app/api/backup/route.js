import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  // DUMP COMPLETO DE LA BD (REDUNDANCIA)
  const backup = {
    date: new Date().toISOString(),
    plans: await prisma.lessonPlan.findMany(),
    groups: await prisma.group.findMany({ include: { students: true } }),
    grades: await prisma.grade.findMany(),
  };

  return NextResponse.json(backup);
}
