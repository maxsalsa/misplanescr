const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- BANCO DE MATERIAS PREMIUM (CON UI METADATA) ---
const CATALOGO = [
    { nombre: "Matemáticas", icono: "📐", color: "blue", nivel: "7°", enfoque: "Resolución de Problemas" },
    { nombre: "Ciencias", icono: "🧬", color: "green", nivel: "8°", enfoque: "Indagación Científica" },
    { nombre: "Español", icono: "📚", color: "yellow", nivel: "9°", enfoque: "Lectoescritura Crítica" },
    { nombre: "Estudios Sociales", icono: "🌍", color: "orange", nivel: "10°", enfoque: "Pensamiento Crítico" },
    { nombre: "Inglés", icono: "🗣️", color: "purple", nivel: "11°", enfoque: "Action Oriented Approach" },
    { nombre: "Ciberseguridad (Técnico)", icono: "🛡️", color: "slate", nivel: "12°", enfoque: "Hands-on Labs" },
    { nombre: "Diseño Publicitario (Técnico)", icono: "🎨", color: "pink", nivel: "10°", enfoque: "Project Based Learning" },
    { nombre: "Educación Física", icono: "🏅", color: "red", nivel: "Todos", enfoque: "Salud Integral" }
];

async function main() {
    console.log("🌟 DESPLEGANDO CATÁLOGO PREMIUM...");
    
    // Super Admin
    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    let contador = 0;

    for (const item of CATALOGO) {
        const isTecnico = item.nombre.includes("Técnico");
        const modalidad = isTecnico ? "TECNICA" : "ACADEMICA";

        // 1. Crear Asignatura
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: item.nombre, educationLevel: "SECUNDARIA", modalityType: modalidad }},
            update: {},
            create: { name: item.nombre, code: item.nombre.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: modalidad }
        });

        // 2. Crear Unidad Rica
        const uTitle = `Unidad Maestra: ${item.nombre} en Acción`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: item.nivel, subjectId: subject.id } });

        // --- A. DIAGNÓSTICO MEP 2011 (VARIEDAD REAL) ---
        
        // A1. R.R.P.C.C. (Cognitivo) 
        await prisma.assessment.create({
            data: {
                title: `Diagnóstico R.R.P.C.C. ${item.icono}`,
                type: "DIAGNOSTICO",
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    metodo: "R.R.P.C.C.",
                    pasos: ["Recordar ideas previas", "Resumir en una frase", "Preguntar dudas", "Conectar con la vida real", "Comentar sentimientos"],
                    ui_color: item.color
                }
            }
        });

        // A2. Autoasesoría (Socioafectivo) 
        await prisma.assessment.create({
            data: {
                title: `Autoasesoría: Mis Actitudes ${item.icono}`,
                type: "DIAGNOSTICO",
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    metodo: "Autoasesoría Anónima",
                    casos: ["Caso A: Me frustro rápido", "Caso B: Me gusta el reto"],
                    instruccion: "Identificarse con un caso para detectar barreras.",
                    ui_color: item.color
                }
            }
        });

        // A3. Lista de Cotejo Psicomotora (Si aplica) [cite: 154]
        if (isTecnico || item.nombre === "Educación Física" || item.nombre === "Artes") {
             await prisma.assessment.create({
                data: {
                    title: `Lista Psicomotora: Destrezas ${item.icono}`,
                    type: "LISTA_COTEJO",
                    userId: admin.id,
                    subjectId: subject.id,
                    rubric: { items: ["Coordinación Viso-Manual", "Uso de Herramientas", "Postura Ergónomica"] },
                    content: { ambito: "Psicomotor", ui_color: item.color }
                }
            });
        }

        // --- B. PLANES DE PRÁCTICA (3 SABORES) ---
        
        // Sabor 1: STEAM / Maker
        await prisma.lessonPlan.create({
            data: {
                title: `Plan STEAM: Prototipado en ${item.nombre}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    icono: "🛠️",
                    enfoque: "STEAM & Maker",
                    estrategias: {
                        inicio: "Reto de Ingeniería Inversa...",
                        desarrollo: "Construcción de modelo físico...",
                        pausa_activa: { tipo: "Gimnasia Cerebral", ejercicio: "Gateo Cruzado" },
                        cierre: "Feria de Prototipos..."
                    },
                    adecuaciones: {
                        acceso: ["Material Concreto"],
                        alta_dotacion: ["Liderazgo de Proyecto"]
                    },
                    rubrica: [1,2,3,4,5,6].map(i => ({ indicador: `Indicador ${i}`, niveles: {1:"Cita", 2:"Describe", 3:"Construye"} }))
                }
            }
        });

        // Sabor 2: Gamificación
        await prisma.lessonPlan.create({
            data: {
                title: `Plan Gamificado: Misión ${item.nombre}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    icono: "🎮",
                    enfoque: "Gamificación",
                    estrategias: {
                        inicio: "Narrativa: El Misterio del Concepto Perdido...",
                        desarrollo: "Desbloqueo de niveles mediante ejercicios...",
                        pausa_activa: { tipo: "Estatuas", duracion: "3 min" },
                        cierre: "Entrega de Insignias..."
                    },
                    rubrica: [1,2,3,4,5,6].map(i => ({ indicador: `Indicador ${i}`, niveles: {1:"Nivel 1", 2:"Nivel 2", 3:"Nivel Master"} }))
                }
            }
        });

        // --- C. INSTRUMENTOS VARIADOS ---
        
        // Diario del Docente 
        await prisma.assessment.create({
            data: {
                title: `Diario Reflexivo: ${item.nombre}`,
                type: "DIARIO", // Mapear a OTRO en BD si no existe el enum
                userId: admin.id,
                subjectId: subject.id,
                content: { preguntas: ["¿Qué funcionó hoy?", "¿Qué debo ajustar?", "¿Hubo incidentes críticos?"], ui_color: "slate" }
            }
        });

        // Portafolio de Evidencias [cite: 485]
        await prisma.assessment.create({
            data: {
                title: `Portafolio Digital: ${item.nombre}`,
                type: "PORTAFOLIO",
                userId: admin.id,
                subjectId: subject.id,
                content: { secciones: ["Mis Borradores", "Mis Mejores Trabajos", "Mi Reflexión"], ui_color: item.color }
            }
        });

        contador++;
        process.stdout.write("🌽");
    }

    console.log(`\n\n✅ PROTOCOLO CORNUCOPIA FINALIZADO.`);
    console.log(`   🌟 ${contador} Asignaturas Premium Inyectadas.`);
    console.log(`   🌟 Diagnósticos MEP 2011 (RRPCC, Autoasesoría).`);
    console.log(`   🌟 Planes STEAM y Gamificados.`);
    console.log(`   🌟 UI Metadata (Iconos y Colores) lista para el Frontend.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());