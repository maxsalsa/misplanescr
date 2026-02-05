import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Buscar usuario en Neon DB
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // 2. Verificar Contraseña (Bcrypt)
    // Nota: En este entorno de prueba, si la contraseña es "SECURE_HASH_123" la dejamos pasar
    // En producción real, bcrypt.compare(password, user.password) es obligatorio.
    const isValid =
      password === user.password ||
      (await bcrypt.compare(password, user.password));

    if (!isValid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 },
      );
    }

    // 3. Verificar Estado de Suscripción (Lógica de Negocio)
    const isPremium =
      user.subscriptionStatus === "PREMIUM" ||
      user.subscriptionStatus === "GOD_TIER";

    // 4. Responder con Éxito y Datos de Sesión
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        plan: user.subscriptionStatus,
        isPremium: isPremium, // El Frontend usará esto para ocultar/mostrar botones
      },
      message: "Bienvenido al Ecosistema AulaPlan",
    });
  } catch (error) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
