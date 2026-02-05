const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("   🧹 Limpiando base de datos...");
  await prisma.syllabus.deleteMany();
  await prisma.user.deleteMany();

  // 1. RE-CREAR ADMIN (Porque borramos todo)
  const pass = await hash("admin", 10);
  await prisma.user.create({
    data: { 
        email: "max@aulaplan.com", 
        name: "Lic. Max Salazar", 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP" 
    }
  });
  console.log("   👑 Usuario Admin restaurado.");

  const curriculum = [];

  // ==========================================================================
  // A. ÁREA ACADÉMICA (7º - 11º)
  // ==========================================================================
  const nivelesAcad = ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"];
  const basicas = [
    "Matemáticas", "Español", "Ciencias", "Estudios Sociales", "Educación Cívica", 
    "Inglés Académico", "Educación Religiosa", "Educación Física", 
    "Artes Plásticas", "Educación Musical", "Hogar", "Artes Industriales"
  ];
  // Solo para 10 y 11
  const ciencias = ["Biología", "Física", "Química", "Filosofía", "Psicología", "Francés"];

  console.log("   -> Generando Académicas...");

  nivelesAcad.forEach(niv => {
    // Materias Básicas
    basicas.forEach(mat => {
        curriculum.push({
            m: "ACADEMICA", l: niv, s: mat,
            u: `Unidad I: Fundamentos de ${mat}`,
            t: `Aprendizaje Esperado: Dominio de conceptos clave en ${mat} para ${niv}.`
        });
    });
    
    // Materias Diversificadas (Solo 10 y 11)
    if (niv === "Décimo" || niv === "Undécimo") {
        ciencias.forEach(mat => {
            curriculum.push({
                m: "ACADEMICA", l: niv, s: mat,
                u: `Unidad I: Introducción a ${mat}`,
                t: `Aprendizaje Esperado: Análisis de fenómenos de ${mat}.`
            });
        });
    }
  });

  // ==========================================================================
  // B. ÁREA TÉCNICA (ESPECIALIDADES Y SUB-ÁREAS)
  // ==========================================================================
  console.log("   -> Generando Técnicas (CTP)...");
  const nivelesTec = ["Décimo", "Undécimo", "Duodécimo"];
  
  const especialidades = {
    "Desarrollo de Software": [
        "Tecnologías de Información", "Lógica y Algoritmos", "Programación Web", 
        "Gestión de Bases de Datos", "Desarrollo de Apps Móviles", "Inglés Técnico"
    ],
    "Ciberseguridad": [
        "Fundamentos de Seguridad", "Hacking Ético", "Forense Digital", 
        "Seguridad en Redes", "Normativa y Legislación", "Criptografía"
    ],
    "Contabilidad y Finanzas": [
        "Gestión Contable", "Costos y Presupuestos", "Tributación", 
        "Gestión Empresarial", "Normas NIIF", "Auditoría Básica"
    ],
    "Turismo y Hotelería": [
        "Gestión Turística", "Recepción Hotelera", "Alimentos y Bebidas", 
        "Turismo Sostenible", "Geografía Turística", "Ecoturismo"
    ],
    "Secretariado Ejecutivo": [
        "Gestión de Documentos", "Atención al Cliente", "Destrezas Computacionales", 
        "Comunicación Empresarial", "Etiqueta y Protocolo"
    ],
    "Dibujo Arquitectónico": [
        "Dibujo Técnico", "Modelado 3D (CAD)", "Maquetería", 
        "Materiales de Construcción", "Topografía Básica"
    ],
    "Electromecánica": [
        "Electricidad Básica", "Mantenimiento Industrial", "Hidráulica y Neumática", 
        "Control Eléctrico", "Soldadura"
    ],
    "Mecánica de Precisión": [
        "Metrología", "Torno y Fresado", "CNC", 
        "Dibujo Mecánico", "Materiales Metálicos"
    ],
    "Agroecología": [
        "Cultivos Hidropónicos", "Suelos y Fertilizantes", "Gestión Pecuaria", 
        "Agroindustria", "Riego y Drenaje"
    ],
    "Diseño Publicitario": [
        "Fundamentos de Diseño", "Fotografía Digital", "Ilustración Vectorial", 
        "Imagen Corporativa", "Historia del Arte"
    ]
  };

  for (const [esp, subareas] of Object.entries(especialidades)) {
    nivelesTec.forEach(niv => {
        subareas.forEach(sub => {
            // CREAMOS 3 RA (RESULTADOS DE APRENDIZAJE) POR CADA MATERIA PARA QUE HAYA VARIEDAD
            curriculum.push({
                m: "TECNICA", l: niv, s: `${esp} - ${sub}`,
                u: `Unidad I: Principios de ${sub}`,
                t: `RA1: Aplicar procedimientos básicos de ${sub} según normativa.`
            });
            curriculum.push({
                m: "TECNICA", l: niv, s: `${esp} - ${sub}`,
                u: `Unidad II: Procesos Avanzados de ${sub}`,
                t: `RA2: Ejecutar técnicas complejas de ${sub} con herramientas especializadas.`
            });
             curriculum.push({
                m: "TECNICA", l: niv, s: `${esp} - ${sub}`,
                u: `Unidad III: Proyecto Final de ${sub}`,
                t: `RA3: Desarrollar un proyecto integral de ${sub} enfocado en calidad.`
            });
        });
    });
  }

  // ==========================================================================
  // CARGA FINAL
  // ==========================================================================
  console.log(`⚡ INSERTANDO ${curriculum.length} REGISTROS...`);
  
  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: i.m,
        level: i.l,
        subject: i.s,
        unit: i.u,
        topic: i.t,
        period: "I Periodo"
    }))
  });

  console.log("✅ ¡CARGA MAESTRA COMPLETADA!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());