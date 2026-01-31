import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('☢️ NUCLEAR AUTH RESET INITIATED ☢️');
    console.log('Limpiando usuarios conflictivos...');

    // 1. ELIMINAR USUARIOS ANTERIORES PARA EVITAR DUPLICADOS O CORRUPCIÓN
    // Borramos por email para no borrar todo si hay datos reales, pero aseguramos estos 4
    const emailsToDelete = [
        'admin@autoplanea.cr',
        'admin@aulaplanea.com',
        'maria@mep.go.cr',
        'juan@estudiante.cr',
        'ana@mamá.cr'
    ];

    await prisma.user.deleteMany({
        where: { email: { in: emailsToDelete } }
    });

    console.log('✅ Usuarios limpiados.');

    // 2. DEFINIR LA CONTRASEÑA MAESTRA
    const MASTER_PASS = 'admin123';
    console.log(`🔐 Generando hash para contraseña maestra: '${MASTER_PASS}'`);
    const passwordHash = await bcrypt.hash(MASTER_PASS, 10);

    // 3. RE-CREAR SUPER ADMIN (La cuenta que UD necesita)
    console.log('👤 Creando SUPER ADMIN...');
    await prisma.user.create({
        data: {
            email: 'admin@autoplanea.cr', // VOLVEMOS AL ORIGINAL .CR
            name: 'Lic. Max Salazar (Super Admin)',
            role: 'SUPER_ADMIN',
            passwordHash: passwordHash,
            plan: 'institucional',
            status: 'activo'
        }
    });

    // 4. RE-CREAR MOCK DATA (Para pruebas)
    console.log('👥 Creando Mock Data...');

    // Docente
    const mj = await prisma.user.create({
        data: {
            email: 'maria@mep.go.cr',
            name: 'María Pérez (Docente)',
            role: 'DOCENTE',
            passwordHash: passwordHash,
            plan: 'pro',
            status: 'activo'
        }
    });

    // Estudiante
    const juan = await prisma.user.create({
        data: {
            email: 'juan@estudiante.cr',
            name: 'Juanito (Estudiante)',
            role: 'ESTUDIANTE',
            passwordHash: passwordHash,
            plan: 'demo',
            status: 'activo'
        }
    });

    // Familia
    await prisma.user.create({
        data: {
            email: 'ana@mamá.cr',
            name: 'Ana (Mamá)',
            role: 'FAMILIA',
            passwordHash: passwordHash,
            plan: 'demo',
            status: 'activo'
        }
    });

    console.log('---------------------------------------------------');
    console.log('✅ REINICIO COMPLETO. CREDENCIALES UNIFICADAS:');
    console.log('---------------------------------------------------');
    console.log('🔑 PASSWORD PARA TODOS:  admin123');
    console.log('---------------------------------------------------');
    console.log('1. SUPER ADMIN:   admin@autoplanea.cr');
    console.log('2. DOCENTE:       maria@mep.go.cr');
    console.log('3. ESTUDIANTE:    juan@estudiante.cr');
    console.log('---------------------------------------------------');
}

main()
    .catch(e => {
        console.error('❌ FATAL ERROR:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
