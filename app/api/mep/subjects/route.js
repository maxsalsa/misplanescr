import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nivel = searchParams.get("nivel"); // Ej: "Décimo"

    console.log(`📡 Buscando materias para: ${nivel}`);

    // Consultamos la DB real (donde están los 187 PDFs)
    const materias = await prisma.syllabus.findMany({
      where: { 
        level: { contains: nivel || "" } // Búsqueda flexible
      },
      select: { 
        subject: true, 
        modalidad: true 
      },
      distinct: ["subject"] // Evitar duplicados
    });

    return NextResponse.json(materias);
  } catch (error) {
    console.error("❌ Error API Materias:", error);
    return NextResponse.json([], { status: 500 });
  }
}