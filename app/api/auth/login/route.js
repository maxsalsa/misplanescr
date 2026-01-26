import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// Singleton rápido para evitar colapsos en login
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "antigravity-secret-key-mep-2026");

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log(`🔵 LOGIN INTENT: ${email}`);

    // 1. Buscar Usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: false, error: "Usuario no encontrado" }, { status: 401 });

    // 2. Validar Password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ success: false, error: "Contraseña incorrecta" }, { status: 401 });

    // 3. Crear Token
    const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(SECRET);

    // 4. Responder Exitosamente
    const response = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
    response.cookies.set("auth-token", token, { httpOnly: true, path: "/", sameSite: "lax" });
    
    return response;

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return NextResponse.json({ success: false, error: "Error del Servidor: " + error.message }, { status: 500 });
  }
}
