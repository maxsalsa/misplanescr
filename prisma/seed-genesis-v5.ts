import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 SCRIPT GENESIS V5: REALISTIC DATA INJECTION');

    // Hash genérico para pruebas
    const passwordHash = await bcrypt.hash('123456', 10);
    const godHash = await bcrypt.hash('Antigravity2026!', 10);

    const users = [
        {
            email: 'max.salazar@antigravity.core',
            apellido1: 'Salazar', apellido2: 'Sánchez', nombre1: 'Max', nombre2: null,
            honorific: 'Prof.', role: 'SUPER_ADMIN', status: 'OWNER', slots: ['ALL_ACCESS'],
            hash: godHash
        },
        {
            email: 'sofia.araya@mep.go.cr',
            apellido1: 'Araya', apellido2: 'Gómez', nombre1: 'Sofía', nombre2: 'Elena',
            honorific: 'Ing.', role: 'DOCENTE', status: 'ACTIVE', slots: ['Soporte TI', 'Ciberseguridad'],
            hash: passwordHash
        },
        {
            email: 'carlos.bantes@mep.go.cr',
            apellido1: 'Bantes', apellido2: 'Molina', nombre1: 'Carlos', nombre2: null,
            honorific: 'Lic.', role: 'DOCENTE', status: 'ACTIVE', slots: ['Contabilidad'],
            hash: passwordHash
        },
        {
            email: 'ana.castillo@antigravity.core',
            apellido1: 'Castillo', apellido2: 'Rojas', nombre1: 'Ana', nombre2: 'María',
            honorific: 'Licda.', role: 'DIRECTOR', status: 'ACTIVE', slots: [],
            hash: passwordHash
        },
        {
            email: 'roberto.jimenez@mep.go.cr',
            apellido1: 'Jiménez', apellido2: 'Quesada', nombre1: 'Roberto', nombre2: null,
            honorific: 'MSc.', role: 'DOCENTE', status: 'EXPIRED', slots: ['Desarrollo Web'],
            hash: passwordHash
        },
        {
            email: 'esteban.zuniga@mep.go.cr',
            apellido1: 'Zúñiga', apellido2: 'Fallas', nombre1: 'Esteban', nombre2: 'José',
            honorific: 'Prof.', role: 'DOCENTE', status: 'TRIAL', slots: ['Dibujo Técnico'],
            hash: passwordHash
        }
    ];

    console.log('🧪 Inyectando Escenarios de Usuario...');

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {
                nombre1: u.nombre1, nombre2: u.nombre2,
                apellido1: u.apellido1, apellido2: u.apellido2,
                honorific: u.honorific,
                role: u.role as any,
                subscriptionStatus: u.status,
                specialtySlots: u.slots,
                passwordHash: u.hash
            },
            create: {
                email: u.email,
                nombre1: u.nombre1, nombre2: u.nombre2,
                apellido1: u.apellido1, apellido2: u.apellido2,
                honorific: u.honorific,
                role: u.role as any,
                subscriptionStatus: u.status,
                specialtySlots: u.slots,
                passwordHash: u.hash
            }
        });
        console.log(`   -> ${u.apellido1} ${u.nombre1} [${u.status}]`);
    }

    console.log('✅ INYECCIÓN FINALIZADA. READY FOR TESTING.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
