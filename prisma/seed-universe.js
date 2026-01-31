const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UNIVERSO = [
    // --- 1. DIMENSIÓN ADMINISTRATIVA (LO QUE NADIE HACE PERO TODOS NECESITAN) ---
    {
        area: "Gestión Administrativa Docente",
        nivel: "Transversal",
        icono: "📁",
        recursos: [
            { t: "Acta de Reunión de Padres", tipo: "PLANTILLA_ADMIN", desc: "Formato oficial para entrega de notas y acuerdos." },
            { t: "Boleta de Incidencia Conductual", tipo: "ADMIN_TOOL", desc: "Registro de faltas leves, graves y gravísimas (Reglamento)." },
            { t: "Cuadro de Honor (Plantilla)", tipo: "OTRO", desc: "Diseño editable para estudiantes destacados." },
            { t: "Control de Activos del Aula", tipo: "LISTA_COTEJO", desc: "Inventario de pupitres, pizarra y equipo." }
        ]
    },
    // --- 2. DIMENSIÓN EXTRACURRICULAR (LA VIDA DEL COLEGIO) ---
    {
        area: "Vida Estudiantil y Eventos",
        nivel: "General",
        icono: "🎉",
        recursos: [
            { t: "FEA: Rúbrica de Canto y Baile", tipo: "RUBRICA", desc: "Evaluación para el Festival Estudiantil de las Artes." },
            { t: "Feria Científica: Bitácora", tipo: "PROYECTO", desc: "Guía paso a paso del método científico para estudiantes." },
            { t: "Gobierno Estudiantil: Cronograma", tipo: "PLAN_ANUAL", desc: "Calendario de elecciones y debates electorales." },
            { t: "Efemerides: Guion 15 de Setiembre", tipo: "OTRO", desc: "Protocolo completo del Acto Cívico (Minuto a minuto)." }
        ]
    },
    // --- 3. DIMENSIÓN INCLUSIÓN (LEY 7600 Y MÁS) ---
    {
        area: "Educación Inclusiva y DUA",
        nivel: "Especializada",
        icono: "💙",
        recursos: [
            { t: "Plan de Atención: Alta Dotación", tipo: "PLAN_INDIVIDUAL", desc: "Estrategias de enriquecimiento para talentos." },
            { t: "Adecuación de Acceso (Visión)", tipo: "GUIA_DIDACTICA", desc: "Ajustes de tamaño de letra y ubicación en aula." },
            { t: "Adecuación Significativa: Mate", tipo: "PLAN_MODIFICADO", desc: "Reducción de objetivos para nivel funcional." },
            { t: "Diccionario Básico de LESCO", tipo: "VIDEO_SEGURO", desc: "Video curado con señas básicas para el aula." }
        ]
    },
    // --- 4. DIMENSIÓN TÉCNICA AVANZADA (DUAL Y PASANTÍAS) ---
    {
        area: "Educación Dual y Empresa",
        nivel: "Técnica",
        icono: "🤝",
        recursos: [
            { t: "Bitácora de Pasantía", tipo: "LISTA_COTEJO", desc: "Control de horas y tareas en la empresa mentora." },
            { t: "Evaluación de la Empresa", tipo: "RUBRICA", desc: "Instrumento para que el jefe evalúe al estudiante." },
            { t: "Protocolo de Entrevista Laboral", tipo: "SIMULACION", desc: "Guía de Roleplay para preparación al empleo." }
        ]
    },
    // --- 5. DIMENSIÓN FUTURO (INNOVACIÓN 4.0) ---
    {
        area: "Innovación y Tecnología 4.0",
        nivel: "STEAM",
        icono: "🚀",
        recursos: [
            { t: "Prompt Engineering para Profes", tipo: "GUIA_DIDACTICA", desc: "Cómo usar IA para preparar clases (Ético)." },
            { t: "Ciudadanía Digital: Ciberbullying", tipo: "TALLER", desc: "Dinámica de prevención y huella digital." },
            { t: "Robótica: Reto LEGO/Arduino", tipo: "PROYECTO", desc: "Desafío de programación y mecánica básica." }
        ]
    }
];

async function main() {
    console.log("🌌 EJECUTANDO INYECCIÓN 'BIG BANG' EN EL MULTIVERSO...");
    
    // Obtener Admin (Max Salazar)
    const admin = await prisma.user.findFirst(); 

    let contador = 0;

    for (const dimension of UNIVERSO) {
        console.log(`   ✨ Creando Dimensión: ${dimension.area}`);

        // 1. Crear la "Asignatura" (Que en realidad es un Área de Gestión)
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: dimension.area, educationLevel: dimension.nivel, modalityType: "TRANSVERSAL" }},
            update: {},
            create: { 
                name: dimension.area, 
                code: dimension.area.substring(0,3).toUpperCase(), 
                educationLevel: dimension.nivel, 
                modalityType: "TRANSVERSAL" 
            }
        });

        // 2. Inyectar los Recursos Variados
        for (const res of dimension.recursos) {
            await prisma.assessment.create({
                data: {
                    title: res.t,
                    type: parseType(res.tipo),
                    userId: admin.id,
                    subjectId: subject.id,
                    content: {
                        descripcion: res.desc,
                        categoria: "Recurso Premium Universal",
                        uso_sugerido: "Descargar y editar según contexto institucional."
                    },
                    // Si es rúbrica, le metemos una genérica potente
                    rubric: res.tipo === "RUBRICA" ? { criterios: ["Desempeño", "Actitud", "Producto"], escala: "1-100" } : null
                }
            });
            contador++;
        }
    }

    console.log(`\n\n✅ PROTOCOLO UNIVERSO COMPLETADO.`);
    console.log(`   🌌 Se han creado ${contador} Nuevos Recursos de Alta Gama.`);
    console.log(`   🌌 Ahora el sistema cubre: FEA, Ferias, Actos Cívicos, Pasantías y Administración.`);
}

function parseType(t) {
    if (t.includes("RUBRICA")) return "RUBRICA";
    if (t.includes("EXAMEN")) return "EXAMEN";
    if (t.includes("LISTA")) return "LISTA_COTEJO";
    if (t.includes("TAREA")) return "TAREA";
    return "OTRO";
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());