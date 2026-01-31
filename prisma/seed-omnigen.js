const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- MOTORES DE GENERACIÓN DE TEXTO ---

const VERBOS_DOCENTE = ["Facilita", "Media", "Introduce", "Guía", "Organiza", "Retroalimenta", "Desafía"];
const VERBOS_ESTUDIANTE = ["Construye", "Analiza", "Resuelve", "Diseña", "Debate", "Investiga", "Experimenta"];
const COMPETENCIAS_MEP = ["Ciudadanía Digital", "Vida y Carrera", "Pensamiento Crítico", "Comunicación", "Colaboración"];

// Generador de Plan Anual (Febrero a Noviembre)
function generarPlanAnual(materia, nivel) {
    const meses = ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre"];
    const plan = meses.map((mes, i) => {
        return {
            mes: mes,
            eje: i === 0 ? "Diagnóstico y Nivelación" : `Unidad Temática ${i}: Profundización en ${materia}`,
            saber: `Contenidos clave de ${materia} para el mes de ${mes}`,
            habilidad: `Desarrollo de competencias de nivel ${nivel}`
        };
    });
    return plan;
}

// Generador de Estrategias (Binomio Sagrado)
function generarEstrategia(materia, enfoque) {
    const vDocente = VERBOS_DOCENTE[Math.floor(Math.random() * VERBOS_DOCENTE.length)];
    const vEstudiante = VERBOS_ESTUDIANTE[Math.floor(Math.random() * VERBOS_ESTUDIANTE.length)];
    
    return {
        inicio: `La persona docente ${vDocente.toLowerCase()} mediante una pregunta detonadora sobre ${materia}.`,
        desarrollo: `La persona estudiante ${vEstudiante.toLowerCase()} en equipos aplicando el enfoque de ${enfoque}.`,
        cierre: "Socialización de resultados y metacognición (¿Qué aprendí?)."
    };
}

async function main() {
    console.log("♾️ OMNI-GEN: FABRICANDO UNIVERSO PEDAGÓGICO COMPLETO...");
    
    // 1. OBTENER ADMIN Y MATERIAS
    const admin = await prisma.user.findFirst();
    const subjects = await prisma.subject.findMany();
    
    console.log(`   -> Objetivo: Inyectar Plan Anual + 3 Variantes a ${subjects.length} Asignaturas.`);
    let totalInyecciones = 0;

    for (const sub of subjects) {
        // A. INYECCIÓN DEL PLAN ANUAL (EL MAPA DE RUTA)
        const anualContent = generarPlanAnual(sub.name, sub.educationLevel);
        
        await prisma.lessonPlan.create({
            data: {
                title: `Plan Anual 2026: ${sub.name}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    tipo: "PLAN_ANUAL",
                    descripcion: "Distribución temporal de saberes y competencias.",
                    cronograma: anualContent,
                    normativa: "Circular DVM-AC-003-2026"
                }
            }
        });
        totalInyecciones++;

        // B. INYECCIÓN DE 3 VARIANTES DE PRÁCTICA PEDAGÓGICA (VARIEDAD)
        const variantes = [
            { nombre: "Aprendizaje Basado en Proyectos (ABP)", icono: "🚀" },
            { nombre: "Aula Invertida (Flipped)", icono: "🔄" },
            { nombre: "Gamificación", icono: "🎮" }
        ];

        for (const variante of variantes) {
            await prisma.lessonPlan.create({
                data: {
                    title: `Plan de Práctica: ${sub.name} (${variante.nombre})`,
                    userId: admin.id,
                    status: "PUBLISHED",
                    content: {
                        unidad: "Unidad Modelo",
                        enfoque: variante.nombre,
                        icono: variante.icono,
                        saberes_esenciales: [`Conceptos fundamentales de ${sub.name}`, "Habilidades blandas"],
                        indicadores: ["Identifica conceptos", "Aplica procedimientos", "Valora la importancia"],
                        estrategias: generarEstrategia(sub.name, variante.nombre), // GENERACIÓN PROCEDURAL
                        evidencias: [`Portafolio de ${variante.nombre}`, "Lista de Cotejo"],
                        competencias: [COMPETENCIAS_MEP[Math.floor(Math.random() * COMPETENCIAS_MEP.length)]]
                    }
                }
            });
            totalInyecciones++;
        }
        
        // Barra de progreso visual
        if (totalInyecciones % 50 === 0) process.stdout.write("🔥");
    }

    console.log(`\n\n✅ PROTOCOLO OMNI-GEN COMPLETADO.`);
    console.log(`   ♾️ Se inyectaron ${totalInyecciones} NUEVOS Planes Complejos.`);
    console.log(`   ♾️ Ahora cada materia tiene su Plan Anual 2026.`);
    console.log(`   ♾️ Ahora cada materia tiene 3 enfoques distintos de clase.`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());