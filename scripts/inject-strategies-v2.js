const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// V-ULTRA RELOADED & V2000 INCLUSION
// SCHEMA UPDATE: description -> content. educationLevel -> REMOVED. subject relation added.

const STRATEGIES_V2 = [
    // --- V-ULTRA GENERAL (MIGRATED) ---
    {
        title: "Lluvia de Ideas Estructurada",
        category: "COTIDIANO",
        content: "La persona docente facilita una pregunta generadora sobre el tema en la pizarra, mientras que la persona estudiante construye respuestas breves en 'post-its' y las categoriza en plenaria.",
        rubricModel: {
            levels: {
                "1": "Cita ideas básicas relacionadas con el tema.",
                "2": "Caracteriza las ideas propuestas agrupándolas por afinidad.",
                "3": "Analiza las ideas categorizadas estableciendo conclusiones grupales."
            }
        }
    },
    {
        title: "Debate Socrático",
        category: "COTIDIANO",
        content: "La persona docente cuestiona las premisas del grupo mediante preguntas abiertas, mientras que la persona estudiante debate sus argumentos basándose en evidencia teórica.",
        rubricModel: {
            levels: {
                "1": "Cita argumentos simples sin evidencia de apoyo.",
                "2": "Caracteriza su postura utilizando al menos una fuente teórica.",
                "3": "Debate con argumentos sólidos refutando contraargumentos."
            }
        }
    },
    {
        title: "Laboratorio Experimental",
        category: "COTIDIANO",
        content: "La persona docente facilita los materiales y el protocolo de seguridad, mientras que la persona estudiante ejecuta el procedimiento científico registrando datos empíricos.",
        rubricModel: {
            levels: {
                "1": "Sigue instrucciones básicas de seguridad.",
                "2": "Ejecuta el procedimiento registrando datos parcialmente.",
                "3": "Ejecuta el experimento con precisión y registra datos completos."
            }
        }
    },
    {
        title: "ABP: Solución Comunal",
        category: "PROYECTO",
        content: "La persona docente guía la identificación de una necesidad local, mientras que la persona estudiante diseña y prototipa una solución viable para su comunidad.",
        rubricModel: {
            levels: {
                "1": "Identifica una necesidad general de la comunidad.",
                "2": "Diseña una propuesta de solución básica.",
                "3": "Prototipa una solución viable y fundamentada."
            }
        }
    },

    // --- V2000: INCLUSION & DUA (NUEVAS) ---

    // 1. DUA VISUAL
    {
        title: "Organizador Gráfico (Pictogramas)",
        category: "COTIDIANO",
        content: "La persona docente presenta la información clave mediante infografías y pictogramas accesibles, mientras que la persona estudiante organiza los conceptos en un mapa mental visual.",
        adaptationTag: "VISUAL",
        rubricModel: {
            levels: {
                "1": "Cita conceptos usando imágenes aisladas.",
                "2": "Organiza conceptos en un esquema visual básico.",
                "3": "Estructura jerárquicamente la información en el organizador."
            }
        }
    },
    // 2. DUA AUDITIVO
    {
        title: "Podcast de Repaso",
        category: "TAREA",
        content: "La persona docente facilita un audio-resumen o podcast del tema estudiado, mientras que la persona estudiante escucha y graba una nota de voz con sus conclusiones principales.",
        adaptationTag: "AUDITIVO",
        rubricModel: {
            levels: {
                "1": "Graba una nota breve repitiendo conceptos.",
                "2": "Resumes las ideas principales en el audio.",
                "3": "Sintetiza conclusiones propias en el podcast."
            }
        }
    },
    // 3. DUA KINESTÉSICO
    {
        title: "Construcción de Modelos (Maker)",
        category: "PROYECTO",
        content: "La persona docente provee materiales manipulables (bloques, arcilla, reciclaje), mientras que la persona estudiante construye una representación física del concepto abstracto.",
        adaptationTag: "KINESTESICO",
        rubricModel: {
            levels: {
                "1": "Manipula materiales sin un propósito claro.",
                "2": "Construye una representación aproximada del concepto.",
                "3": "Crea un modelo preciso que demuestra el concepto."
            }
        }
    },
    // 4. NEURO-EDUCACION (PAUSA ACTIVA)
    {
        title: "Pausa Activa (Brain Gym)",
        category: "COTIDIANO",
        content: "[PAUSA ACTIVA] La persona docente dirige una breve sesión de 'Gimnasia Cerebral' (ej. Gateo Cruzado) por 5 minutos, mientras que la persona estudiante ejecuta los movimientos para reactivar la atención.",
        adaptationTag: "TDAH",
        rubricModel: {
            levels: {
                "1": "Participa en la actividad con guía constante.",
                "2": "Ejecuta los movimientos siguiendo el modelo docente.",
                "3": "Realiza la pausa activa con coordinación y autonomía."
            }
        }
    },
    // 4. ADAPTACIÓN TDAH
    {
        title: "Técnica Pomodoro (Pausas Activas)",
        category: "COTIDIANO",
        content: "La persona docente fragmenta la instrucción en bloques de tiempo corto con temporizador, mientras que la persona estudiante completa la tarea focalizada intercalando pausas activas de movimiento.",
        adaptationTag: "TDAH",
        rubricModel: {
            levels: {
                "1": "Completa un bloque de trabajo con supervisión.",
                "2": "Alterna trabajo y pausa siguiendo el temporizador.",
                "3": "Mantiene el foco en los bloques de trabajo autónomamente."
            }
        }
    },
    // --- INNOVATION ARCHETYPES (VARIETY MODE) ---
    // 1. THE TECH-SAVVY (IA & Simulators)
    {
        title: "Simulación Virtual (PhET/Labs)",
        category: "COTIDIANO",
        content: "La persona docente facilita el acceso a un simulador virtual del fenómeno, mientras que la persona estudiante manipula variables en la interfaz digital para deducir patrones de comportamiento.",
        adaptationTag: "VISUAL",
        rubricModel: {
            levels: {
                "1": "Explora el simulador sin un objetivo claro.",
                "2": "Manipula variables y observa cambios básicos.",
                "3": "Deduce patrones complejos a partir de la simulación."
            }
        }
    },
    // 2. THE SOCIAL-CONSTRUCTIVIST (Roleplay)
    {
        title: "Juego de Roles (Roleplay Histórico)",
        category: "COTIDIANO",
        content: "La persona docente asigna roles históricos a cada grupo, mientras que la persona estudiante dramatiza el evento desde la perspectiva de su personaje defendiendo sus motivaciones.",
        rubricModel: {
            levels: {
                "1": "Representa el rol asignado leyendo el guion.",
                "2": "Personifica al personaje con cierta improvisación.",
                "3": "Defiende argumentos complejos desde la perspectiva del rol."
            }
        }
    },
    // 3. THE MAKER (STEAM)
    {
        title: "Desafío de Ingeniería (Prototipado)",
        category: "PROYECTO",
        content: "La persona docente plantea un desafío de diseño (ej. puente, circuito), mientras que la persona estudiante prototipa una solución física iterando sobre fallos hasta lograr funcionalidad.",
        adaptationTag: "KINESTESICO",
        rubricModel: {
            levels: {
                "1": "Construye un modelo que no cumple la función.",
                "2": "Logra un prototipo funcional con asistencia.",
                "3": "Optimiza el diseño para superar el desafío eficientemente."
            }
        }
    },
    // 4. THE GAMER (Escape Room)
    {
        title: "Escape Room Educativo",
        category: "COTIDIANO",
        content: "La persona docente diseña una serie de acertijos secuenciales sobre el tema, mientras que la persona estudiante colabora en equipo para resolverlos y 'desbloquear' el siguiente nivel.",
        rubricModel: {
            levels: {
                "1": "Participa pasivamente en la resolución.",
                "2": "Aporta soluciones a acertijos simples.",
                "3": "Lidera la resolución lógica de enigmas complejos."
            }
        }
    },
    // 5. THE RESEARCHER (Flipped Classroom)
    {
        title: "Aula Invertida (Indagación)",
        category: "TAREA",
        content: "La persona docente asigna material de indagación previo a la clase, mientras que la persona estudiante trae hallazgos y preguntas para socializar en un taller de profundización.",
        rubricModel: {
            levels: {
                "1": "Revisa el material superficialmente.",
                "2": "Trae apuntes básicos sobre el tema.",
                "3": "Plantea preguntas críticas basadas en la investigación previa."
            }
        }
    },
    // 5. ADAPTACIÓN TEA (AUTISMO)
    {
        title: "Agenda Visual Estructurada",
        category: "COTIDIANO",
        content: "La persona docente anticipa la secuencia de actividades mediante una agenda visual en la pizarra, mientras que la persona estudiante ejecuta la rutina paso a paso con certeza y seguridad.",
        adaptationTag: "TEA",
        rubricModel: {
            levels: {
                "1": "Sigue la primera instrucción de la agenda.",
                "2": "Completa la secuencia con apoyo visual constante.",
                "3": "Ejecuta toda la rutina con autonomía."
            }
        }
    },
    // 6. ALTA DOTACIÓN
    {
        title: "Reto de Profundización (Mentoría)",
        category: "PROYECTO",
        content: "La persona docente plantea un desafío de mayor complejidad 'Open-Ended', mientras que la persona estudiante lidera un equipo de pares o investiga una solución innovadora más allá del currículo básico.",
        adaptationTag: "ALTA_DOTACION",
        rubricModel: {
            levels: {
                "1": "Participa en el reto sin liderar.",
                "2": "Propone una solución creativa al desafío.",
                "3": "Lidera la investigación y presenta una solución innovadora."
            }
        }
    }
];

