import crypto from "crypto";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Simulation of Email Service (In production, replace with Resend/SendGrid)
const sendEmail = async (data) => {
  console.log("\n📧 [SISTEMA DE CORREO] ENVIANDO EMAIL TRANSACCIONAL...");
  console.log(`   To: ${data.to}`);
  console.log(`   Subject: 🔐 Activación de Cuenta - misplanescr.com`);
  console.log(
    `   Body Preview: "Hola Prof. ${data.vars.name}, su clave temporal es: [ ${data.vars.tempPass} ]"`,
  );
  console.log(`   Status: [SENT OK]`);
  return true;
};

export async function createPaidUser(datosDocente) {
  console.log(
    `\n⚙️ [PROVISIONING] Creando usuario pagado: ${datosDocente.email}...`,
  );

  try {
    // 1. Generar Clave Temporal Segura (8 chars + Special)
    // Ej: 'N7x#m9Pk'
    const rawTempPassword =
      crypto
        .randomBytes(6)
        .toString("base64")
        .slice(0, 8)
        .replace(/\+/g, "X")
        .replace(/\//g, "Y") + "#!";

    // 2. Hash para DB
    const passwordHash = await bcrypt.hash(rawTempPassword, 10);

    // 3. Insertar en DB
    const newUser = await prisma.user.create({
      data: {
        nombre1: datosDocente.nombre1,
        nombre2: datosDocente.nombre2,
        apellido1: datosDocente.apellido1,
        apellido2: datosDocente.apellido2,
        email: datosDocente.email,
        honorific: datosDocente.honorific || "Prof.",
        role: "DOCENTE",
        subscriptionStatus: "ACTIVE", // Pagado por SINPE
        specialtySlots: datosDocente.specialty_slots || [],
        passwordHash: passwordHash,
        forcePasswordChange: true, // 🔒 OBLIGATORIO
        hasSeenWelcome: false,
      },
    });

    // 4. Notificar al Docente
    await sendEmail({
      to: datosDocente.email,
      template: "WELCOME_SINPE_PAID",
      vars: {
        name: datosDocente.apellido1,
        tempPass: rawTempPassword,
        modules: datosDocente.specialty_slots,
      },
    });

    console.log(`✅ USUARIO CREADO: ${newUser.id}`);
    return { success: true, tempPassword: rawTempPassword, userId: newUser.id };
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return { success: false, error };
  }
}
