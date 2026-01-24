
import { PrismaClient, UserRole, ModalityTag } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('📚 INICIANDO INYECCIÓN DE PLANES MAESTROS ("TIENDA DE CONTENIDO")...')

    // 1. RECUPEAR AL SUPER ADMIN (AUTOR INTELECTUAL)
    // Asumimos que ya corrió seed_users.ts, pero por seguridad hacemos upsert
    const superAdmin = await prisma.user.upsert({
        where: { email: 'max.admin@autoplanea.cr' },
        update: {},
        create: {
            name: 'Max Admin',
            email: 'max.admin@autoplanea.cr',
            role: UserRole.SUPER_ADMIN,
        }
    })

    // ===============================================================
    // 1. PAQUETE IDIOMAS: ENGLISH 10TH (OFFICIAL TEMPLATE)
    // ===============================================================
    console.log('🇬🇧 Publicando Master Plan: English 10th...')

    const currEnglish = await prisma.curriculumMap.create({
        data: {
            mncCode: 'ENG-10-U1',
            subject: 'English',
            level: '10th Grade',
            unitTitle: 'Teenage Life',
            isOfficialTemplate: true, // <--- LA JOYA DE LA CORONA
            outcomes: {
                create: [{
                    description: 'Assess oral and written discourse related to lifestyle and healthy habits.',
                    indicators: {
                        create: [{
                            description: 'Identify main ideas in complex audios about lifestyle.',
                            estimatedLessons: 4
                        }]
                    }
                }]
            }
        }
    })

    // Actividad de Mediación Sugerida (Master Activity)
    // Como es un template, la creamos atada a un "Grupo Plantilla" o simplemente como recurso en el futuro.
    // Por ahora, simulamos que existe una "Actividad Modelo" que los profes copian.
    // En nuestro schema actual, las actividades viven en Grupos. 
    // Para SaaS, lo ideal es tener un "Grupo Plantilla" del Admin.

    const templateGroup = await prisma.group.create({
        data: {
            name: 'TEMPLATE_LIBRARY_SYSTEM',
            institutionId: (await prisma.institution.findFirst({ where: { code: 'SAAS-MARKET-DEMO' } }))!.id,
            teacherId: superAdmin.id,
            modalityTag: ModalityTag.ACADEMICO
        }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'MASTER ACTIVITY: TED Talk Analysis (Healthy Habits)',
            groupId: templateGroup.id,
            indicatorId: (await prisma.indicator.findFirst({ where: { description: { contains: 'Identify main ideas' } } }))?.id,
            // Mediación enriquecida (simulada en descripcion o campos futuros)
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'Listening Comprehension',
                            maxPoints: 3,
                            descLevel3: 'Identifies 100% of key concepts and supports them with details from the audio.',
                            descLevel1: 'Struggles to understand the main topic.'
                        }]
                    }
                }
            }
        }
    })


    // ===============================================================
    // 2. PAQUETE TÉCNICO: CONTABILIDAD 12° (COSTOS)
    // ===============================================================
    console.log('💹 Publicando Master Plan: Contabilidad de Costos...')

    const currConta = await prisma.curriculumMap.create({
        data: {
            mncCode: 'CONT-COST-12',
            subject: 'Contabilidad',
            level: '12vo',
            unitTitle: 'Subárea: Costos y Presupuestos',
            isOfficialTemplate: true,
            outcomes: {
                create: [{
                    description: 'Aplicar sistemas de acumulación de costos.',
                    indicators: {
                        create: [{
                            description: 'Calcular costos de producción mediante sistema de órdenes específicas.',
                            estimatedLessons: 10
                        }]
                    }
                }]
            }
        }
    })

    // ===============================================================
    // 3. PAQUETE ARTES: MÚSICA 7° (PAISAJE SONORO)
    // ===============================================================
    console.log('🎵 Publicando Master Plan: Música 7mo...')

    const currMusica = await prisma.curriculumMap.create({
        data: {
            mncCode: 'MUS-7-PAISAJE',
            subject: 'Educación Musical',
            level: '7mo',
            unitTitle: 'Paisaje Sonoro Costarricense',
            isOfficialTemplate: true,
            outcomes: {
                create: [{
                    description: 'Apreciar el entorno sonoro como fuente de identidad.',
                    indicators: {
                        create: [{
                            description: 'Clasifica fuentes sonoras del entorno rural y urbano.',
                            estimatedLessons: 2
                        }]
                    }
                }]
            }
        }
    })

    console.log('✅ CONTENIDO PREMIUM PUBLICADO EN LA TIENDA.')
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
