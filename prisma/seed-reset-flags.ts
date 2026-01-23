import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 SCRIPT DE INICIO DE PRODUCCIÓN V2: BANDERAS DE SEGURIDAD');

    // Hash Oficial
    const passwordRaw = 'Antigravity2026!';
    const validHash = await bcrypt.hash(passwordRaw, 10);

    // Solo actualizamos al owner para testing del flujo de passwords
    await prisma.user.updateMany({
        where: { email: 'max.salazar@antigravity.core' },
        data: {
            forcePasswordChange: true, // Forzar cambio
            hasSeenWelcome: false      // Mostrar toast de nuevo
        }
    });

    console.log(`✅ Flags reseteadas para SUPER ADMIN. Login pedirá cambio de contraseña.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
