const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. BANCO DE COMPETENCIAS Y CRITERIOS (REDACCIÓN OFICIAL)
const COMPETENCIES = {
  TECH: ["Ejecutar procedimientos técnicos de", "Aplicar normas de seguridad en", "Diagnosticar fallos en"],
  ACADEMIC: ["Analizar críticamente", "Resolver problemas relacionados con", "Comunicar ideas sobre"],
  ART: ["Expresar sentimientos mediante", "Interpretar obras de", "Crear composiciones usando"]
};

// 2. GENERADOR DE ENCABEZADO ADMINISTRATIVO (SEGÚN LINEAMIENTO MEP)
function generateOfficialHeader(modality, subject, level) {
  const base = {
    direccion_regional: "Dirección Regional de Educación [Zona]",
    centro_educativo: "Nombre del Centro Educativo",
    nombre_docente: "[Nombre del Docente]",
    curso_lectivo: "2026",
    periodicidad: modality === "CINDEA" || modality === "IPEC" ? "Semestral" : "Mensual"
  };

  if (modality === "CTP" || modality === "TECNICO") {
    return {
      ...base,
      educacion_tecnica: "Sí",
      especialidad: subject.split("-")[0] || "General",
      sub_area: subject,
      nivel: level,
      unidad_estudio: `Unidad ${Math.floor(Math.random() * 4) + 1}: Fundamentos`,
      horas_semanales: "12 horas" // Típico de taller
    };
  } else if (modality === "CINDEA" || modality === "IPEC") {
    return {
      ...base,
      modalidad: "Jóvenes y Adultos",
      modulo: subject,
      creditos: "4",
      nivel: level.includes("I Nivel") ? "I Nivel (7-8-9)" : "II Nivel (10-11)",
      seccion: "Nocturna"
    };
  } else {
    // ACADÉMICO / PRIMARIA
    return {
      ...base,
      asignatura: subject,
      nivel: level,
      periodo: "I Periodo",
      mes: "Febrero"
    };
  }
}

// 3. GENERADOR DE MENÚ DE EVALUACIÓN (BUFFET)
function generateEvaluationOptions(subject, topic) {
  return {
    // OPCIONES DE TAREA CORTA (VARIEDAD)
    short_task_options: [
      {
        id: "st1", type: "Investigación", title: "Indagación Bibliográfica",
        desc: `Investigar 3 fuentes confiables sobre ${topic} y crear una ficha resumen.`,
        value: "5%"
      },
      {
        id: "st2", type: "Creativa", title: "Infografía Digital",
        desc: `Diseñar una infografía en Canva/Genially explicando los puntos clave de ${topic}.`,
        value: "5%"
      },
      {
        id: "st3", type: "Práctica", title: "Resolución de Casos",
        desc: `Resolver la guía de ejercicios prácticos #1 sobre ${topic}.`,
        value: "5%"
      }
    ],
    // OPCIONES DE PROYECTO (VARIEDAD)
    project_options: [
      {
        id: "pj1", title: "Proyecto de Campo",
        phases: ["Diagnóstico", "Ejecución", "Reporte"],
        desc: "Aplicación de conocimientos en un entorno real o simulado."
      },
      {
        id: "pj2", title: "Proyecto de Investigación-Acción",
        phases: ["Pregunta", "Hipótesis", "Conclusiones"],
        desc: "Método científico aplicado a una problemática del tema."
      }
    ],
    // EVIDENCIAS DE DESEMPEÑO
    evidence_options: [
      "Portafolio Digital (Drive/Teams)",
      "Bitácora de Taller (Física)",
      "Video-evidencia (Flipgrid)",
      "Maqueta o Prototipo Funcional"
    ]
  };
}

