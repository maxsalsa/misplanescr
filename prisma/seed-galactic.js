const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- GENERADOR DE ÍTEMS REALES (BANCO DE PREGUNTAS) ---
const BANCO_ITEMS = {
    MATEMATICAS: [
        { tipo: "Selección Única", nivel: "Conocimiento", p: "¿Cuál es el resultado de 5²?", r: "25", d: ["10", "15"] },
        { tipo: "Respuesta Corta", nivel: "Aplicación", p: "Calcule el área de un triángulo de base 4cm y altura 3cm.", r: "6 cm²" },
        { tipo: "Resolución de Problemas", nivel: "Razonamiento", p: "Si Juan tiene el doble de edad que Ana...", r: "Planteo de ecuación..." }
    ],
    CIENCIAS: [
        { tipo: "Selección Única", nivel: "Conocimiento", p: "¿Unidad básica de la vida?", r: "Célula", d: ["Tejido", "Átomo"] },
        { tipo: "Correspondencia (Pareo)", nivel: "Aplicación", p: "Asocie cada organela con su función.", r: "Mitocondria-Energía, Núcleo-Control" },
        { tipo: "Desarrollo", nivel: "Razonamiento", p: "Explique 2 consecuencias del cambio climático.", r: "Rúbrica de 5 pts" }
    ],
    ESTUDIOS_SOCIALES: [
        { tipo: "Selección Única", nivel: "Conocimiento", p: "¿Fecha de la Independencia?", r: "15 Setiembre 1821", d: ["11 Abril", "25 Julio"] },
        { tipo: "Identificación", nivel: "Aplicación", p: "Ubique en el mapa las cordilleras.", r: "Mapa Mudo" },
        { tipo: "Ensayo Corto", nivel: "Razonamiento", p: "Analice el impacto de la abolición del ejército.", r: "Argumentación crítica" }
    ]
};

// --- GENERADOR DE TABLA DE ESPECIFICACIONES (EL CÁLCULO) ---
function generarTablaSpecs(materia) {
    return {
        total_puntos: 40,
        porcentaje: "20%",
        desglose: [
            { objetivo: "Tema 1: Conceptos Básicos", lecciones: 4, puntos: 10, nivel: "Conocimiento" },
            { objetivo: "Tema 2: Aplicación Práctica", lecciones: 8, puntos: 20, nivel: "Aplicación" },
            { objetivo: "Tema 3: Análisis", lecciones: 4, puntos: 10, nivel: "Razonamiento" }
        ]
    };
}

async function main() {
    console.log("🌌 GALACTIC ENGINE: INYECTANDO INTELIGENCIA PSICOMÉTRICA...");

    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Sin Admin."); return; }

    const subjects = await prisma.subject.findMany();
    console.log(`   -> Potenciando ${subjects.length} Asignaturas con Pruebas Estandarizadas...`);

    let count = 0;

    for (const sub of subjects) {
        
        // Determinar qué banco de preguntas usar
        let items = BANCO_ITEMS.MATEMATICAS; // Default
        const n = sub.name.toUpperCase();
        if (n.includes("CIEN") || n.includes("BIO") || n.includes("FIS")) items = BANCO_ITEMS.CIENCIAS;
        if (n.includes("SOC") || n.includes("CIV") || n.includes("HIS")) items = BANCO_ITEMS.ESTUDIOS_SOCIALES;

        // 1. LA PRUEBA ESCRITA COMPLETA (CON TABLA)
        await prisma.assessment.create({
            data: {
                title: `Prueba Parcial I Periodo (Con Tabla Specs): ${sub.name}`,
                type: "EXAMEN",
                userId: admin.id,
                subjectId: sub.id,
                specsTable: generarTablaSpecs(sub.name), // ¡AQUÍ ESTÁ LA MAGIA!
                content: {
                    instrucciones_generales: "Utilice bolígrafo azul o negro. No use corrector.",
                    parte_1_seleccion: items.filter(i => i.tipo === "Selección Única"),
                    parte_2_respuesta_corta: items.filter(i => i.tipo === "Respuesta Corta" || i.tipo === "Identificación"),
                    parte_3_desarrollo: items.filter(i => i.tipo.includes("Desarrollo") || i.tipo.includes("Problemas")),
                    solucionario_docente: items.map(i => ({ p: i.p, r: i.r }))
                }
            }
        });

        // 2. PLANTILLA INTELIGENTE DE ASISTENCIA
        await prisma.assessment.create({
            data: {
                title: `Registro Automatizado de Asistencia: ${sub.name}`,
                type: "COTIDIANO",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    tipo: "ADMIN_TOOL",
                    formato: "Hoja de Cálculo Compatible",
                    columnas: ["ID", "Estudiante", "Semana 1", "Semana 2", "Semana 3", "Semana 4", "% Asistencia"],
                    formulas: "Promedio Automático al descargar"
                }
            }
        });

        // 3. TAREA CORTA DIFERENCIADA (ADE)
        await prisma.assessment.create({
            data: {
                title: `Tarea Corta (Adecuación Curricular): ${sub.name}`,
                type: "TAREA",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    enfoque: "Diseño Universal (DUA)",
                    actividad: "Mapa Conceptual con imágenes (Apoyo Visual)",
                    evaluacion: "Lista de Cotejo Simplificada"
                }
            }
        });

        count += 3;
        if (count % 20 === 0) process.stdout.write("⭐");
    }

    console.log(`\n\n✅ PROTOCOLO GALACTIC FINALIZADO.`);
    console.log(`   🌌 Se inyectaron ${count} Instrumentos de Alta Precisión.`);
    console.log(`   🌌 Pruebas Escritas incluyen TABLAS DE ESPECIFICACIONES pre-calculadas.`);
    console.log(`   🌌 Registros de Asistencia listos para exportar.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());