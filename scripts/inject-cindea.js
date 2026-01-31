const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ESTRUCTURA CINDEA (V1105)
// Modalidad: ADULTOS
// Niveles: I, II, III (No usan 7-11)
// Estructura: Áreas -> Módulos

const CINDEA_AREAS = [
    {
        name: "Ciencias Naturales (CINDEA)",
        code: "CN-ADUL",
        icon: "Microscope",
        modules: [
            { title: "Módulo 46: La materia y la energía en el universo", level: "II Nivel" },
            { title: "Módulo 57: Biodiversidad y cambio climático", level: "III Nivel" }
        ]
    },
    {
        name: "Estudios Sociales (CINDEA)",
        code: "SOC-ADUL",
        icon: "Globe2",
        modules: [
            { title: "Módulo 32: Democracia y Estado", level: "II Nivel" },
            { title: "Módulo 21: Historia de Costa Rica Siglo XX", level: "I Nivel" }
        ]
    },
    {
        name: "Español (CINDEA)",
        code: "ESP-ADUL",
        icon: "BookA",
        modules: [
            { title: "Módulo 12: Comunicación y Lenguaje", level: "I Nivel" },
            { title: "Módulo 44: Literatura y Sociedad", level: "II Nivel" }
        ]
    }
];

async function main() {
    console.log("🚀 INICIANDO INYECCIÓN CINDEA V1105 (ADULTOS)...");

    for (const area of CINDEA_AREAS) {
        // 1. Crear el "Área" como Subject (Contenedor)
        const subject = await prisma.subject.upsert({
            where: { name: area.name },
            update: { modality: "ADULTOS" },
            create: {
                name: area.name,
                code: area.code,
                icon: area.icon,
                modality: "ADULTOS"
            }
        });

        // 2. Crear los "Módulos" como StudyUnits
        for (const mod of area.modules) {
            // Upsert de Unidad (Buscamos por título + subjectId para evitar dupes si corremos varias veces sin limpiar)
            // Prisma estudio no tiene unique compuesto default facilmente accesible en create, asi que haremos find first

            let unit = await prisma.studyUnit.findFirst({
                where: { title: mod.title, subjectId: subject.id }
            });

            if (!unit) {
                unit = await prisma.studyUnit.create({
                    data: {
                        title: mod.title,
                        level: mod.level, // Usa "II Nivel" explícitamente
                        subjectId: subject.id
                    }
                });
                console.log(`   + Creado: ${mod.title} (${mod.level})`);
            } else {
                console.log(`   . Existente: ${mod.title}`);
            }

            // 3. Crear Outcomes Mock (Para que sea funcional)
            const outcomeExists = await prisma.learningOutcome.findFirst({ where: { unitId: unit.id } });
            if (!outcomeExists) {
                await prisma.learningOutcome.create({
                    data: {
                        description: `Analizar los conceptos fundamentales del ${mod.title} en el contexto de la educación de adultos.`,
                        unitId: unit.id,
                        indicators: {
                            create: [
                                { description: "Identifica las ideas principales del módulo." },
                                { description: "Aplica los conocimientos en situaciones cotidianas." }
                            ]
                        }
                    }
                });
            }
        }
        console.log(`✅ Área Inyectada: ${area.name}`);
    }

    console.log("\n✨ PROTOCOLO CINDEA V1105 COMPLETADO.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
