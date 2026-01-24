
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🎬 INICIANDO GENERADOR DE ESCENARIOS MARKETING (DEMO DAY)...')

    // 1. INSTITUCIÓN MODELO
    const inst = await prisma.institution.upsert({
        where: { code: 'MEP-MARKETING-DEMO' },
        update: {},
        create: {
            name: 'Centro Educativo Modelo del Futuro',
            code: 'MEP-MARKETING-DEMO',
            subscriptionPlan: 'DIAMOND',
        }
    })

    // 2. PROFESORES ESTRELLA
    const profePrimaria = await prisma.user.create({
        data: { name: 'Niña María (4to)', email: 'maria.primaria@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })
    const profeEspanol = await prisma.user.create({
        data: { name: 'Prof. Gabo (Español)', email: 'gabo.lit@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })
    const profeTecn = await prisma.user.create({
        data: { name: 'Ing. Lucas (Contabilidad)', email: 'lucas.conta@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })
    const profeMate = await prisma.user.create({
        data: { name: 'Prof. Newton (Mate)', email: 'isaac.mate@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })

    // ===============================================================
    // ESCENARIO 1: PRIMARIA (Estudios Sociales 4°) - INCLUSIÓN
    // ===============================================================
    console.log('🏛️ Creando Escenario Primaria...')
    const group4 = await prisma.group.create({
        data: { name: '4-2', level: '4to', institutionId: inst.id, teacherId: profePrimaria.id }
    })

    // Estudiante con Adecuación
    const luisAdecuacion = await prisma.user.create({
        data: { name: 'Luis (Adecuación)', email: 'luis.4@est.cr', role: UserRole.STUDENT, institutionId: inst.id }
    })
    // Resto del grupo
    await prisma.user.create({ data: { name: 'Camila', email: 'camila.4@est.cr', role: UserRole.STUDENT, institutionId: inst.id, enrollments: { create: { groupId: group4.id } } } })
    await prisma.enrollment.create({ data: { studentId: luisAdecuacion.id, groupId: group4.id } })

    // Settings
    const setPrim = await prisma.evaluationSettings.create({
        data: { groupId: group4.id, components: { create: [{ name: 'Cotidiano', percentage: 60 }] } },
        include: { components: true }
    })

    // Actividad
    await prisma.evaluationActivity.create({
        data: {
            title: 'Collage: Historia de mi Cantón',
            code: 'SOC-04',
            date: new Date(),
            groupId: group4.id,
            componentId: setPrim.components[0].id,
            rubric: {
                create: {
                    criteria: {
                        create: [{ description: 'Comparación Ayer/Hoy', maxPoints: 3 }]
                    }
                }
            },
            // Luis tiene adecuación en la entrega, pero la actividad es la misma. 
            // Si quisiéramos una actividad distinta para él, usaríamos assignedStudents.
            // Aquí simulamos nota en el sistema.
        }
    })

    // ===============================================================
    // ESCENARIO 2: SECUNDARIA (Español 10°) - ALTA DOTACIÓN
    // ===============================================================
    console.log('📖 Creando Escenario Español (Alta Dotación)...')
    const group10 = await prisma.group.create({
        data: { name: '10-1 Académico', level: '10mo', institutionId: inst.id, teacherId: profeEspanol.id }
    })

    const anaAlta = await prisma.user.create({
        data: { name: 'Ana (Alta Dotación)', email: 'ana.10@est.cr', role: UserRole.STUDENT, institutionId: inst.id }
    })
    // Matricular
    await prisma.enrollment.create({ data: { studentId: anaAlta.id, groupId: group10.id } })

    const setEsp = await prisma.evaluationSettings.create({
        data: { groupId: group10.id, components: { create: [{ name: 'Tareas', percentage: 20 }] } },
        include: { components: true }
    })

    // Tarea General
    await prisma.evaluationActivity.create({
        data: {
            title: 'Ensayo Crítico: Realismo Mágico',
            groupId: group10.id,
            componentId: setEsp.components[0].id,
            rubric: { create: { criteria: { create: [{ description: 'Cohesión Textual', maxPoints: 3, level3Desc: 'Usa conectores variados sin repetición.' }] } } }
        }
    })

    // Reto Diferenciado SOLO para Ana
    await prisma.evaluationActivity.create({
        data: {
            title: 'RETO: Final Alternativo (Estilo Gabo)',
            groupId: group10.id,
            componentId: setEsp.components[0].id,
            assignedStudents: { connect: { id: anaAlta.id } }, // <--- LA MAGIA
            rubric: { create: { criteria: { create: [{ description: 'Mímesis Estilística', maxPoints: 3, level3Desc: 'Replica la sintaxis y el tono del autor original.' }] } } }
        }
    })

    // ===============================================================
    // ESCENARIO 3: TÉCNICA (Contabilidad 11°) - EVIDENCIA DIGITAL
    // ===============================================================
    console.log('💹 Creando Escenario Técnico...')
    const groupConta = await prisma.group.create({
        data: { name: '11-B Conta', level: '11mo', specialty: 'Contabilidad', institutionId: inst.id, teacherId: profeTecn.id }
    })
    const setConta = await prisma.evaluationSettings.create({
        data: { groupId: groupConta.id, hasProject: true, components: { create: [{ name: 'Proyecto', percentage: 30 }] } },
        include: { components: true }
    })

    // ===============================================================
    // ESCENARIO 4: MATEMÁTICAS 8° - ALERTAS UPRE
    // ===============================================================
    console.log('🚨 Creando Escenario Alerta UPRE...')
    const group8 = await prisma.group.create({
        data: { name: '8-5 Matemáticas', level: '8vo', institutionId: inst.id, teacherId: profeMate.id }
    })

    const pedroAlerta = await prisma.user.create({
        data: { name: 'Pedro (Riesgo)', email: 'pedro.8@est.cr', role: UserRole.STUDENT, institutionId: inst.id }
    })
    await prisma.enrollment.create({ data: { studentId: pedroAlerta.id, groupId: group8.id } })

    // Generar Alerta
    await prisma.alertUPRE.create({
        data: {
            studentId: pedroAlerta.id,
            courseName: 'Matemáticas 8-5',
            reason: 'Rendimiento Crítico (Nota 40)',
            severity: 'ALTA',
            status: 'OPEN'
        }
    })

    // Acción Correctiva: Práctica Asignada SOLO a Pedro
    await prisma.evaluationActivity.create({
        data: {
            title: 'PRÁCTICA DE REFUERZO: Ecuaciones',
            groupId: group8.id,
            assignedStudents: { connect: { id: pedroAlerta.id } }, // <--- REMEDIAL PERSONALIZADO
        }
    })

    console.log('✅ ESCENARIOS DE MARKETING CARGADOS. LISTO PARA DEMO.')
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
