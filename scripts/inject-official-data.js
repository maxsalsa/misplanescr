const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// 1. CARGAR DATOS JSON LOCALES (SIMULACION DE LECTURA DE PDF)
const CIBER_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "../MEP-Core-v2.json"), "utf8"));
const WEB_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "../ULTRA_WEB_11.json"), "utf8"));

// 2. MATERIAS ACADÉMICAS BASE (FICTICIOS PERO REALES)
const ACADEMIC_SUBJECTS = ["Matemáticas", "Español", "Estudios Sociales", "Ciencias", "Educación Cívica", "Inglés"];
const LEVELS = ["7", "8", "9", "10", "11"];

async function main() {
    console.log("🚀 INICIANDO INYECCIÓN DE DATOS OFICIALES MEP (V850)...");

    // --- FASE 1: MATERIAS TÉCNICAS (REALES DEL JSON) ---
    console.log("\n📡 Inyectando Especialidades Técnicas...");

    // 1.1 Ciberseguridad
    const ciberSubject = await prisma.subject.upsert({
        where: { name: "Ciberseguridad" },
        update: { modality: "TECNICA", specialty: "Ciberseguridad" },
        create: {
            name: "Ciberseguridad",
            code: "CIB-1012",
            modality: "TECNICA",
            specialty: "Ciberseguridad",
            icon: "ShieldCheck"
        }
    });

    // Procesar módulos de Ciberseguridad
    for (const mod of CIBER_DATA.modules) {
        const unit = await prisma.studyUnit.create({
            data: {
                title: `Módulo ${mod.level}°: ${mod.specialty}`, // Generico si no tiene titulo especifico
                level: mod.level.toString(),
                subjectId: ciberSubject.id
            }
        });

        for (const outcome of mod.learning_outcomes) {
            const dbOutcome = await prisma.learningOutcome.create({
                data: {
                    description: `${outcome.code}: ${outcome.description}`,
                    unitId: unit.id
                }
            });

            for (const indicator of outcome.performance_indicators) {
                await prisma.indicator.create({
                    data: {
                        description: indicator,
                        outcomeId: dbOutcome.id
                    }
                });
            }
        }
        console.log(`✅ Inyectado Ciberseguridad Nivel ${mod.level}`);
    }

    // 1.2 Desarrollo Web (ULTRA_WEB_11.json)
    const webSubject = await prisma.subject.upsert({
        where: { name: "Desarrollo Web" },
        update: { modality: "TECNICA", specialty: "Informática en Desarrollo de Software" },
        create: {
            name: "Desarrollo Web",
            code: "WEB-2026",
            modality: "TECNICA",
            specialty: "Informática en Desarrollo de Software",
            icon: "Globe"
        }
    });

    // Procesar Unidad Web
    // ULTRA_WEB_11 es un solo bloque de unidad
    const webUnit = await prisma.studyUnit.create({
        data: {
            title: WEB_DATA.header.unidad,
            level: WEB_DATA.header.nivel.replace("mo Año", ""), // "11"
            subjectId: webSubject.id
        }
    });

    const webOutcome = await prisma.learningOutcome.create({
        data: {
            description: WEB_DATA.bloque_pedagogico.ra_principal,
            unitId: webUnit.id
        }
    });

    await prisma.indicator.create({
        data: {
            description: WEB_DATA.bloque_pedagogico.indicador_logro,
            outcomeId: webOutcome.id
        }
    });
    console.log(`✅ Inyectado Desarrollo Web Nivel ${WEB_DATA.header.nivel}`);


    // --- FASE 2: MATERIAS ACADÉMICAS (MOCK REALISTA) ---
    console.log("\n📚 Inyectando Materias Académicas Base (7° a 11°)...");

    for (const subjName of ACADEMIC_SUBJECTS) {
        const subj = await prisma.subject.upsert({
            where: { name: subjName },
            update: { modality: "ACADEMICA" },
            create: {
                name: subjName,
                code: subjName.substring(0, 3).toUpperCase(),
                modality: "ACADEMICA",
                icon: "BookOpen"
            }
        });

        // Inyectar Unidades para cada nivel
        for (const lvl of LEVELS) {
            // Evitar duplicados simples limpiando unidades previas (opcional, aqui solo creamos si no existen)
            // Para simplicidad, creamos una unidad ejemplo
            const unitTitle = `Unidad ${lvl}.1: Fundamentos de ${subjName} para ${lvl}° Año`;

            const unit = await prisma.studyUnit.create({
                data: {
                    title: unitTitle,
                    level: lvl,
                    subjectId: subj.id
                }
            });

            // Outcome Mock Realista
            const outcome = await prisma.learningOutcome.create({
                data: {
                    description: `Aplicar conceptos avanzados de ${subjName} en la resolución de problemas de nivel ${lvl}.`,
                    unitId: unit.id
                }
            });

            await prisma.indicator.create({
                data: {
                    description: `Demuestra dominio sobre los temas introductorios de ${unitTitle}.`,
                    outcomeId: outcome.id
                }
            });
        }
        console.log(`✅ Inyectado ${subjName} Completo (7-11)`);
    }

    console.log("\n✨ INYECCIÓN V850 COMPLETADA EXITOSAMENTE.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
