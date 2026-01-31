const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- BIG DATA: EL MULTIVERSO MEP ---
const NIVELES = {
    PREESCOLAR: ["Materno", "Transición"],
    PRIMARIA: ["1°", "2°", "3°", "4°", "5°", "6°"],
    SECUNDARIA: ["7°", "8°", "9°", "10°", "11°"],
    TECNICA: ["10°", "11°", "12°"]
};

const MATERIAS_CORE = [
    { n: "Matemáticas", m: "ACADEMICA", mundos: ["PRIMARIA", "SECUNDARIA"] },
    { n: "Español", m: "ACADEMICA", mundos: ["PRIMARIA", "SECUNDARIA"] },
    { n: "Ciencias", m: "ACADEMICA", mundos: ["PRIMARIA", "SECUNDARIA"] },
    { n: "Estudios Sociales", m: "ACADEMICA", mundos: ["PRIMARIA", "SECUNDARIA"] },
    { n: "Inglés", m: "ACADEMICA", mundos: ["PRIMARIA", "SECUNDARIA"] },
    { n: "Autonomía", m: "PREESCOLAR", mundos: ["PREESCOLAR"] },
    { n: "Turismo", m: "TECNICA", mundos: ["TECNICA"] },
    { n: "Ciberseguridad", m: "TECNICA", mundos: ["TECNICA"] },
    { n: "Contabilidad", m: "TECNICA", mundos: ["TECNICA"] },
    { n: "Artes Industriales", m: "TECNICA", mundos: ["SECUNDARIA"] } // 7-9
];

// GENERADOR DE CONTENIDO "DATA MINING"
function mineData(materia, nivel, tipo) {
    if (tipo === "GTA") {
        return {
            fases: [
                { nombre: "Me preparo", detalle: "Materiales y lugar." },
                { nombre: "Voy a recordar", detalle: `Actividad de repaso sobre ${materia}.` },
                { nombre: "Pongo en práctica", detalle: "Resolución de ejercicios." }
            ],
            autoregulacion: ["¿Leí las indicaciones?", "¿Revisé mi trabajo?"]
        };
    }
    if (tipo === "PORTAFOLIO") {
        return {
            secciones: ["Evidencia 1: Mapa Mental", "Evidencia 2: Ensayo", "Reflexión Semanal"],
            formato: "Digital (Drive/Teams)"
        };
    }
    return {};
}

async function main() {
    console.log("🌌 INICIANDO MINERÍA DE DATOS DEL MULTIVERSO MEP...");

    // 1. USUARIO SUPER ADMIN (CON SEGURIDAD)
    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: { twoFactorEnabled: true, forceChangePassword: false }, // Ya configurado
        create: { 
            email: "max@misplanescr.com", 
            password: "HASHED_PASSWORD_SECURE", // En producción usar bcrypt
            name: "Max Salazar", 
            role: "SUPER_ADMIN", 
            subscriptionStatus: "GOD_TIER",
            twoFactorEnabled: true,
            forceChangePassword: true 
        }
    });

    let totalRecursos = 0;

    // 2. ITERACIÓN MASIVA POR MUNDOS
    for (const mat of MATERIAS_CORE) {
        for (const mundo of mat.mundos) {
            const listaNiveles = NIVELES[mundo] || [];
            const nivelEducativo = mundo === "PREESCOLAR" ? "PREESCOLAR" : (mundo === "PRIMARIA" ? "PRIMARIA" : "SECUNDARIA");
            
            // Crear Asignatura
            const subject = await prisma.subject.upsert({
                where: { name_educationLevel_modalityType: { name: mat.n, educationLevel: nivelEducativo, modalityType: mat.m }},
                update: {},
                create: { name: mat.n, code: mat.n.substring(0,3).toUpperCase(), educationLevel: nivelEducativo, modalityType: mat.m }
            });

            for (const nivel of listaNiveles) {
                // Unidad Base
                const uTitle = `Unidad Global: ${mat.n} (${nivel})`;
                const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: nivel, subjectId: subject.id } });

                // A. INYECCIÓN DE GTAs (GUÍAS TRABAJO AUTÓNOMO)
                await prisma.assessment.create({
                    data: {
                        title: `GTA #${Math.floor(Math.random()*100)}: ${mat.n}`,
                        type: "GTA",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: mineData(mat.n, nivel, "GTA")
                    }
                });

                // B. INYECCIÓN DE PORTAFOLIOS
                await prisma.assessment.create({
                    data: {
                        title: `Portafolio de Evidencias ${nivel}`,
                        type: "PORTAFOLIO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: mineData(mat.n, nivel, "PORTAFOLIO")
                    }
                });

                // C. PLANES DE PRÁCTICA (VARIEDAD A/B)
                await prisma.lessonPlan.create({
                    data: {
                        title: `Plan STEAM: ${mat.n} ${nivel}`,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            unidad: uTitle,
                            enfoque: "STEAM / Gamificación",
                            estrategias: { inicio: "Reto", desarrollo: "Proyecto", cierre: "Feria" },
                            rubrica: [{ indicador: "Criterio 1", niveles: {1:"Inicial", 2:"Intermedio", 3:"Avanzado"} }]
                        }
                    }
                });

                // D. DIAGNÓSTICO (MEP 2011)
                await prisma.assessment.create({
                    data: {
                        title: `Diagnóstico Integral: ${mat.n}`,
                        type: "DIAGNOSTICO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: { dimensiones: ["Cognitiva", "Socioafectiva", "Psicomotora"] }
                    }
                });

                // E. COTIDIANO / TAREA CORTA
                await prisma.assessment.create({
                    data: {
                        title: `Trabajo Cotidiano: Práctica ${nivel}`,
                        type: "COTIDIANO",
                        userId: admin.id,
                        subjectId: subject.id,
                        rubric: { criterios: ["Puntualidad", "Orden", "Contenido"], escala: "1-5 pts" },
                        content: { instruccion: "Realizar en clase." }
                    }
                });

                totalRecursos += 5;
                process.stdout.write("💎");
            }
        }
    }

    console.log(`\n\n✅ MULTIVERSO MEP COMPLETADO.`);
    console.log(`   🛡️ Seguridad: Usuarios actualizados con campos 2FA.`);
    console.log(`   🌌 Recursos: ${totalRecursos} inyectados (GTA, Portafolios, Planes).`);
    console.log(`   🌍 Cobertura: Desde Materno hasta 12° Técnico.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());