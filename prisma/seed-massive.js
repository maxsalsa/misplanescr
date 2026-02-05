const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔥 PURGANDO BASE DE DATOS CURRICULAR...");
  await prisma.syllabus.deleteMany({}); 

  const curriculum = [];

  // ==========================================================================
  // 1. ÁREA ACADÉMICA (III CICLO Y DIVERSIFICADA)
  // ==========================================================================
  const nivelesAcad = ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"];
  const materiasAcad = [
    "Matemáticas", "Español", "Ciencias", "Estudios Sociales", "Educación Cívica", 
    "Inglés Académico", "Francés", "Educación Física", "Educación Religiosa",
    "Artes Plásticas", "Educación Musical", "Hogar", "Artes Industriales"
  ];

  // Materias exclusivas de diversificada (10-11)
  const materiasDiv = ["Biología", "Física", "Química", "Filosofía", "Psicología"];

  console.log("   -> Generando Bloque Académico...");
  
  // Ciclo Básico (7-9) y Diversificado (10-11) Básico
  materiasAcad.forEach(mat => {
    nivelesAcad.forEach(niv => {
      curriculum.push({
        m: "ACADEMICA", l: niv, s: mat,
        u: `Unidad 1: Fundamentos de ${mat}`,
        t: `Aprendizaje Esperado: Dominio de conceptos básicos de ${mat} para el nivel ${niv}.`
      });
    });
  });

  // Diversificada Ciencias (10-11)
  ["Décimo", "Undécimo"].forEach(niv => {
    materiasDiv.forEach(mat => {
      curriculum.push({
        m: "ACADEMICA", l: niv, s: mat,
        u: `Unidad 1: Introducción a ${mat}`,
        t: `Aprendizaje Esperado: Análisis de fenómenos de ${mat} en el entorno.`
      });
    });
  });

  // ==========================================================================
  // 2. ÁREA TÉCNICA (ESPECIALIDADES Y SUB-ÁREAS)
  // ==========================================================================
  // En técnica, planeamos por SUB-ÁREA.
  const nivelesTec = ["Décimo", "Undécimo", "Duodécimo"];
  
  const especialidades = {
    "Desarrollo de Software": [
        "Tecnologías de Información", "Lógica y Algoritmos", "Programación Web", 
        "Gestión de Bases de Datos", "Desarrollo de Apps Móviles"
    ],
    "Ciberseguridad": [
        "Fundamentos de Seguridad", "Hacking Ético", "Forense Digital", 
        "Seguridad en Redes", "Normativa y Legislación"
    ],
    "Contabilidad y Finanzas": [
        "Gestión Contable", "Costos y Presupuestos", "Tributación", 
        "Gestión Empresarial", "Normas NIIF"
    ],
    "Turismo y Hotelería": [
        "Gestión Turística", "Recepción Hotelera", "Alimentos y Bebidas", 
        "Turismo Sostenible", "Inglés para el Turismo"
    ],
    "Secretariado Ejecutivo": [
        "Gestión de Documentos", "Atención al Cliente", "Destrezas Computacionales", 
        "Comunicación Empresarial", "Etiqueta y Protocolo"
    ],
    "Dibujo Arquitectónico": [
        "Dibujo Técnico", "Modelado 3D", "Maquetería", 
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

  console.log("   -> Generando Bloque Técnico (CTP)...");

  for (const [esp, subareas] of Object.entries(especialidades)) {
    nivelesTec.forEach(niv => {
        subareas.forEach(sub => {
            // Generamos entradas compuestas para facilitar la búsqueda
            // Ej: "Software - Programación Web"
            curriculum.push({
                m: "TECNICA", l: niv, s: `${esp} - ${sub}`,
                u: `Unidad 1: Fundamentos de ${sub}`,
                t: `RA1: Ejecutar procedimientos básicos de ${sub} según normativa técnica.`
            });
             curriculum.push({
                m: "TECNICA", l: niv, s: `${esp} - ${sub}`,
                u: `Unidad 2: Proyectos de ${sub}`,
                t: `RA2: Desarrollar proyectos prácticos de ${sub} aplicando estándares de calidad.`
            });
        });
    });
  }

  // ==========================================================================
  // 3. IDIOMAS (INTENSIVO / INGLÉS PARA LA COMUNICACIÓN)
  // ==========================================================================
  console.log("   -> Generando Bloque de Idiomas...");
  const idiomasTec = ["Inglés Conversacional (Listening)", "Inglés Conversacional (Speaking)", "Inglés Técnico"];
  
  nivelesTec.forEach(niv => {
    idiomasTec.forEach(idioma => {
        curriculum.push({
            m: "TECNICA", l: niv, s: idioma,
            u: "Unit 1: Customer Service",
            t: "Linguistic Competence: Handles customer inquiries effectively."
        });
    });
  });

  // ==========================================================================
  // CARGA FINAL
  // ==========================================================================
  console.log(`⚡ INYECTANDO ${curriculum.length} REGISTROS CURRICULARES... ESTO PUEDE TARDAR.`);
  
  // Usamos createMany para velocidad
  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: i.m,
        level: i.l,
        subject: i.s, // Aquí va la materia o "Especialidad - Subárea"
        period: "I Periodo",
        unit: i.u,
        topic: i.t
    }))
  });

  console.log("✅ ¡CARGA MASIVA COMPLETADA CON ÉXITO!");
  console.log("   -> Académicas, Técnicas e Idiomas están listos.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });