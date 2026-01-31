const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- MATRIZ DE VIDA (SITUACIONES REALES) ---
const CONTEXTOS_VIDA = [
    { 
        eje: "Educación Financiera", 
        materias: ["Matemáticas", "Hogar", "Contabilidad"], 
        temas: ["Mi Primer Presupuesto", "Ahorro vs Deuda", "Cálculo de Impuestos (IVA)"],
        icono: "💰",
        actividad: "Simulación de gastos del hogar en Excel."
    },
    { 
        eje: "Empleabilidad", 
        materias: ["Español", "Inglés", "Técnica", "Psicología"], 
        temas: ["La Entrevista de Trabajo", "Hoja de Vida de Alto Impacto", "Etiqueta Digital"],
        icono: "💼",
        actividad: "Roleplay de entrevista laboral."
    },
    { 
        eje: "Sostenibilidad", 
        materias: ["Ciencias", "Biología", "Química", "Agroecología"], 
        temas: ["Huella de Carbono", "Huertas Caseras", "Reciclaje Inteligente"],
        icono: "🌱",
        actividad: "Diseño de un sistema de compostaje."
    },
    { 
        eje: "Ciudadanía Digital", 
        materias: ["Cívica", "Informática", "Estudios Sociales"], 
        temas: ["Fake News vs Realidad", "Ciberbullying", "Identidad Digital Segura"],
        icono: "🌐",
        actividad: "Debate sobre privacidad en redes sociales."
    },
    { 
        eje: "Vida Saludable", 
        materias: ["Educación Física", "Ciencias", "Hogar"], 
        temas: ["Nutrición Real", "Manejo del Estrés", "Primeros Auxilios Básicos"],
        icono: "❤️",
        actividad: "Creación de un plan de bienestar personal."
    }
];

// --- GENERADOR DE PROYECTOS INTEGRALES ---
function generarProyecto(contexto, materia) {
    return {
        titulo: `ABP: ${contexto.temas[0]} en ${materia}`,
        estrategia: {
            reto: `¿Cómo podemos aplicar ${contexto.temas[0]} para mejorar nuestra comunidad?`,
            producto: contexto.actividad,
            evaluacion: "Rúbrica de Desempeño Auténtico"
        }
    };
}

async function main() {
    console.log("🎨 PINTANDO EL CURRÍCULO CON REALIDAD...");

    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Requiere Admin."); return; }

    let contador = 0;

    // Iteramos sobre los contextos de vida
    for (const ctx of CONTEXTOS_VIDA) {
        
        // Buscamos materias compatibles ya existentes o las creamos
        for (const matNombre of ctx.materias) {
            
            // 1. Asegurar materia (Buscamos si existe, sino creamos genérica)
            // Nota: Usamos "SECUNDARIA" por defecto para simplificar, pero aplica a todo
            const subject = await prisma.subject.upsert({
                where: { name_educationLevel_modalityType: { name: matNombre, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
                update: {},
                create: { name: matNombre, code: matNombre.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
            });

            // 2. Crear Unidad Transversal
            const uTitle = `Eje Transversal: ${ctx.eje} y ${ctx.icono}`;
            const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: "Transversal", subjectId: subject.id } });

            // 3. PLAN BASADO EN PROYECTOS (ABP)
            const proyecto = generarProyecto(ctx, matNombre);
            
            await prisma.lessonPlan.create({
                data: {
                    title: `Proyecto de Vida: ${ctx.temas[0]}`,
                    userId: admin.id,
                    status: "PUBLISHED",
                    content: {
                        unidad: uTitle,
                        enfoque: "Educación para la Vida (ABP)",
                        icono: ctx.icono,
                        estrategias: {
                            inicio: "Pregunta Generadora: " + proyecto.estrategia.reto,
                            desarrollo: "Taller Práctico: " + proyecto.estrategia.producto,
                            cierre: "Feria de Soluciones: Exposición a la comunidad educativa."
                        },
                        // Rúbrica de Habilidades Blandas (NO ACADÉMICA)
                        rubrica: [
                            { indicador: "Trabajo en Equipo", niveles: {1:"Individualista", 2:"Colabora", 3:"Lidera"} },
                            { indicador: "Pensamiento Crítico", niveles: {1:"Repite", 2:"Cuestiona", 3:"Propone"} },
                            { indicador: "Resolución de Problemas", niveles: {1:"Se bloquea", 2:"Intenta", 3:"Resuelve"} }
                        ]
                    }
                }
            });

            // 4. INSTRUMENTO DE AUTOEVALUACIÓN (SABER SER)
            await prisma.assessment.create({
                data: {
                    title: `Autoevaluación: Habilidades Blandas (${ctx.eje})`,
                    type: "RUBRICA", // Mapeamos a rúbrica pero con enfoque personal
                    userId: admin.id,
                    subjectId: subject.id,
                    content: {
                        enfoque: "Saber Ser / Convivencia",
                        preguntas_reflexion: ["¿Cómo aporté al grupo?", "¿Qué aprendí para mi vida?", "¿Cómo manejé la frustración?"]
                    },
                    rubric: { criterios: ["Empatía", "Responsabilidad", "Escucha Activa"], escala: "Siempre/A veces/Nunca" }
                }
            });

            // 5. TAREA PARA LA VIDA (PRÁCTICA)
            await prisma.assessment.create({
                data: {
                    title: `Reto Práctico: ${ctx.actividad}`,
                    type: "TAREA",
                    userId: admin.id,
                    subjectId: subject.id,
                    content: {
                        instruccion: "Realizar la actividad en un contexto real (casa/comunidad).",
                        evidencia: "Foto o Video corto."
                    }
                }
            });

            contador += 3;
            process.stdout.write(ctx.icono);
        }
    }

    console.log(`\n\n✅ PROTOCOLO DA VINCI FINALIZADO.`);
    console.log(`   🌟 Se inyectaron ${contador} Recursos de Educación para la Vida.`);
    console.log(`   🌟 Ejes: Financiero, Empleabilidad, Ambiente, Ciudadanía.`);
    console.log(`   🌟 Enfoque: Habilidades Blandas y ABP.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());