async function main() {
    console.log("🚀 INICIANDO CARGA V2000 (ESTRATEGIAS DUA + ADAPTACIONES)...");

    for (const strat of STRATEGIES_V2) {
        // En el nuevo schema user-edited: title, content, category. (subjectId null es general)

        const existing = await prisma.pedagogicalStrategy.findFirst({
            where: { title: strat.title }
        });

        if (!existing) {
            await prisma.pedagogicalStrategy.create({
                data: {
                    title: strat.title,
                    content: strat.content,
                    category: strat.category,
                    adaptationTag: strat.adaptationTag || "UNIVERSAL",
                    rubricModel: JSON.stringify(strat.rubricModel) // STRINGIFY FOR DB
                }
            });
            console.log(`   + Inyectada: [${strat.category}] ${strat.title}`);
        } else {
            // Update content if changed (schema migration fix)
            await prisma.pedagogicalStrategy.update({
                where: { id: existing.id },
                data: {
                    content: strat.content,
                    rubricModel: JSON.stringify(strat.rubricModel), // STRINGIFY FOR DB
                    adaptationTag: strat.adaptationTag || "UNIVERSAL"
                }
            });
            console.log(`   . Actualizada: [${strat.category}] ${strat.title}`);
        }
    }

    console.log("\n✨ BASE DE DATOS COGNITIVA V2000 LISTA.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
