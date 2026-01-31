const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// V1400 SECTORIZATION DATA
const TECHNICAL_DATA = [
    {
        // SECTOR INDUSTRIAL (HARD TECH)
        name: "Sub-área: Ciberseguridad",
        code: "CIB-12",
        educationLevel: "SECUNDARIA",
        modalityType: "TECNICA",
        icon: "Shield",
        modules: [
            {
                title: "Módulo 2: Seguridad en Redes y Perímetros",
                grade: "10°",
                semester: 1,
                outcome: "Diagnosticar vulnerabilidades en capas de red (OSI) aplicando protocolos de seguridad industrial.",
                indicator: "Opera equipos de monitoreo de red utilizando EPP adecuado según normativa de salud ocupacional." // V1400 INDUSTRIAL NUANCE
            },
            {
                title: "Módulo 5: Hacking Ético y Defensa",
                grade: "11°",
                semester: 2,
                outcome: "Ejecutar pruebas de penetración controladas.",
                indicator: "Calibra instrumentos de software para la detección de intrusos reportando incidentes." // V1400 INDUSTRIAL VERB
            },
            {
                title: "Módulo 8: Práctica Supervisada Ciberseguridad",
                grade: "12°", // V1300 12th GRADE
                semester: 1,
                outcome: "Aplicar competencias técnicas en un entorno real de trabajo.",
                indicator: "Ensambla componentes de seguridad lógica en infraestructura crítica."
            }
        ]
    },
    {
        // SECTOR COMERCIAL (SERVICES)
        name: "Sub-área: Banca y Finanzas",
        code: "FIN-12",
        educationLevel: "SECUNDARIA",
        modalityType: "TECNICA",
        icon: "Landmark",
        modules: [
            {
                title: "Módulo 1: Gestión de Cajeros y Efectivo",
                grade: "10°",
                semester: 1,
                outcome: "Gestionar operaciones de caja con precisión y ética.",
                indicator: "Atiende usuarios siguiendo el protocolo de servicio al cliente bancario." // V1400 COMMERCIAL NUANCE
            },
            {
                title: "Módulo 6: Crédito y Riesgo",
                grade: "11°",
                semester: 2,
                outcome: "Analizar perfiles crediticios de clientes.",
                indicator: "Gestiona trámites de solicitud de crédito archivando expedientes con rigor documental." // V1400 COMMERCIAL VERB
            },
            {
                title: "Módulo 9: Práctica Supervisada Banca",
                grade: "12°", // V1300 12th GRADE
                semester: 1,
                outcome: "Ejecutar funciones bancarias en entidad financiera real o simulada.",
                indicator: "Mantiene la confidencialidad y precisión en la gestión de valores."
            }
        ]
    }
];

async function main() {
    console.log("🚀 INICIANDO INYECCIÓN TÉCNICA V1300/V1400...");

    for (const subjectData of TECHNICAL_DATA) {
        // 1. Upsert Subject (Sub-área)
        console.log(`\n🔧 Procesando: ${subjectData.name} (${subjectData.modalityType})`);

        // Usamos findFirst porque upsert con unique compuesto es tricky si no esta definido exactamente igual en prisma client types a veces
        // Pero probemos upsert directo con el @@unique([name, educationLevel, modalityType])

        const subject = await prisma.subject.upsert({
            where: {
                name_educationLevel_modalityType: {
                    name: subjectData.name,
                    educationLevel: subjectData.educationLevel,
                    modalityType: subjectData.modalityType
                }
            },
            update: {
                code: subjectData.code
            },
            create: {
                name: subjectData.name,
                code: subjectData.code,
                educationLevel: subjectData.educationLevel,
                modalityType: subjectData.modalityType
            }
        });

        // 2. Inject Modules (StudyUnits)
        for (const mod of subjectData.modules) {
            // Buscar si existe
            let unit = await prisma.studyUnit.findFirst({
                where: {
                    title: mod.title,
                    subjectId: subject.id
                }
            });

            if (!unit) {
                unit = await prisma.studyUnit.create({
                    data: {
                        title: mod.title,
                        grade: mod.grade, // USA EL CAMPO 'GRADE' DEL USUARIO
                        semester: mod.semester,
                        subjectId: subject.id
                    }
                });
                console.log(`   + Creado Módulo: ${mod.title} (${mod.grade})`);
            } else {
                console.log(`   . Existente: ${mod.title}`);
            }

            // 3. Inject Competencies (Outcomes + V1400 Indicators)
            // Limpiamos outcomes anteriores para asegurar integridad V1400
            // (En prod seria deleteMany, aqui solo insertamos si no hay)

            const outcomeExists = await prisma.learningOutcome.findFirst({ where: { unitId: unit.id } });

            if (!outcomeExists) {
                await prisma.learningOutcome.create({
                    data: {
                        description: mod.outcome,
                        unitId: unit.id,
                        indicators: {
                            create: [
                                { description: mod.indicator } // V1400 CRITERIO DE DESEMPEÑO
                            ]
                        }
                    }
                });
            }
        }
    }

    console.log("\n✨ PROTOCOLO TÉCNICO V1400 COMPLETADO.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
