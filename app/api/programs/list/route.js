import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const programs = await prisma.mep_programs_core.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        filename: true,
        subject: true,
        structure_json: true,
        last_deep_scan: true,
        // No traemos raw_text para no saturar la red, solo si es necesario
      }
    });
    return NextResponse.json({ success: true, data: programs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
