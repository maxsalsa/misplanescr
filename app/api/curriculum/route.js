import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; 

export async function GET(req) {
  try {
    // OPTIMIZACIÓN: Solo traemos campos necesarios, no todo el objeto.
    // Esto reduce el peso del JSON drásticamente.
    const syllabus = await prisma.syllabus.findMany({
      select: {
        modalidad: true,
        level: true,
        subject: true,
        unit: true,
        topic: true
      },
      take: 2000 // Límite de seguridad para no colgar el navegador
    });
    
    return NextResponse.json(syllabus);
  } catch (error) {
    console.error("❌ Error API:", error);
    return NextResponse.json({ error: "Error cargando datos" }, { status: 500 });
  }
}