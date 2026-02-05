import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = new URL(req.url).searchParams.get("userId");
  return NextResponse.json(await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }));
}

export async function PUT(req) { // Marcar leída
  const { id } = await req.json();
  await prisma.notification.update({ where: { id }, data: { read: true } });
  return NextResponse.json({ success: true });
}