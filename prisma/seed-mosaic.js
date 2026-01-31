const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- BANCO DE NICHOS (ÁREAS ESPECÍFICAS) ---

const MOSAICO = [
    // 1. EDUCACIÓN RELIGIOSA (ERE)
    {
        nombre: "Educación Religiosa",
        tipo: "ACADEMICA",
        nivel: "SECUNDARIA",
        icono: "🕊️",
        unidad: "Proyecto de Vida y Trascendencia",
        actividad: "Elaboración del Árbol de Valores",
        evaluacion: "Diario Reflexivo (Cualitativo)"
    },
    // 2. AFECTIVIDAD Y SEXUALIDAD
    {
        nombre: "Afectividad y Sexualidad Integral",
        tipo: "ACADEMICA",
        nivel: "TRANSVERSAL",
        icono: "❤️",
        unidad: "Relaciones Interpersonales Sanas",
        actividad: "Análisis de Caso: Límites y Respeto",
        evaluacion: "Guía de Diálogo Respetuoso"
    },
    // 3. INFORMÁTICA EDUCATIVA (LIE/PRONIE)
    {
        nombre: "Informática Educativa",
        tipo: "ACADEMICA",
        nivel: "PRIMARIA",
        icono: "💻",
        unidad: "Pensamiento Computacional con Scratch",
        actividad: "Reto de Programación: Historias Interactivas",
        evaluacion: "Rúbrica de Lógica de Programación"
    },
    // 4. CONTABILIDAD (TÉCNICA PURA)
    {
        nombre: "Contabilidad y Finanzas",
        tipo: "TECNICA",
        nivel: "10°",
        icono: "📊",
        unidad: "Ciclo Contable y NIIF",
        actividad: "Práctica: Asientos de Diario y Mayorización",
        evaluacion: "Hoja de Trabajo Contable (Balance)"
    },
    // 5. DESARROLLO DE SOFTWARE (TÉCNICA PURA)
    {
        nombre: "Desarrollo de Software",
        tipo: "TECNICA",
        nivel: "11°",
        icono: "👨‍💻",
        unidad: "Metodologías Ágiles (SCRUM)",
        actividad: "Simulación de Daily Stand-up y Kanban",
        evaluacion: "Rúbrica de Trabajo Colaborativo Ágil"
    },
    // 6. PREESCOLAR (MOTORA FINA)
    {
        nombre: "Desarrollo Psicomotriz",
        tipo: "PREESCOLAR",
        nivel: "Transición",
        icono: "✂️",
        unidad: "Coordinación Viso-Manual",
        actividad: "Taller de Recorte y Rasgado",
        evaluacion: "Lista de Cotejo Observacional (Logrado/En Proceso)"
    }
];

async function main() {
    console.log("🧩 MOSAICO: RELLENANDO LOS ÚLTIMOS ESPACIOS DEL UNIVERSO...");

    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Sin Admin."); return; }

    for (const pieza of MOSAICO) {
        
        // 1. Crear Asignatura Específica
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: pieza.nombre, educationLevel: pieza.nivel, modalityType: pieza.tipo }},
            update: {},
            create: { name: pieza.nombre, code: pieza.nombre.substring(0,4).toUpperCase(), educationLevel: pieza.nivel, modalityType: pieza.tipo }
        });

        const uTitle = `Unidad Mosaico: ${pieza.unidad}`;
        
        // 2. PLAN DE MEDIACIÓN ESPECIALIZADO
        await prisma.lessonPlan.create({
            data: {
                title: `Planificación: ${pieza.unidad}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    enfoque: "Especialidad / Nicho",
                    icono: pieza.icono,
                    estrategias: {
                        inicio: "Activación vivencial o técnica.",
                        desarrollo: pieza.actividad,
                        cierre: "Socialización de resultados."
                    },
                    rubrica: [
                        { indicador: "Dominio Específico", niveles: {1:"Básico", 2:"Intermedio", 3:"Avanzado"} }
                    ]
                }
            }
        });

        // 3. INSTRUMENTO DE EVALUACIÓN "AD HOC"
        // Aquí es donde garantizamos que NO SE REPITE. Contabilidad recibe hojas contables, no ensayos.
        await prisma.assessment.create({
            data: {
                title: `Instrumento: ${pieza.evaluacion}`,
                type: pieza.tipo === "PREESCOLAR" ? "LISTA_COTEJO" : "RUBRICA", 
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    ambito: pieza.nombre,
                    instruccion: "Aplicar según normativa específica.",
                    herramientas_necesarias: pieza.tipo === "TECNICA" ? ["Calculadora", "Software", "Normativa"] : ["Material Concreto"]
                }
            }
        });

        // 4. RECURSO DE APOYO (PPT O GUÍA)
        await prisma.assessment.create({
            data: {
                title: `Recurso de Apoyo: ${pieza.unidad}`,
                type: "OTRO",
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    tipo_recurso: "GUIA_DIDACTICA",
                    descripcion: `Material de soporte para el tema: ${pieza.unidad}`,
                    formato: "PDF Vectorial"
                }
            }
        });

        process.stdout.write(pieza.icono);
    }

    console.log(`\n\n✅ PROTOCOLO MOSAICO FINALIZADO.`);
    console.log(`   🌟 Se cubrieron nichos clave: Religión, Sexualidad, Informática.`);
    console.log(`   🌟 Se profundizó en Técnica: Contabilidad y Software.`);
    console.log(`   🌟 Se respetó Preescolar: Evaluación cualitativa pura.`);
    console.log(`   🌟 EL UNIVERSO AULAPLAN ES AHORA UN ECOSISTEMA TOTAL.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());