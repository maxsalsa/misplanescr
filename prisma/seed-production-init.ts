import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 SCRIPT DE INICIO DE PRODUCCIÓN: RESET TOTAL & SEMILLA MAESTRA');

    // 1. Limpieza Total
    console.log('🧹 Limpiando tablas de usuarios...');
    await prisma.gradeEntry.deleteMany({});
    await prisma.gradeBook.deleteMany({});
    await prisma.group.deleteMany({});
    await prisma.user.deleteMany({});

    // 2. Hash Oficial
    const passwordRaw = 'Antigravity2026!';
    const validHash = await bcrypt.hash(passwordRaw, 10);

    console.log(`🔐 Hash generado para '${passwordRaw}'`);

    const users = [
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'max.salazar@antigravity.core',
            apellido1: 'Salazar', apellido2: 'Sánchez', nombre1: 'Max', nombre2: null,
            honorific: 'Prof.', role: 'SUPER_ADMIN', status: 'OWNER', slots: ['ALL_ACCESS']
        },
        {
            id: '223e4567-e89b-12d3-a456-426614174001',
            email: 'sofia.araya@prueba.cr',
            apellido1: 'Araya', apellido2: 'Gómez', nombre1: 'Sofía', nombre2: 'Elena',
            honorific: 'Ing.', role: 'DOCENTE', status: 'ACTIVE', slots: ['Soporte TI', 'Ciberseguridad']
        },
        {
            id: '333e4567-e89b-12d3-a456-426614174002',
            email: 'roberto.jimenez@prueba.cr',
            apellido1: 'Jiménez', apellido2: 'Quesada', nombre1: 'Roberto', nombre2: null,
            honorific: 'Lic.', role: 'DOCENTE', status: 'EXPIRED', slots: ['Desarrollo Web']
        },
        {
            id: '444e4567-e89b-12d3-a456-426614174003',
            email: 'ana.castillo@antigravity.core',
            apellido1: 'Castillo', apellido2: 'Rojas', nombre1: 'Ana', nombre2: 'María',
            honorific: 'Licda.', role: 'ADMIN_DELEGADO', status: 'ACTIVE', slots: []
        }
    ];

    console.log('🧪 Inyectando Usuarios Maestros...');

    for (const u of users) {
        await prisma.user.create({
            data: {
                id: u.id,
                email: u.email,
                nombre1: u.nombre1, nombre2: u.nombre2,
                apellido1: u.apellido1, apellido2: u.apellido2,
                honorific: u.honorific,
                role: u.role as UserRole, // Explicit cast to Enum
                subscriptionStatus: u.status,
                specialtySlots: u.slots,
                passwordHash: validHash
            }
        });
        console.log(`   -> ${u.honorific} ${u.apellido1} ${u.nombre1} [${u.role}]`);
    }

    console.log('✅ BASE DE DATOS PREPARADA PARA PRODUCCIÓN (LOGIN LISTO)');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
