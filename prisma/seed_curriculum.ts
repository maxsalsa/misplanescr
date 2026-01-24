
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('📚 INICIANDO INYECCIÓN DE INTELIGENCIA CURRICULAR (MEP)...')

    // 1. Setup Base Institution (if not exists)
    const inst = await prisma.institution.upsert({
        where: { code: 'MEP-CURRICULUM-DEMO' },
        update: {},
        create: {
            name: 'Instituto Modelo Curricular',
            code: 'MEP-CURRICULUM-DEMO',
            subscriptionPlan: 'UNLIMITED',
        }
    })

    // 2. Setup Teacher
    const profe = await prisma.user.upsert({
        where: { email: 'curriculo@mep.go.cr' },
        update: {},
        create: {
            email: 'curriculo@mep.go.cr',
            name: 'Dra. Elena Currículo',
            role: UserRole.TEACHER,
            institutionId: inst.id,
        }
    })

    // ===============================================================
    // ESCENARIO 1: MATEMÁTICAS (7° Año)
    // Utiliza números enteros para representar situaciones del entorno.
    // ===============================================================
    console.log('🧮 Inyectando Escenario: Matemáticas 7mo...')

    const grupo7 = await prisma.group.create({
        data: {
            name: '7-1 Matemáticas',
            level: '7mo',
            institutionId: inst.id,
            teacherId: profe.id,
        }
    })

    // Settings
    const settings7 = await prisma.evaluationSettings.create({
        data: {
            groupId: grupo7.id,
            components: {
                create: [{ name: 'Tareas Cortas', percentage: 10 }]
            }
        },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Tarea Corta #1 - Números Enteros en la Vida Real',
            code: 'TAREA-01',
            date: new Date(),
            groupId: grupo7.id,
            componentId: settings7.components[0].id,
            linkedIndicator: "Utiliza números enteros para representar situaciones del entorno.",
            rubric: {
                create: {
                    criteria: {
                        create: [
                            {
                                description: "Representación Simbólica",
                                maxPoints: 3,
                                level1Desc: "Cita situaciones sin representarlas numéricamente.",
                                level2Desc: "Representa situaciones simples con errores de signo.",
                                level3Desc: "Representa correctamente situaciones complejas (deudas, temperaturas) con signos."
                            }
                        ]
                    }
                }
            }
        }
    })

    // ===============================================================
    // ESCENARIO 2: CIENCIAS (8° Año)
    // Diferencia las estructuras de la célula animal y vegetal.
    // ===============================================================
    console.log('🔬 Inyectando Escenario: Ciencias 8vo...')

    const grupo8 = await prisma.group.create({
        data: {
            name: '8-3 Ciencias',
            level: '8vo',
            institutionId: inst.id,
            teacherId: profe.id,
        }
    })

    const settings8 = await prisma.evaluationSettings.create({
        data: {
            groupId: grupo8.id,
            components: {
                create: [{ name: 'Trabajo Cotidiano', percentage: 20 }]
            }
        },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Cotidiano #3 - La Célula Animal vs Vegetal',
            code: 'COTID-03',
            date: new Date(),
            groupId: grupo8.id,
            componentId: settings8.components[0].id,
            linkedIndicator: "Diferencia las estructuras de la célula animal y vegetal.",
            rubric: {
                create: {
                    criteria: {
                        create: [
                            {
                                description: "Identificación de Organelas Diferenciadoras",
                                maxPoints: 3,
                                level1Desc: "Solo menciona 2 diferencias básicas.",
                                level2Desc: "Menciona 4 diferencias pero confunde funciones.",
                                level3Desc: "Explica 5+ diferencias y sus funciones biológicas correctamente."
                            }
                        ]
                    }
                }
            }
        }
    })

    // ===============================================================
    // ESCENARIO 3: TALLER TÉCNICO (10° Año - Ejecutivo)
    // Aplica protocolos de etiqueta telefónica.
    // ===============================================================
    console.log('📞 Inyectando Escenario: Taller Ejecutivo 10mo...')

    const grupo10 = await prisma.group.create({
        data: {
            name: '10-A Ejecutivo',
            level: '10mo',
            specialty: 'Ejecutivo de Servicio al Cliente',
            institutionId: inst.id,
            teacherId: profe.id,
        }
    })

    const settings10 = await prisma.evaluationSettings.create({
        data: {
            groupId: grupo10.id,
            hasProject: true,
            components: {
                create: [{ name: 'Proyecto', percentage: 30 }]
            }
        },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Proyecto - Simulación de Atención de Quejas',
            code: 'PROY-FINAL',
            date: new Date(),
            groupId: grupo10.id,
            componentId: settings10.components[0].id,
            linkedIndicator: "Aplica protocolos de etiqueta telefónica en inglés y español.",
            rubric: {
                create: {
                    criteria: {
                        create: [
                            {
                                description: "Tono de Voz y Vocabulario (Roleplay)",
                                maxPoints: 3,
                                level1Desc: "Usa lenguaje informal, muletillas o tono agresivo ante la queja.",
                                level2Desc: "Usa protocolo básico pero titubea o se queda en silencio.",
                                level3Desc: "Fluidez total, manejo empático y resolución del conflicto."
                            },
                            {
                                description: "Protocolo de Cierre",
                                maxPoints: 3,
                                level1Desc: "Cuelga sin despedirse.",
                                level2Desc: "Se despide pero olvida ofrecer ayuda adicional.",
                                level3Desc: "Cierre perfecto: Resumen, agradecimiento y despedida formal."
                            }
                        ]
                    }
                }
            }
        }
    })

    console.log('✅ BASE DE CONOCIMIENTOS CURRICULARES POBLADA.')
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
