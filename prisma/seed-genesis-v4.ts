import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 SCRIPT GENESIS V4: CORRECCIÓN DE NOMBRE MEP (SPLIT FIELDS)');

    const email = 'max.salazar@antigravity.core';
    const passwordRaw = 'Antigravity2026!';
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    // Upsert Super Admin with Split Names
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            nombre1: 'Max',
            nombre2: null,
            apellido1: 'Salazar',
            apellido2: 'Sánchez',
            honorific: 'Prof.',
            passwordHash: passwordHash,
            role: 'SUPER_ADMIN'
        },
        create: {
            email,
            nombre1: 'Max',
            nombre2: null,
            apellido1: 'Salazar',
            apellido2: 'Sánchez',
            honorific: 'Prof.',
            role: 'SUPER_ADMIN',
            passwordHash: passwordHash,
        }
    });

    console.log(`✅ USUARIO MEP CORREGIDO: ${user.honorific} ${user.apellido1} ${user.apellido2} ${user.nombre1}`);
    console.log(`   Rol: ${user.role}`);
    console.log(`   Email: ${user.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
