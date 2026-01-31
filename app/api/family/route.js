import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ message: "API en mantenimiento" });
}
export async function POST() {
  return NextResponse.json({ success: true });
}