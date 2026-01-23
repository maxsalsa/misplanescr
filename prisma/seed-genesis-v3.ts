import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 SCRIPT GENESIS V3: CORRECCIÓN DE IDENTIDAD Y TÍTULOS');

    const email = 'max.salazar@antigravity.core';
    const passwordRaw = 'Antigravity2026!';
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    // Upsert Super Admin with Honorific
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            nombre1: 'Max',
            apellido1: 'Salazar',
            apellido2: 'Sánchez',
            honorific: 'Prof.', // Título Oficial
            passwordHash: passwordHash,
            role: 'SUPER_ADMIN'
        },
        create: {
            email,
            nombre1: 'Max',
            apellido1: 'Salazar',
            apellido2: 'Sánchez',
            honorific: 'Prof.',
            role: 'SUPER_ADMIN',
            passwordHash: passwordHash,
            // Create a fake institution for the admin context if needed, or leave null.
            // For now, let's leave it null or link to a "System" institution if one existed.
        }
    });

    console.log(`✅ USUARIO CORREGIDO: ${user.honorific} ${user.nombre1} ${user.apellido1}`);
    console.log(`   Rol: ${user.role}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${passwordRaw}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
