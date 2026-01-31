const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- DATA NEBULA: INNOVACIÓN Y VARIEDAD ---
const NEBULA_CLUSTERS = [
    {
        area: "STEAM & Maker",
        temas: [
            { nombre: "Ingeniería: Brazo Hidráulico", nivel: "9° Año", actividad: "Construcción con jeringas y cartón", tipo: "PROYECTO" },
            { nombre: "Física: Cohetes de Agua", nivel: "10° Año", actividad: "Lanzamiento y cálculo de parábola", tipo: "TRABAJO_COTIDIANO" },
            { nombre: "Tecnología: Circuitos en Papel", nivel: "7° Año", actividad: "Uso de cinta de cobre y LEDs", tipo: "TAREA_CORTA" }
        ]
    },
    {
        area: "Laboratorio de Idiomas (Conversacional)",
        temas: [
            { nombre: "English: Tourist Guide Roleplay", nivel: "11° Año", actividad: "Simulation of a tour in Manuel Antonio", tipo: "RUBRICA_ORAL" },
            { nombre: "Français: Commander au Restaurant", nivel: "8° Año", actividad: "Dialogue avec le serveur", tipo: "TRABAJO_COTIDIANO" },
            { nombre: "Italiano: La Mia Famiglia", nivel: "10° Año", actividad: "Presentazione orale con foto", tipo: "TAREA_CORTA" }
        ]
    },
    {
        area: "Cultura e Identidad Tica",
        temas: [
            { nombre: "Arte: Mascaradas de Barva", nivel: "Primaria", actividad: "Taller de máscaras con material reciclado", tipo: "PROYECTO" },
            { nombre: "Música: Calypso Limonense", nivel: "Secundaria", actividad: "Análisis rítmico y composición", tipo: "TRABAJO_COTIDIANO" },
            { nombre: "Literatura: Leyendas de Miedo", nivel: "7° Año", actividad: "Dramatización de La Segua", tipo: "RUBRICA_DRAMA" }
        ]
    },
    {
        area: "Emprendedurismo (Soft Skills)",
        temas: [
            { nombre: "Negocios: Mi Primera StartUp", nivel: "12° Técnico", actividad: "Diseño de Business Model Canvas", tipo: "PROYECTO" },
            { nombre: "Finanzas: Presupuesto Personal", nivel: "10° Año", actividad: "Hoja de cálculo de gastos reales", tipo: "TAREA_CORTA" },
            { nombre: "Liderazgo: Resolución de Conflictos", nivel: "Transversal", actividad: "Estudio de casos en equipo", tipo: "RUBRICA_ACTITUDINAL" }
        ]
    }
];

// --- GENERADOR DE RÚBRICAS 1-3 (MEP STANDARD) ---
function generarRubrica(tema, tipo) {
    if (tipo.includes("ORAL")) {
        return [
            { indicador: "Pronunciación", niveles: { 1: "Errores frecuentes", 2: "Comprensible con errores", 3: "Clara y fluida" } },
            { indicador: "Vocabulario", niveles: { 1: "Limitado", 2: "Suficiente", 3: "Variado y preciso" } },
            { indicador: "Fluidez", niveles: { 1: "Pausas constantes", 2: "Algunas pausas", 3: "Natural" } }
        ];
    }
    if (tipo === "PROYECTO") {
        return [
            { indicador: "Construcción", niveles: { 1: "Incompleto", 2: "Funcional", 3: "Acabado profesional" } },
            { indicador: "Creatividad", niveles: { 1: "Copia modelo", 2: "Aporta detalles", 3: "Innovador" } },
            { indicador: "Presentación", niveles: { 1: "Confusa", 2: "Clara", 3: "Impactante" } }
        ];
    }
    // Default (Cotidiano/Tarea)
    return [
        { indicador: "Dominio del Tema", niveles: { 1: "Cita conceptos", 2: "Caracteriza ideas", 3: "Aplica correctamente" } },
        { indicador: "Puntualidad", niveles: { 1: "Entrega tardía", 2: "Entrega a tiempo", 3: "Tiempo y forma" } }
    ];
}

async function main() {
    console.log("🌌 NEBULA: INYECTANDO CÚMULOS DE INNOVACIÓN...");
    
    // Buscar Admin para asignar autoría
    const admin = await prisma.user.findFirst(); 
    if (!admin) { console.log("⚠️ Ejecute Seed Genesis primero."); return; }

    let contador = 0;

    for (const cluster of NEBULA_CLUSTERS) {
        console.log(`   ✨ Procesando Cúmulo: ${cluster.area}`);

        for (const tema of cluster.temas) {
            // 1. Crear Asignatura "Innovadora" (Si no existe, la crea)
            const subjectName = `${cluster.area}: ${tema.nombre.split(":")[0]}`; // Ej: "STEAM: Ingeniería"
            
            const subject = await prisma.subject.upsert({
                where: { name_educationLevel_modalityType: { name: subjectName, educationLevel: tema.nivel, modalityType: "INNOVACION" }},
                update: {},
                create: { name: subjectName, code: subjectName.substring(0,4).toUpperCase(), educationLevel: tema.nivel, modalityType: "INNOVACION" }
            });

            // 2. Crear la Evaluación Específica (Rúbrica/Tarea/Proyecto)
            const rubricaData = generarRubrica(tema.nombre, tema.tipo);
            
            await prisma.assessment.create({
                data: {
                    title: `${tema.tipo === 'PROYECTO' ? 'Proyecto' : 'Instrumento'}: ${tema.nombre.split(":")[1] || tema.nombre}`,
                    type: tema.tipo.includes("RUBRICA") || tema.tipo === "PROYECTO" ? "RUBRICA" : "TAREA",
                    userId: admin.id,
                    subjectId: subject.id,
                    // AQUÍ ESTÁ EL ORO: Rúbrica 1-3 MEP
                    rubric: rubricaData,
                    content: {
                        instruccion: tema.actividad,
                        valor_porcentual: tema.tipo === "PROYECTO" ? "20%" : "5%",
                        escala: "1 (Inicial), 2 (Intermedio), 3 (Avanzado)",
                        tipo_evidencia: "Producto Tangible / Desempeño"
                    }
                }
            });

            // 3. Crear Plan de Apoyo (Para que el profe sepa cómo hacerlo)
            await prisma.lessonPlan.create({
                data: {
                    title: `Guía Didáctica: ${tema.nombre}`,
                    userId: admin.id,
                    status: "PUBLISHED",
                    content: {
                        unidad: cluster.area,
                        estrategias: {
                            inicio: "Activación de conocimientos previos con video/pregunta.",
                            desarrollo: `Ejecución de: ${tema.actividad}`,
                            cierre: "Feria de logros o presentación."
                        },
                        indicadores_logro: rubricaData.map(r => r.indicador)
                    }
                }
            });

            contador++;
        }
    }

    console.log(`\n\n✅ PROTOCOLO NEBULA FINALIZADO.`);
    console.log(`   🌌 Se inyectaron ${contador} Nuevas Experiencias Educativas.`);
    console.log(`   🌌 Incluye: STEAM, Idiomas, Cultura y Emprendedurismo.`);
    console.log(`   🌌 Todas con Rúbricas Oficiales MEP (Escala 1-3).`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());