// 4. GENERADOR DE MEDIACIÓN (REDACCIÓN EN INFINITIVO/TERCERA PERSONA)
function generateMediationOfficial(topic, context) {
  return [
    {
      moment: "1. CONEXIÓN",
      options: [
        "Proyección de un video detonante sobre la temática.",
        "Discusión guiada mediante preguntas generadoras.",
        "Lluvia de ideas utilizando herramientas digitales (Mentimeter)."
      ]
    },
    {
      moment: "2. COLABORACIÓN",
      options: [
        "Trabajo en subgrupos para el análisis de la normativa.",
        "Lectura compartida y discusión de textos técnicos.",
        "Resolución colaborativa de un estudio de caso."
      ]
    },
    {
      moment: "3. CONSTRUCCIÓN",
      options: [
        `Ejecución práctica de ${topic} supervisada por el docente.`,
        "Elaboración de esquemas conceptuales y mapas mentales.",
        "Simulación de roles profesionales relacionados al tema."
      ]
    },
    {
      moment: "4. CLARIFICACIÓN",
      options: [
        "Plenaria de cierre para socializar resultados.",
        "Realización de una técnica de 'Ticket de Salida'.",
        "Retroalimentación formativa por parte del docente."
      ]
    }
  ];
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  // LISTA MASIVA DE ASIGNATURAS POR MODALIDAD
  const TARGETS = [
    // --- CTP / TÉCNICO ---
    { m: "CTP", s: "Turismo - Alimentos y Bebidas", l: "10mo", t: "Manipulación de Alimentos" },
    { m: "CTP", s: "Contabilidad - Costos", l: "11mo", t: "Costos por Procesos" },
    { m: "CTP", s: "Desarrollo Software - Web", l: "12mo", t: "APIs RESTful" },
    { m: "CTP", s: "Mecánica Automotriz - Frenos", l: "10mo", t: "Sistemas ABS" },
    
    // --- CINDEA / IPEC (NOCTURNO) ---
    { m: "CINDEA", s: "Módulo 56: La Materia", l: "I Nivel", t: "Propiedades de la Materia" },
    { m: "CINDEA", s: "Módulo 34: Geometría", l: "II Nivel", t: "Polígonos Regulares" },
    
    // --- ACADÉMICO / LICEO ---
    { m: "ACADEMICO", s: "Psicología", l: "10mo", t: "Inteligencia Emocional" },
    { m: "ACADEMICO", s: "Filosofía", l: "11mo", t: "Lógica Aristotélica" },
    { m: "ACADEMICO", s: "Educación Física", l: "9no", t: "Fundamentos de Voleibol" },
    
    // --- PRIMARIA ---
    { m: "PRIMARIA", s: "Ciencias", l: "3er Grado", t: "Animales Vertebrados" },
    { m: "PRIMARIA", s: "Estudios Sociales", l: "5to Grado", t: "Historia Antigua de CR" }
  ];

  console.log("🌟 DETONANDO SUPERNOVA: INYECCIÓN DE OPCIONES MÚLTIPLES...");

  for (const item of TARGETS) {
    const title = `MEP SUPERNOVA: ${item.s} - ${item.l} (${item.m})`;
    
    // Generamos las estructuras complejas
    const header = generateOfficialHeader(item.m, item.s, item.l);
    const evalOptions = generateEvaluationOptions(item.s, item.item);
    const mediation = generateMediationOfficial(item.t, item.m);
    
    // Armamos el JSON final
    const content = {
      status: "success",
      meta: { mode: "SUPERNOVA_MULTI_OPTION", modality: item.m },
      administrative: header, // ENCABEZADO OFICIAL
      planning_module: {
        learning_outcome: `Competencia: Dominio de ${item.t}`,
        mediation_strategies: mediation, // ARRAY DE OPCIONES POR MOMENTO
        evaluation_buffet: evalOptions // ARRAY DE OPCIONES EVALUATIVAS
      }
    };

    // Upsert para no duplicar
    const exists = await prisma.lessonPlan.findFirst({ where: { title } });
    if (!exists) {
        await prisma.lessonPlan.create({
            data: {
                title,
                subject: item.s,
                level: item.l,
                status: "PUBLISHED",
                userId: admin.id,
                content: content
            }
        });
        console.log(`   ✨ Matriz Oficial Creada: ${item.s} [${item.m}]`);
    }
  }
  
  console.log("✅ SUPERNOVA COMPLETADO. BASE DE DATOS PROFESIONALIZADA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());