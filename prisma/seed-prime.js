const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

// ALGORITMO DE RÚBRICAS (Niveles 1-3)
function generarNiveles(indicador) {
    return {
        inicial: "Cita elementos básicos de " + indicador.substring(0, 15) + "...",
        intermedio: "Caracteriza aspectos de " + indicador.substring(0, 25) + "...",
        avanzado: "Analiza y aplica " + indicador
    };
}

// BANCO DE ESTRATEGIAS (VARIEDAD)
const ESTILOS = {
    STEAM: { enfoque: "STEAM", inicio: "Reto de Ingeniería...", desarrollo: "Prototipado...", cierre: "Testeo..." },
    LUDICO: { enfoque: "Gamificación", inicio: "Misión Secreta...", desarrollo: "Desbloqueo de Niveles...", cierre: "Insignias..." },
    SOCIAL: { enfoque: "Debate", inicio: "Pregunta Polémica...", desarrollo: "Mesa Redonda...", cierre: "Consenso..." }
};

async function main() {
    console.log("⚡ EJECUTANDO INYECCIÓN AULAPLAN PRIME...");

    // 1. Super Admin (Seguridad)
    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", name: "Max Salazar", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    // 2. Simulación de Datos (Si no hay JSON, usamos genéricos para no fallar)
    // Esto garantiza que el script corra aunque la carpeta esté vacía.
    const materiasBase = ["Matemáticas", "Español", "Ciencias", "Ciberseguridad (Técnico)"];

    for (const nombreMateria of materiasBase) {
        console.log(`   -> Procesando: ${nombreMateria}`);
        
        const isTecnico = nombreMateria.includes("Técnico");
        const modalidad = isTecnico ? "TECNICA" : "ACADEMICA";

        // Crear Asignatura
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: nombreMateria, educationLevel: "SECUNDARIA", modalityType: modalidad }},
            update: {},
            create: { name: nombreMateria, code: nombreMateria.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: modalidad }
        });

        // Crear Unidad
        const uTitle = `Unidad 1: Fundamentos de ${nombreMateria}`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: "General", subjectId: subject.id } });

        // A. DIAGNÓSTICO INTEGRAL (MEP 2011)
        // 1. Cognitivo (RRPCC)
        await prisma.assessment.create({
            data: {
                title: `Diagnóstico R.R.P.C.C.: ${nombreMateria}`,
                type: "DIAGNOSTICO",
                userId: admin.id,
                subjectId: subject.id,
                content: { tecnica: "Recordar, Resumir, Preguntar, Conectar, Comentar", objetivo: "Prerrequisitos" }
            }
        });
        // 2. Socioafectivo (Autoasesoría)
        await prisma.assessment.create({
            data: {
                title: `Autoasesoría: Actitud hacia ${nombreMateria}`,
                type: "DIAGNOSTICO",
                userId: admin.id,
                subjectId: subject.id,
                content: { tecnica: "Autoasesoría Anónima", pregunta: "¿Qué barreras siento ante esta materia?" }
            }
        });

        // B. PLANES VARIADOS (MULTIVERSO)
        for (const estiloKey in ESTILOS) {
            const est = ESTILOS[estiloKey];
            await prisma.lessonPlan.create({
                data: {
                    title: `Plan ${est.enfoque}: ${uTitle}`,
                    userId: admin.id,
                    status: "PUBLISHED",
                    content: {
                        unidad: uTitle,
                        estilo: est.enfoque,
                        estrategias: {
                            inicio: est.inicio,
                            desarrollo: est.desarrollo,
                            pausa_activa: { actividad: "Gimnasia Cerebral", duracion: "5 min" },
                            cierre: est.cierre
                        },
                        adecuaciones: {
                            acceso: ["Ubicación", "Luz"],
                            no_significativa: ["Tiempo extra"],
                            alta_dotacion: ["Reto Avanzado"]
                        },
                        // Rúbrica Densa (6 items)
                        rubrica: [1,2,3,4,5,6].map(i => ({ indicador: `Indicador ${i}`, niveles: generarNiveles(`Habilidad ${i}`) }))
                    }
                }
            });
        }

        // C. INSTRUMENTOS OFICIALES
        // Examen
        await prisma.assessment.create({
            data: {
                title: `Parcial I: ${uTitle}`,
                type: "EXAMEN",
                userId: admin.id,
                subjectId: subject.id,
                specsTable: { puntos: 45, detalle: "Tabla Oficial" },
                content: { partes: ["Selección", "Pareo", "Desarrollo"] }
            }
        });
        
        // Lista de Cotejo (Psicomotora/Taller)
        await prisma.assessment.create({
            data: {
                title: `Lista de Cotejo: Práctica de Clase`,
                type: "LISTA_COTEJO",
                userId: admin.id,
                subjectId: subject.id,
                rubric: { items: ["Sigue instrucciones", "Orden y Aseo", "Uso de Herramientas"] },
                content: { instruccion: "Marcar con X", ambito: "Psicomotor" }
            }
        });
    }

    console.log("\n✅ INYECCIÓN PRIME COMPLETADA.");
    console.log("   🌟 Diagnósticos (RRPCC, Autoasesoría).");
    console.log("   🌟 Planes Variados (STEAM, Lúdico, Social).");
    console.log("   🌟 Evaluaciones Oficiales.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());