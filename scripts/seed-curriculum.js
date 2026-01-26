const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// OFFICIAL MEP DATA (Extracted from lib/mep-data.js)
const CURRICULUM_BATCH = [
    // -------------------------------------------------------------------------
    // PRIMARY
    // -------------------------------------------------------------------------
    {
        program_name: "Estudios Sociales",
        grade_level: "4",
        raw_content: JSON.stringify({
            "I Periodo": {
                "Estudios Sociales": [{
                    id: "soc_4_1",
                    aprendizaje: "Reconocer las sociedades antiguas de Costa Rica (Cacicazgos).",
                    saberes: ["Modo de vida", "Organización social", "Legado cultural"],
                    indicadores: ["Describe la organización social.", "Identifica el legado artístico.", "Valora el aporte indígena."]
                }]
            }
        })
    },

    // -------------------------------------------------------------------------
    // SECONDARY ACADEMIC (7-11)
    // -------------------------------------------------------------------------
    {
        program_name: "Español",
        grade_level: "7",
        raw_content: JSON.stringify({
            "I Periodo": {
                "Español": [{
                    id: "esp_7_1",
                    aprendizaje: "Analizar textos literarios del género cuento.",
                    saberes: ["Género literario: Cuento", "Narrador", "Código apreciativo"],
                    indicadores: ["Identifica características del cuento.", "Reconoce tipos de narrador.", "Infiere el código apreciativo."]
                }]
            }
        })
    },
    {
        program_name: "Matemáticas",
        grade_level: "10",
        raw_content: JSON.stringify({
            "I Periodo": {
                "Matemáticas": [{
                    id: "mat_10_1",
                    aprendizaje: "Identificar y representar circunferencias.",
                    saberes: ["Circunferencia", "Centro", "Radio", "Ecuación"],
                    indicadores: ["Reconoce la ecuación algebraicamente.", "Representa gráficamente la circunferencia."]
                }]
            }
        })
    },

    // -------------------------------------------------------------------------
    // TECHNICAL (Desarrollo Web) - THE FLAGSHIP
    // -------------------------------------------------------------------------
    {
        program_name: "Desarrollo Web",
        grade_level: "10",
        raw_content: JSON.stringify({
            "I Periodo": {
                "Tecnologías de Información": [{
                    unit: "Unidad 1: Fundamentos de TI",
                    aprendizaje: "Reconocer componentes básicos de cómputo.",
                    saberes: ["Hardware/Software", "Sistemas Operativos"],
                    indicadores: ["Identifica componentes.", "Describe funciones."]
                }],
                "Programación Web": [{
                    unit: "Unidad 2: HTML y Estructura",
                    aprendizaje: "Construir páginas web utilizando HTML.",
                    saberes: ["Etiquetas semánticas", "Enlaces", "Listas"],
                    indicadores: ["Estructura páginas funcionales.", "Utiliza etiquetas correctamente."]
                }]
            }
        })
    }
];

async function main() {
    console.log('🚀 INICIANDO INYECCIÓN DE ADN CURRICULAR (MEP) ...');

    // CLEAR EXISTING (To avoid duplicates in this demo phase)
    await prisma.mep_programs_core.deleteMany({});
    console.log('🧹 Tabla mep_programs_core limpiada.');

    for (const prog of CURRICULUM_BATCH) {
        await prisma.mep_programs_core.create({
            data: {
                program_name: prog.program_name,
                grade_level: prog.grade_level,
                raw_content: prog.raw_content
            }
        });
        console.log(`✅ Inyectado: ${prog.program_name} - Nivel ${prog.grade_level}`);
    }

    console.log('🏁 INYECCIÓN COMPLETADA. Base de datos curricular lista.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
