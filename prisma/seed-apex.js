const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- 1. BANCO DE DINÁMICAS (NO ABURRIDAS) ---
const DINAMICAS = [
    { titulo: "Escape Room Educativo", detalle: "Resolver pistas del tema para abrir el candado.", tipo: "Gamificación" },
    { titulo: "La Papa Caliente (Preguntas)", detalle: "Circular un objeto y responder al detenerse la música.", tipo: "Repaso" },
    { titulo: "Galería de Arte (Caminata)", detalle: "Pegar trabajos en paredes y rotar para comentar.", tipo: "Socialización" },
    { titulo: "Debate de Sombreros", detalle: "Usar sombreros de colores para defender posturas.", tipo: "Pensamiento Crítico" },
    { titulo: "Caza del Tesoro QR", detalle: "Buscar códigos QR en el aula con preguntas.", tipo: "Tecnología" }
];

// --- 2. BANCO DE EVIDENCIAS CREATIVAS (PRODUCTOS) ---
const EVIDENCIAS = [
    { nombre: "Podcast Educativo", desc: "Audio de 3 min explicando el tema." },
    { nombre: "Lapbook Interactivo", desc: "Carpeta desplegable con bolsillos y resumen." },
    { nombre: "Noticiero TV", desc: "Simulación de reporte de noticias sobre el tema." },
    { nombre: "Infografía Digital", desc: "Resumen visual usando Canva/Genially." },
    { nombre: "Maqueta 3D", desc: "Representación física con material reciclado." }
];

// --- 3. PLANTILLA DE ASISTENCIA Y ADMIN ---
const ADMIN_TOOLS = [
    { nombre: "Registro de Asistencia Mensual", tipo: "Plantilla Excel/PDF", icono: "📅" },
    { nombre: "Control de Entrega de Tareas", tipo: "Lista de Cotejo", icono: "✅" },
    { nombre: "Boleta de Salida al Baño", tipo: "Recurso de Aula", icono: "wc" }
];

async function main() {
    console.log("🚀 APEX ENGINE: INYECTANDO VARIEDAD MASIVA...");
    
    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Requiere Admin."); return; }

    // OBTENER TODAS LAS ASIGNATURAS EXISTENTES (DEL MULTIVERSO)
    const subjects = await prisma.subject.findMany();
    console.log(`   -> Enriqueciendo ${subjects.length} Asignaturas con 'Factor WOW'...`);

    let count = 0;

    for (const sub of subjects) {
        
        // A. INYECCIÓN DE DINÁMICAS (JUEGOS ADAPTADOS)
        // Seleccionamos una dinámica al azar para cada materia para variar
        const dinamica = DINAMICAS[Math.floor(Math.random() * DINAMICAS.length)];
        
        await prisma.lessonPlan.create({
            data: {
                title: `Dinámica Activa: ${dinamica.titulo} (${sub.name})`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: "Banco de Estrategias",
                    enfoque: dinamica.tipo,
                    icono: "🎮",
                    estrategias: {
                        preparacion: "Organizar el aula y materiales.",
                        desarrollo: dinamica.detalle + ` (Adaptado a ${sub.name})`,
                        cierre: "Reflexión sobre lo aprendido."
                    },
                    rubrica: []
                }
            }
        });

        // B. INYECCIÓN DE EVIDENCIA (PROYECTO CREATIVO)
        const evidencia = EVIDENCIAS[Math.floor(Math.random() * EVIDENCIAS.length)];
        
        await prisma.assessment.create({
            data: {
                title: `Proyecto Creativo: ${evidencia.nombre}`,
                type: "RUBRICA", // Se evalúa con rúbrica
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    instruccion: `Crear un ${evidencia.nombre} sobre el tema visto en clase.`,
                    descripcion: evidencia.desc,
                    herramientas: "Material concreto o digital."
                },
                rubric: { criterios: ["Creatividad", "Contenido", "Presentación"], escala: "1-100 pts" }
            }
        });

        // C. INYECCIÓN DE CONTROL DE ASISTENCIA (ESPECÍFICO)
        await prisma.assessment.create({
            data: {
                title: `Control de Asistencia y Tareas: ${sub.name}`,
                type: "COTIDIANO",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    tipo: "Administrativo",
                    formato: "Matriz de doble entrada",
                    columnas: ["Fecha", "Asistencia (P/A/T)", "Tarea Entregada", "Observaciones"]
                }
            }
        });

        // D. INYECCIÓN DE TRIVIA RÁPIDA (QUIZ)
        await prisma.assessment.create({
            data: {
                title: `Quiz Rápido: Repaso General ${sub.name}`,
                type: "EXAMEN",
                userId: admin.id,
                subjectId: sub.id,
                content: {
                    preguntas: ["Pregunta clave 1", "Pregunta clave 2", "Pregunta clave 3"],
                    formato: "Selección Única",
                    tiempo: "15 minutos"
                }
            }
        });

        count += 4;
        if (count % 20 === 0) process.stdout.write("💎");
    }

    console.log(`\n\n✅ PROTOCOLO APEX FINALIZADO.`);
    console.log(`   🌟 Se inyectaron ${count} Recursos Premium.`);
    console.log(`   🌟 Cada materia tiene ahora: Dinámicas, Proyectos, Asistencia y Quizzes.`);
    console.log(`   🌟 Variedad: Escape Rooms, Podcasts, Lapbooks y más.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());