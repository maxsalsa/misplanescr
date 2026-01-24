
import { PrismaClient, UserRole, ModalityTag } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🔵 INICIANDO MEGA-SEED (ECOSISTEMA MEP COMPLETO)...')

    // 1. INSTITUCIÓN
    const inst = await prisma.institution.upsert({
        where: { code: 'MEP-MEGA-DEMO' },
        update: {},
        create: {
            name: 'Liceo Profesional de Innovación',
            code: 'MEP-MEGA-DEMO',
            subscriptionPlan: 'ENTERPRISE',
        }
    })

    // 2. PROFESORES
    const profeMate = await prisma.user.upsert({
        where: { email: 'mate8@demo.cr' },
        update: {},
        create: { name: 'Prof. Euclídes', email: 'mate8@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })

    const profeSoft = await prisma.user.upsert({
        where: { email: 'dev11@demo.cr' },
        update: {},
        create: { name: 'Ing. Turing', email: 'dev11@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })

    const profeGuia = await prisma.user.upsert({
        where: { email: 'guia@demo.cr' },
        update: {},
        create: { name: 'Prof. Orientadora', email: 'guia@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })

    // ===============================================================
    // ESCENARIO A: MATEMÁTICAS 8-1 (MOTOR DE PRUEBAS)
    // ===============================================================
    console.log('📐 Generando Escenario A: Examen de Matemáticas...')

    const grupoMate = await prisma.group.create({
        data: {
            name: '8-1 Matemáticas',
            institutionId: inst.id,
            teacherId: profeMate.id,
            modalityTag: ModalityTag.ACADEMICO
        }
    })

    // Curriculum Linkage
    const currMate = await prisma.curriculumMap.create({
        data: {
            mncCode: 'MAT-8-GEO',
            subject: 'Matemáticas',
            level: '8vo',
            unitTitle: 'Geometría Euclídea',
        }
    })

    const outcomeGeo = await prisma.learningOutcome.create({
        data: { curriculumId: currMate.id, description: 'Analizar propiedades de figuras planas.' }
    })

    // Indicators
    const indTriangulos = await prisma.indicator.create({
        data: { outcomeId: outcomeGeo.id, description: 'Clasificar triángulos según lados y ángulos.' }
    })
    const indPitagoras = await prisma.indicator.create({
        data: { outcomeId: outcomeGeo.id, description: 'Aplicar Teorema de Pitágoras en problemas de contexto.' }
    })

    // Settings
    const setMate = await prisma.evaluationSettings.create({
        data: {
            groupId: grupoMate.id,
            components: { create: [{ name: 'Pruebas', percentage: 35 }, { name: 'Cotidiano', percentage: 20 }] }
        },
        include: { components: true }
    })

    // Actividades Previas
    await prisma.evaluationActivity.create({
        data: {
            title: 'Cotidiano: Clasificación de Triángulos',
            groupId: grupoMate.id,
            componentId: setMate.components[1].id, // Cotidiano
            indicatorId: indTriangulos.id,
            rubric: {
                create: {
                    criteria: {
                        create: [{ description: 'Uso de instrumentos', maxPoints: 3, descLevel1: 'No usa regla.', descLevel3: 'Trazo preciso.' }]
                    }
                }
            }
        }
    })

    // LA PRUEBA ESCRITA (MATH ENGINE)
    // Total Puntos: 35. Lecciones: 10. K = 3.5
    // Triángulos: 6 lecciones * 3.5 = 21 pts
    // Pitágoras: 4 lecciones * 3.5 = 14 pts
    const examen = await prisma.evaluationActivity.create({
        data: {
            title: 'I Parcial: Geometría',
            groupId: grupoMate.id,
            componentId: setMate.components[0].id, // Pruebas
            // No single indicator, covers multiple in design
        }
    })

    await prisma.examDesign.create({
        data: {
            activityId: examen.id,
            totalPoints: 35,
            totalLessons: 10,
            constantK: 3.5,
            topics: {
                create: [
                    {
                        indicatorId: indTriangulos.id,
                        description: 'Clasificación de Triángulos',
                        lessonsTaught: 6,
                        calculatedPoints: 21.0,
                        finalPoints: 21
                    },
                    {
                        indicatorId: indPitagoras.id,
                        description: 'Teorema de Pitágoras',
                        lessonsTaught: 4,
                        calculatedPoints: 14.0,
                        finalPoints: 14
                    }
                ]
            }
        }
    })

    // ===============================================================
    // ESCENARIO B: TALLER TÉCNICO (SOFTWARE 11°)
    // ===============================================================
    console.log('💻 Generando Escenario B: Proyecto de Software...')

    const grupoSoft = await prisma.group.create({
        data: {
            name: '11-1 Desarrollo Software',
            institutionId: inst.id,
            teacherId: profeSoft.id,
            modalityTag: ModalityTag.TECNICO
        }
    })

    const setSoft = await prisma.evaluationSettings.create({
        data: {
            groupId: grupoSoft.id,
            hasProject: true, hasPortfolio: true,
            components: { create: [{ name: 'Proyecto', percentage: 40 }] }
        },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Proyecto: API Rest Segura',
            groupId: grupoSoft.id,
            componentId: setSoft.components[0].id,
            rubric: {
                create: {
                    criteria: {
                        create: [
                            {
                                description: 'Seguridad y Autenticación (JWT)',
                                maxPoints: 3,
                                descLevel1: 'Endpoints públicos sin protección. El API no valida credenciales.',
                                descLevel2: 'Implementa Token pero expone datos sensibles.',
                                descLevel3: 'Manejo impecable de JWT, Hashing de contraseñas y Middlewares.'
                            }
                        ]
                    }
                }
            }
        }
    })

    // ===============================================================
    // ESCENARIO C: CONDUCTA (JAIMITO)
    // ===============================================================
    console.log('👮 Generando Escenario C: Conducta y Boletas...')

    // Grupo Guía
    const grupoGuia = await prisma.group.create({
        data: {
            name: 'Sección Guía 8-1',
            institutionId: inst.id,
            teacherId: profeMate.id, // Materia
            guideTeacherId: profeGuia.id, // Guía encargado
            modalityTag: ModalityTag.ACADEMICO
        }
    })

    const jaimito = await prisma.user.create({
        data: {
            name: 'Jaimito El Travieso',
            email: 'jaimito@est.cr',
            role: UserRole.STUDENT,
            institutionId: inst.id,
            enrollments: { create: { groupId: grupoGuia.id } }
        }
    })

    // Reglas
    const ruleLate = await prisma.conductRule.create({
        data: { name: 'Llegada Tardía', pointsToDeduct: 1, institutionId: inst.id }
    })
    const ruleDisrespect = await prisma.conductRule.create({
        data: { name: 'Falta de Respeto a Autoridad', pointsToDeduct: 10, institutionId: inst.id }
    })

    // Boletas (Conduct Events)
    // 1. Llegada Tardía (Español - Simulated Context)
    await prisma.conductEvent.create({
        data: {
            studentId: jaimito.id,
            ruleId: ruleLate.id,
            pointsApplied: 1,
            date: new Date('2026-03-10'),
        }
    })

    // 2. Falta de Respeto (Mate)
    await prisma.conductEvent.create({
        data: {
            studentId: jaimito.id,
            ruleId: ruleDisrespect.id,
            pointsApplied: 10,
            date: new Date('2026-03-15'),
        }
    })

    // Nota Final Calculada (Visible solo para Guía)
    // 100 - 1 - 10 = 89
    await prisma.conductGrade.create({
        data: {
            groupId: grupoGuia.id,
            studentId: jaimito.id,
            currentScore: 89.00,
            periodId: (await prisma.period.create({ data: { name: 'I Periodo', institutionId: inst.id, isActive: true } })).id
        }
    })

    console.log('✅ MEGA-SEED COMPLETADO. SISTEMA CARGADO DE VIDA REAL.')
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
