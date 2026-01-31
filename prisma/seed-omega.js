const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. MATRIZ DE CONTEXTOS NACIONALES (AUDITORÍA TERRITORIAL)
const REGIONES = [
  {
    name: "Huetar Norte (San Carlos)",
    context: "AGRO_INDUSTRIAL",
    schools: [
      { name: "CTP de Aguas Zarcas", type: "CTP", focus: ["Agropecuaria", "Desarrollo de Software", "Turismo"] },
      { name: "Escuela Unidocente Pocosol", type: "UNIDOCENTE", focus: ["Primaria Completa"] }
    ]
  },
  {
    name: "Chorotega (Guanacaste)",
    context: "TURISMO_TECH",
    schools: [
      { name: "CTP de Liberia", type: "CTP", focus: ["Turismo", "Ejecutivo Bilingüe", "Electrotecnia"] },
      { name: "Liceo Rural de Nosara", type: "RURAL", focus: ["Secundaria Académica", "Inglés Conversacional"] }
    ]
  },
  {
    name: "Huetar Atlántica (Limón)",
    context: "LOGISTICA_CULTURA",
    schools: [
      { name: "Liceo Nuevo de Limón", type: "LICEO", focus: ["Secundaria Académica", "Francés", "Artes Musicales (Calypso)"] },
      { name: "CTP de Liverpool", type: "CTP", focus: ["Logística", "Aduanas", "Contabilidad"] }
    ]
  },
  {
    name: "Central (GAM)",
    context: "HIGH_TECH",
    schools: [
      { name: "Colegio Científico de Cartago", type: "CIENTIFICO", focus: ["Física Avanzada", "Robótica", "Matemática Pura"] },
      { name: "Liceo de Moravia", type: "LICEO", focus: ["Artes Plásticas", "Humanidades", "Cívica"] }
    ]
  },
  {
    name: "Brunca (Zona Sur)",
    context: "BIO_DESARROLLO",
    schools: [
      { name: "Liceo Indígena de Boruca", type: "INDIGENA", focus: ["Artes Industriales (Tejidos)", "Cosmovisión", "Agroecología"] }
    ]
  }
];

// 2. GENERADOR DE PRÁCTICA PEDAGÓGICA VARIADA
function generatePracticePlan(subject, level, contextType, schoolType) {
  let strategy = "";
  let tool = "";
  
  // Adaptación al Contexto (Esto es lo que pidió: VARIABILIDAD)
  if (contextType === "AGRO_INDUSTRIAL") {
    strategy = "Aprendizaje Basado en Proyectos (ABP) en campo abierto.";
    tool = "Bitácora de Campo / Muestras de Suelo";
  } else if (contextType === "HIGH_TECH") {
    strategy = "Gamificación y Simulación Digital.";
    tool = "Simulador Virtual / Python";
  } else if (contextType === "TURISMO_TECH") {
    strategy = "Roleplay Intensivo (Simulación de Servicio).";
    tool = "Guion de Protocolo / Video";
  } else if (schoolType === "INDIGENA") {
    strategy = "Círculo de Diálogo y Saberes Ancestrales.";
    tool = "Artefactos Culturales / Historia Oral";
  } else {
    strategy = "Flipped Classroom (Aula Invertida).";
    tool = "Mapa Mental Colaborativo";
  }

  return {
    status: "success",
    meta: { 
        context: contextType, 
        school_type: schoolType, 
        adaptation: "Contextualizada al Territorio" 
    },
    administrative: { 
        period: "Curso Lectivo 2026", 
        modality: schoolType 
    },
    planning_module: {
      learning_outcome: `Dominio práctico de ${subject} en contexto ${contextType}`,
      mediation: [
        { 
            moment: "1. CONEXIÓN", 
            activity: `Análisis de problemática local relacionada con ${subject}.`, 
            dua_variant: { visual: "Noticia local", auditivo: "Testimonio comunal", kinestesico: "Recorrido" } 
        },
        { 
            moment: "2. COLABORACIÓN", 
            activity: "Discusión de soluciones en equipos multidisciplinarios.", 
            technique: strategy 
        },
        { 
            moment: "3. CONSTRUCCIÓN", 
            activity: `Práctica Pedagógica: Aplicación de ${subject} usando ${tool}.`, 
            evidence_type: "Portafolio de Evidencias",
            ui_render_hint: contextType === "HIGH_TECH" ? "CodeBlock" : "Checklist"
        },
        { 
            moment: "4. CLARIFICACIÓN", 
            activity: "Socialización de resultados ante la comunidad educativa.", 
            technique: "Feria / Exposición" 
        }
      ],
      evaluation_system: {
        daily_work: { 
            title: "Desempeño en Práctica", 
            rubric: [{ indicator: "Pertinencia contextual", levels: { high: "Excelente adaptación", mid: "Buena", low: "Poca" } }] 
        },
        project: {
            title: `Proyecto de Impacto: ${subject}`,
            phases: [{ name: "Diagnóstico", deliverable: "Informe" }, { name: "Ejecución", deliverable: "Producto" }]
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta Admin."); return; }

  console.log("☣️ EJECUTANDO PROTOCOLO OMEGA (DESPLIEGUE TERRITORIAL)...");

  let totalPlans = 0;

  // ITERAR REGIONES
  for (const region of REGIONES) {
    console.log(`   📍 Desplegando en Región: ${region.name} [${region.context}]`);
    
    // ITERAR ESCUELAS DE LA REGIÓN
    for (const school of region.schools) {
        
        // 1. Crear/Buscar Institución
        const inst = await prisma.institution.create({
            data: {
                name: school.name,
                type: school.type,
                region: region.name,
                code: "OMEGA-" + Math.floor(Math.random()*10000)
            }
        });

        // 2. Crear un Grupo Representativo
        const group = await prisma.group.create({
            data: {
                name: school.type === "UNIDOCENTE" ? "Multigrado" : "10-1 Especialidad",
                grade: "10mo",
                shift: "DIURNO",
                userId: admin.id,
                institutionId: inst.id
            }
        });

        // 3. Crear Planes para cada Especialidad/Foco de la Escuela
        for (const focus of school.focus) {
            const title = `MEP OMEGA: ${focus} - ${school.name} (${school.type})`;
            
            // Generamos la variedad
            const content = generatePracticePlan(focus, "10mo", region.context, school.type);
            
            await prisma.lessonPlan.create({
                data: {
                    title: title,
                    subject: focus,
                    level: "10mo", // Simplificado para el seed
                    status: "PUBLISHED",
                    userId: admin.id,
                    content: content
                }
            });
            totalPlans++;
        }
    }
  }

  console.log(`\n✅ OMEGA FINALIZADO. ${totalPlans} PLANES CONTEXTUALIZADOS INYECTADOS.`);
  console.log("   -> Se han creado escuelas, colegios, CTPs y Liceos Indígenas.");
  console.log("   -> Cada uno con metodología adaptada a su zona.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());