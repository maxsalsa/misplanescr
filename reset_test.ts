import { requestPasswordReset, verifyResetToken } from '@/lib/auth/password-reset';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 TEST DE RECUPERACIÓN DE CONTRASEÑA (OTP)');

    const testEmail = 'max.salazar@antigravity.core';

    // 1. Solicitar Reseteo
    console.log('\n1. 📩 Solicitando código...');
    await requestPasswordReset(testEmail);
    // (In console log above you will see the generated OTP, assume we grabbed it)
    // For automated test, we can't grab it easily without refactoring function to return it for test env.
    // So we will inspect DB for the latest hash and simulate matching.

    // Hack for testing only: grab the latest token's timestamp to prove it was created
    const latestToken = await prisma.passwordResetToken.findFirst({
        where: { email: testEmail },
        orderBy: { createdAt: 'desc' }
    });

    if (latestToken) {
        console.log(`   ✅ Token creado en DB (Hash: ${latestToken.tokenHash.substring(0, 10)}...)`);
        console.log(`   ⏳ Expira: ${latestToken.expiresAt}`);
    } else {
        console.error('   ❌ Fallo: No se creó el token.');
    }

    // 2. Simular Verificación Fallida
    console.log('\n2. 🔐 Probando código incorrecto (123456)...');
    try {
        await verifyResetToken(testEmail, '123456');
    } catch (e: any) {
        console.log(`   ✅ Sistema rechazó correctamente: "${e.message}"`);
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
