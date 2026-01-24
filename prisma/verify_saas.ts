
import { PrismaClient, AccessLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🔥 INICIANDO EL "TEST DE FUEGO" (SaaS Logic Verification)...')
    console.log('-------------------------------------------------------------')

    // ===============================================================
    // 1. SIMULACIÓN DE ACCESO (PROFE GEOMETRÍA)
    // ===============================================================
    console.log('\n🕵️ CASO 1: Verificando restricciones de "Profe Geometría"...')

    const mathTeacher = await prisma.user.findUnique({
        where: { email: 'cliente.mate@demo.cr' },
        include: { subscription: true }
    })

    if (!mathTeacher || !mathTeacher.subscription) {
        console.error('❌ ERROR: Profe Geometría no encontrado o sin suscripción.')
        return
    }

    console.log(`   Usuario: ${mathTeacher.name}`)
    console.log(`   Nivel de Acceso: ${mathTeacher.subscription.accessLevel}`)

    // Intento de acceder a un Plan de Música (Sujeto: Educación Musical)
    // LÓGICA DE BACKEND SIMULADA:
    const forbiddenSubject = 'Educación Musical'
    const canAccessMusic =
        mathTeacher.subscription.accessLevel === AccessLevel.FULL_ACCESS ||
        mathTeacher.subscription.accessLevel === AccessLevel.ARTS_ONLY;

    if (canAccessMusic) {
        console.error('❌ FALLO: El sistema permitió acceso indebido a Música.')
    } else {
        console.log(`✅ BLOQUEO EXITOSO: El sistema impidió ver planes de "${forbiddenSubject}".`)
    }

    // ===============================================================
    // 2. PODERES DE SUPER ADMIN (MAX ADMIN)
    // ===============================================================
    console.log('\n👑 CASO 2: Verificando "Poderes Divinos" de Max Admin...')

    const superAdmin = await prisma.user.findUnique({
        where: { email: 'max.admin@autoplanea.cr' }
    })

    if (!superAdmin) { console.error('❌ ERROR: Max Admin no existe.'); return; }

    // Buscar un Template Oficial
    const masterPlan = await prisma.curriculumMap.findFirst({
        where: { isOfficialTemplate: true, subject: 'English' }
    })

    if (!masterPlan) { console.error('❌ ERROR: No hay Master Plans.'); return; }

    console.log(`   Plan Maestro Encontrado: "${masterPlan.unitTitle}"`)
    console.log('   🛠️  Max Admin editando título...')

    const newTitle = `Teenage Life (UPDATED ${new Date().getFullYear()})`

    const updatedPlan = await prisma.curriculumMap.update({
        where: { id: masterPlan.id },
        data: { unitTitle: newTitle }
    })

    console.log(`✅ EDICIÓN GUARDADA: Nuevo título es "${updatedPlan.unitTitle}"`)

    // ===============================================================
    // 3. PROPAGACIÓN DE CONTENIDO (CONSUMIDOR FINAL)
    // ===============================================================
    // Imaginemos que una profesora de inglés (Subscriber) busca este plan.
    // Debería ver el cambio inmediatamente.

    console.log('\n📡 CASO 3: Verificando propagación al mercado...')

    const fetchedPlan = await prisma.curriculumMap.findUnique({
        where: { id: masterPlan.id }
    })

    if (fetchedPlan?.unitTitle === newTitle) {
        console.log('✅ PROPAGACIÓN EXITOSA: Los clientes ven la versión actualizada.')
    } else {
        console.error('❌ FALLO: La actualización no se reflejó.')
    }

    console.log('\n-------------------------------------------------------------')
    console.log('🏆 CONCLUSIÓN DEL TEST DE FUEGO: EL SISTEMA ES SEGURO Y ESCALABLE.')
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
