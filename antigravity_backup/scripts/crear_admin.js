import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🚨 EMERGENCY ADMIN RESTORE INITIATED 🚨');

    // Email solicitado en la instrucción de rescate
    const email = 'admin@aulaplanea.com';
    const password = 'admin123';

    console.log(`🔑 Hashing password '${password}'...`);
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(`👤 Upserting Super Admin: ${email}...`);

    // Usamos UPSERT para crear si no existe, o actualizar si ya existe (reset password)
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            passwordHash,
            role: 'SUPER_ADMIN', // Garantizar rol V34
            status: 'activo',
            name: 'Lic. Max Salazar'
        },
        create: {
            email,
            name: 'Lic. Max Salazar',
            role: 'SUPER_ADMIN',
            passwordHash,
            plan: 'institucional',
            status: 'activo'
        },
    });

    console.log('------------------------------------------------');
    console.log('✅ SUCCESS: CREDENTIALS RESTORED');
    console.log('------------------------------------------------');
    console.log(`📧 User:  ${user.email}`);
    console.log(`🔑 Pass:  ${password}`);
    console.log('------------------------------------------------');
    console.log('Intente iniciar sesión ahora inmediatamente.');
}

main()
    .catch(e => {
        console.error('❌ FATAL ERROR:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
