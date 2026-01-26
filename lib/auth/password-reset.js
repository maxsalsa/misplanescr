
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Simulation of Email Service for OTP
const sendRecoveryEmail = async (email, code) => {
    console.log(`📧 [EMAIL-SEC] To: ${email} | Subject: 🆘 Código de Recuperación`);
    console.log(`   Body: "Su código temporal es: [ ${code.split('').join(' ')} ] (Expira en 15m)"`);
};

export async function requestPasswordReset(email) {
    console.log(`🛡️ [RESET] Solicitud para: ${email}`);

    // 1. Silent Validation (No reveal user existence)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log(`   ⛔ Email no encontrado. Simulando éxito para evitar enumeración.`);
        return { success: true }; // Fake success
    }

    // 2. Generar OTP (6 dígitos)
    // Ej: '489205'
    const otp = crypto.randomInt(100000, 999999).toString();
    const tokenHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    // 3. Guardar Token
    await prisma.passwordResetToken.create({
        data: {
            email,
            tokenHash,
            expiresAt
        }
    });

    // 4. Enviar Email
    await sendRecoveryEmail(email, otp);

    return { success: true };
}

export async function verifyResetToken(email, inputCode) {
    console.log(`🔓 [VERIFY] Validando código para: ${email}`);

    // 1. Buscar token vivo
    const record = await prisma.passwordResetToken.findFirst({
        where: {
            email,
            expiresAt: { gt: new Date() }
        },
        orderBy: { createdAt: 'desc' } // Get latest
    });

    if (!record) {
        throw new Error("El código ha expirado o no existe.");
    }

    // 2. Verificar Hash
    const isValid = await bcrypt.compare(inputCode, record.tokenHash);

    if (!isValid) {
        throw new Error("Código incorrecto.");
    }

    return { success: true, allowPasswordChange: true };
}
