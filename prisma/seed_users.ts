
import { PrismaClient, UserRole, AccessLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('💳 INICIANDO INYECCIÓN DE USUARIOS & LICENCIAS (EL MERCADO)...')

    // 1. INSTITUCIÓN BASE (Para los usuarios)
    const inst = await prisma.institution.upsert({
        where: { code: 'SAAS-MARKET-DEMO' },
        update: {},
        create: {
            name: 'Plataforma SaaS Demo',
            code: 'SAAS-MARKET-DEMO',
            subscriptionPlan: 'UNLIMITED',
        }
    })

    // ===============================================================
    // 1. EL JEFE (SUPER ADMIN)
    // ===============================================================
    console.log('👑 Creando: Max Admin (El Jefe)...')
    const superAdmin = await prisma.user.upsert({
        where: { email: 'max.admin@autoplanea.cr' },
        update: { role: UserRole.SUPER_ADMIN },
        create: {
            name: 'Max Admin',
            email: 'max.admin@autoplanea.cr',
            role: UserRole.SUPER_ADMIN,
            institutionId: inst.id,
        }
    })

    // Super Admin Subscription (Forever)
    await prisma.subscription.upsert({
        where: { userId: superAdmin.id },
        update: { accessLevel: AccessLevel.FULL_ACCESS },
        create: {
            userId: superAdmin.id,
            accessLevel: AccessLevel.FULL_ACCESS,
            expirationDate: new Date('2030-01-01'), // Long term
            isActive: true
        }
    })

    // ===============================================================
    // 2. CLIENTE A: "EL MATEMÁTICO" (Académico)
    // ===============================================================
    console.log('📐 Creando: Cliente A (Matemáticas)...')
    const mathematical = await prisma.user.upsert({
        where: { email: 'cliente.mate@demo.cr' },
        update: { role: UserRole.SUBSCRIBER },
        create: {
            name: 'Profe Geometría',
            email: 'cliente.mate@demo.cr',
            role: UserRole.SUBSCRIBER,
            institutionId: inst.id,
        }
    })

    await prisma.subscription.upsert({
        where: { userId: mathematical.id },
        update: { accessLevel: AccessLevel.ACADEMIC_MATH_ONLY },
        create: {
            userId: mathematical.id,
            accessLevel: AccessLevel.ACADEMIC_MATH_ONLY,
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year
            isActive: true
        }
    })

    // ===============================================================
    // 3. CLIENTE B: "EL INGENIERO" (Técnico)
    // ===============================================================
    console.log('💻 Creando: Cliente B (Técnico Software)...')
    const engineer = await prisma.user.upsert({
        where: { email: 'cliente.soft@demo.cr' },
        update: { role: UserRole.SUBSCRIBER },
        create: {
            name: 'Ing. Software',
            email: 'cliente.soft@demo.cr',
            role: UserRole.SUBSCRIBER,
            institutionId: inst.id,
        }
    })

    await prisma.subscription.upsert({
        where: { userId: engineer.id },
        update: { accessLevel: AccessLevel.TECHNICAL_ONLY },
        create: {
            userId: engineer.id,
            accessLevel: AccessLevel.TECHNICAL_ONLY,
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            isActive: true
        }
    })

    // ===============================================================
    // 4. CLIENTE C: "LA ARTISTA" (Complementarias)
    // ===============================================================
    console.log('🎨 Creando: Cliente C (Artes)...')
    const artist = await prisma.user.upsert({
        where: { email: 'cliente.arte@demo.cr' },
        update: { role: UserRole.SUBSCRIBER },
        create: {
            name: 'Teacher Música',
            email: 'cliente.arte@demo.cr',
            role: UserRole.SUBSCRIBER,
            institutionId: inst.id,
        }
    })

    await prisma.subscription.upsert({
        where: { userId: artist.id },
        update: { accessLevel: AccessLevel.ARTS_ONLY },
        create: {
            userId: artist.id,
            accessLevel: AccessLevel.ARTS_ONLY,
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            isActive: true
        }
    })

    console.log('✅ ACTORES DEL MERCADO CREADOS. LISTO PARA QA DE PERMISOS.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
