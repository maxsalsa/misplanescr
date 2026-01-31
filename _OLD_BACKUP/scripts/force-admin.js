import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('⚡ V48 PROTOCOL: FORCE ADMIN INJECTION STARTING...');

    // Configuración V48
    const TARGET_EMAIL = 'admin@aulaplanea.com';
    const TARGET_PASS = 'MaxAdmin2026!';
    const TARGET_NAME = 'Lic. Max Salazar';

    console.log(`🔐 Hashing password...`);
    // Usamos salt rounds estándar de 10
    const passwordHash = await bcrypt.hash(TARGET_PASS, 10);

    console.log(`👤 Upserting User: ${TARGET_EMAIL}`);
    console.log(`   (Password: ${TARGET_PASS})`);

    const user = await prisma.user.upsert({
        where: { email: TARGET_EMAIL },
        update: {
            passwordHash,
            name: TARGET_NAME,
            role: 'SUPER_ADMIN',
            status: 'activo', // 'activo' según schema V34
            plan: 'institucional'
        },
        create: {
            email: TARGET_EMAIL,
            passwordHash,
            name: TARGET_NAME,
            role: 'SUPER_ADMIN',
            status: 'activo',
            plan: 'institucional'
        },
    });

    console.log('------------------------------------------------');
    console.log('✅ V48 INJECTION COMPLETE.');
    console.log('------------------------------------------------');
    console.log(`📧 Email: ${user.email}`);
    console.log(`🆔 ID:    ${user.id}`);
    console.log(`🛡️ Role:  ${user.role}`);
    console.log('------------------------------------------------');
}

main()
    .catch(e => {
        console.error('❌ FATAL ERROR IN V48 SCRIPT:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
