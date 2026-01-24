
import { PrismaClient, UserRole, ModalityTag } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🇨🇷 INICIANDO EL "GRAND TOUR" EDUCATIVO (MEP)...')

    // 1. INSTITUCIÓN POLIMODAL (Para la Demo)
    const inst = await prisma.institution.upsert({
        where: { code: 'MEP-GRAND-TOUR' },
        update: {},
        create: {
            name: 'Complejo Educativo Integral de Costa Rica',
            code: 'MEP-GRAND-TOUR',
            subscriptionPlan: 'PLATINUM',
        }
    })

    // Profesora Todoterreno (o distintos maestros para cada nivel)
    const profe = await prisma.user.upsert({
        where: { email: 'multimodal@demo.cr' },
        update: {},
        create: { name: 'Prof. Versátil', email: 'multimodal@demo.cr', role: UserRole.TEACHER, institutionId: inst.id }
    })

    // ===============================================================
    // 1. PREESCOLAR - SIN NOTAS NUMÉRICAS
    // ===============================================================
    console.log('🧸 Inyectando: Preescolar (Cualitativo)...')
    const grupoKinder = await prisma.group.create({
        data: {
            name: 'Transición - Los Exploradores',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.PREESCOLAR
        }
    })

    // Settings (Sin Examen)
    const setKinder = await prisma.evaluationSettings.create({
        data: { groupId: grupoKinder.id, components: { create: [{ name: 'Informe Cualitativo', percentage: 100 }] } },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Circuito de Texturas (Psicomotriz)',
            groupId: grupoKinder.id,
            componentId: setKinder.components[0].id,
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'Exploración Sensorial',
                            maxPoints: 3,
                            // Rúbrica Cualitativa
                            level1Desc: 'Requiere instigación física para tocar texturas (No Logrado).',
                            level2Desc: 'Toca algunas texturas con recelo (En Proceso).',
                            level3Desc: 'Explora texturas con manos y pies con disfrute (Logrado).'
                        }]
                    }
                }
            }
        }
    })

    // ===============================================================
    // 2. PRIMARIA - ARTES PLÁSTICAS
    // ===============================================================
    console.log('🎨 Inyectando: Artes Plásticas 5to...')
    const grupoArte = await prisma.group.create({
        data: {
            name: '5-1 Expresión Artística',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.ACADEMICO // Académico estándar
        }
    })

    const setArte = await prisma.evaluationSettings.create({
        data: { groupId: grupoArte.id, components: { create: [{ name: 'Trabajo Cotidiano', percentage: 60 }] } },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Lámina: Círculo Cromático y Emociones',
            groupId: grupoArte.id,
            componentId: setArte.components[0].id,
            linkedIndicator: "Aplica la teoría del color para expresar estados de ánimo.",
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'Aplicación de Teoría del Color',
                            maxPoints: 3,
                            level1Desc: 'Colores mezclados sin orden lógico.',
                            level2Desc: 'Logra colores secundarios pero se salen de los bordes.',
                            level3Desc: 'Círculo perfecto con degradados y asociación emotiva clara.'
                        }]
                    }
                }
            }
        }
    })

    // ===============================================================
    // 3. SECUNDARIA ACADÉMICA - CÍVICA
    // ===============================================================
    console.log('⚖️ Inyectando: Cívica 11mo (Pensamiento Crítico)...')
    const grupoCivica = await prisma.group.create({
        data: {
            name: '11-3 Educación Cívica',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.ACADEMICO
        }
    })

    const setCivica = await prisma.evaluationSettings.create({
        data: { groupId: grupoCivica.id, hasProject: true, components: { create: [{ name: 'Proyecto', percentage: 30 }] } },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Proyecto: Política Pública y Juventud',
            groupId: grupoCivica.id,
            componentId: setCivica.components[0].id,
            linkedIndicator: "Analiza críticamente las políticas públicas inclusivas en Costa Rica.",
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'Análisis Crítico',
                            maxPoints: 3,
                            level1Desc: 'Solo resume las leyes sin opinar.',
                            level2Desc: 'Opina pero sin sustento en la normativa.',
                            level3Desc: 'Contrasta la ley con la realidad y propone mejoras viables.'
                        }]
                    }
                }
            }
        }
    })

    // ===============================================================
    // 4. CTP TÉCNICO - DESARROLLO SOFTWARE
    // ===============================================================
    console.log('💻 Inyectando: CTP Software 11mo...')
    const grupoSoft = await prisma.group.create({
        data: {
            name: '11-B Software (Prog. Web)',
            specialty: 'Desarrollo de Software',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.TECNICO // Cambia UI a RA/Criterios
        }
    })

    const setSoft = await prisma.evaluationSettings.create({
        data: {
            groupId: grupoSoft.id,
            hasProject: true,
            components: { create: [{ name: 'Portafolio de Evidencias', percentage: 40 }] }
        },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Desarrollo API REST (NodeJS)',
            groupId: grupoSoft.id,
            componentId: setSoft.components[0].id,
            // En técnico, esto se visualiza como "RA"
            linkedIndicator: "RA1: Desarrollar servicios web utilizando estándares de intercambio JSON.",
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'CE 1.1: Endpoints y Códigos HTTP',
                            maxPoints: 3,
                            level3Desc: 'Implementa GET/POST/PUT/DELETE con códigos 200/400/500 correctos.'
                        }]
                    }
                }
            }
        }
    })

    // ===============================================================
    // 5. CINDEA - EDUCACIÓN ADULTOS
    // ===============================================================
    console.log('🌙 Inyectando: CINDEA (Módulos)...')
    const grupoCindea = await prisma.group.create({
        data: {
            name: 'Módulo 56: Vivamos la Democracia',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.CINDEA
        }
    })

    const setCindea = await prisma.evaluationSettings.create({
        data: { groupId: grupoCindea.id, components: { create: [{ name: 'Estrategia Evaluación', percentage: 100 }] } },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Ensayo sobre Mecanismos de Participación',
            groupId: grupoCindea.id,
            componentId: setCindea.components[0].id,
            rubric: {
                create: {
                    criteria: {
                        create: [{ description: 'Identificación de Mecanismos', maxPoints: 3 }]
                    }
                }
            }
        }
    })

    // ===============================================================
    // 6. EDUCACIÓN ESPECIAL - HABILIDADES VIDA
    // ===============================================================
    console.log('🧩 Inyectando: Educ. Especial (Aula Integrada)...')
    const grupoEE = await prisma.group.create({
        data: {
            name: 'Grupo 2 - Habilidades Vida',
            institutionId: inst.id,
            teacherId: profe.id,
            modalityTag: ModalityTag.EDUCACION_ESPECIAL
        }
    })

    const setEE = await prisma.evaluationSettings.create({
        data: { groupId: grupoEE.id, components: { create: [{ name: 'Informe de Logros', percentage: 100 }] } },
        include: { components: true }
    })

    await prisma.evaluationActivity.create({
        data: {
            title: 'Taller de Cocina: Preparación de Sandwich',
            groupId: grupoEE.id,
            componentId: setEE.components[0].id,
            rubric: {
                create: {
                    criteria: {
                        create: [{
                            description: 'Secuencia Pictográfica',
                            maxPoints: 3,
                            level1Desc: 'Requiere apoyo mano sobre mano.',
                            level2Desc: 'Sigue las imágenes con guía verbal.',
                            level3Desc: 'Completa la receta con autonomía siguiendo el pictograma.'
                        }]
                    }
                }
            }
        }
    })

    console.log('✅ GRAND TOUR FINALIZADO. 6 MODALIDADES CARGADAS.')
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
