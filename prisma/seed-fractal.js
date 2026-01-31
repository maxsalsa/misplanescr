const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- DICCIONARIO EXPANDIDO DE ESPECIFICIDAD ---
const ADN_MATERIAS = [
    // TÉCNICA INDUSTRIAL
    { 
        nombre: "Dibujo Técnico", 
        area: "TECNICA", 
        niveles: ["10°", "11°", "12°"],
        herramientas: ["Escuadras", "AutoCAD", "Escalímetro"],
        verbo: "Traza/Diseña",
        instrumento: "Rúbrica de Precisión y Calidad de Línea"
    },
    { 
        nombre: "Electrotecnia", 
        area: "TECNICA", 
        niveles: ["10°", "11°"],
        herramientas: ["Multímetro", "Protoboard", "Cables"],
        verbo: "Ensambla/Mide",
        instrumento: "Lista de Cotejo de Seguridad Eléctrica"
    },
    
    // TÉCNICA SERVICIOS (NUEVO)
    { 
        nombre: "Turismo Ecológico", 
        area: "TECNICA", 
        niveles: ["10°", "11°"],
        herramientas: ["Guión de Tour", "Binoculares", "Mapa"],
        verbo: "Guía/Interpreta",
        instrumento: "Escala de Desempeño en Guidado"
    },

    // CINDEA (ADULTOS)
    { 
        nombre: "Módulo CINDEA: Matemáticas", 
        area: "CINDEA", 
        niveles: ["I Nivel", "II Nivel"],
        herramientas: ["Calculadora", "Fichas de Trabajo"],
        verbo: "Resuelve/Aplica",
        instrumento: "Guía de Trabajo Andragógica"
    },

    // COMPLEMENTARIAS Y ARTÍSTICAS
    { 
        nombre: "Educación Musical", 
        area: "ACADEMICA", 
        niveles: ["7°", "8°"],
        herramientas: ["Instrumentos", "Partituras"],
        verbo: "Ejecuta/Aprecia",
        instrumento: "Rúbrica de Ejecución Instrumental"
    },
    { 
        nombre: "Artes Plásticas", 
        area: "ACADEMICA", 
        niveles: ["7°", "8°", "9°"],
        herramientas: ["Pinceles", "Arcilla", "Bocetos"],
        verbo: "Crea/Expresa",
        instrumento: "Rúbrica de Creatividad y Técnica"
    },
    { 
        nombre: "Educación Física", 
        area: "ACADEMICA", 
        niveles: ["Todos"],
        herramientas: ["Balones", "Conos", "Cronómetro"],
        verbo: "Ejercita/Coordina",
        instrumento: "Lista de Cotejo de Habilidades Motoras"
    }
];

async function main() {
    console.log("💎 INYECTANDO 'CARNITA' DOCENTE ESPECÍFICA (VERSIÓN CORREGIDA)...");

    // CORRECCIÓN: SE AGREGA PASSWORD AL UPSERT
    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { 
            email: "max@misplanescr.com", 
            password: "SECURE_HASH_123", // <-- CAMPO FALTANTE AGREGADO
            role: "SUPER_ADMIN", 
            subscriptionStatus: "GOD_TIER" 
        }
    });

    let contador = 0;

    for (const adn of ADN_MATERIAS) {
        let modalidadBD = adn.area === "TECNICA" ? "TECNICA" : "ACADEMICA";

        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: adn.nombre, educationLevel: "SECUNDARIA", modalityType: modalidadBD }},
            update: {},
            create: { name: adn.nombre, code: adn.nombre.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: modalidadBD }
        });

        for (const nivel of adn.niveles) {
            const uTitle = `Unidad Especializada: ${adn.nombre} (${nivel})`;
            const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: nivel, subjectId: subject.id } });

            // A. PLAN DE PRÁCTICA (CONTEXTUALIZADO)
            await prisma.lessonPlan.create({
                data: {
                    title: `Plan ${adn.verbo}: ${uTitle}`,
                    userId: admin.id,
                    status: "PUBLISHED",
                    content: {
                        unidad: uTitle,
                        enfoque: "Aprendizaje Situado",
                        recursos_clave: adn.herramientas,
                        estrategias: {
                            inicio: `Demostración de uso de ${adn.herramientas[0]}.`,
                            desarrollo: `Práctica guiada de ${adn.verbo}.`,
                            pausa_activa: { actividad: "Pausa Activa", duracion: "5 min" },
                            cierre: "Evaluación de resultados."
                        },
                        rubrica: [
                            { indicador: "Técnica", niveles: {1:"Bajo", 2:"Medio", 3:"Alto"} },
                            { indicador: "Seguridad", niveles: {1:"Riesgoso", 2:"Seguro", 3:"Preventivo"} }
                        ]
                    }
                }
            });

            // B. INSTRUMENTO ESPECÍFICO
            await prisma.assessment.create({
                data: {
                    title: `${adn.instrumento}: ${nivel}`,
                    type: adn.area === "TECNICA" ? "LISTA_COTEJO" : "RUBRICA", 
                    userId: admin.id,
                    subjectId: subject.id,
                    content: {
                        instruccion: `Evaluar el uso de ${adn.herramientas[0]}.`,
                        materiales: adn.herramientas
                    },
                    rubric: { criterios: ["Uso correcto", "Limpieza", "Tiempo"], escala: "1-10" }
                }
            });

            // C. GUÍA RÁPIDA (VISUAL)
            await prisma.assessment.create({
                data: {
                    title: `Guía Visual: Uso de ${adn.herramientas[0]}`,
                    type: "OTRO",
                    userId: admin.id,
                    subjectId: subject.id,
                    content: { tipo: "Infografía", descripcion: "Pasos clave." }
                }
            });

            contador += 3;
            process.stdout.write("💎");
        }
    }

    console.log(`\n\n✅ PROTOCOLO FRACTAL FINALIZADO.`);
    console.log(`   🌟 Se inyectaron ${contador} Recursos Específicos.`);
    console.log(`   🌟 Incluye: Turismo, Artes, Música, Educación Física y CINDEA.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());