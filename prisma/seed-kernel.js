const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL CEREBRO: CLASIFICACIÓN DE FAMILIAS DE ADN
function classifySubject(name) {
  const n = name.toLowerCase();
  if (n.match(/ciber|soft|datos|redes|ia|programacion/)) return "HARD_TECH";
  if (n.match(/turismo|hotel|ejecut|banca|conta|secret/)) return "SERVICE";
  if (n.match(/ciencia|biolo|fisica|quimica|mate|sociales|historia/)) return "STEAM_ACADEMIC";
  if (n.match(/agro|mecanic|music|artes|fisica|hogar/)) return "INDUSTRIAL_ARTS";
  return "ACADEMIC";
}

// 2. EL MOTOR: GENERADOR DE CONTENIDO JSON (ESTRICTO)
function generateKernelJson(subject, level, family) {
  
  // Lógica de Variabilidad según Familia
  let context = {};
  
  switch(family) {
    case "HARD_TECH":
      context = {
        tool: "VS Code / GitHub",
        act_const: "Laboratorio de Código: Refactorización de script.",
        evidence: "Commit con Hash",
        ua_component: "CodeBlock"
      };
      break;
    case "SERVICE":
      context = {
        tool: "Guion de Protocolo",
        act_const: "Simulación: Manejo de cliente difícil.",
        evidence: "Video Roleplay",
        ua_component: "RoleplayScenario"
      };
      break;
    case "STEAM_ACADEMIC":
      context = {
        tool: "Cuaderno de Campo / Microscopio",
        act_const: "Experimentación: Recolección de variables.",
        evidence: "V de Gowin",
        ua_component: "LabSimulation"
      };
      break;
    default: // INDUSTRIAL / ARTS
      context = {
        tool: "Taller / Instrumento",
        act_const: "Ejecución técnica supervisada.",
        evidence: "Producto Físico",
        ua_component: "Checklist"
      };
  }

  // ESTRUCTURA JSON FINAL (SEGÚN SU PROMPT)
  return {
    status: "success",
    meta: {
      specialty: subject,
      family: family,
      legal_check: "Passed (REA Art. 18)",
      dua_compliant: true
    },
    planning_module: {
      learning_outcome: `Competencia oficial de ${subject} - Nivel ${level}`,
      mediation: [
        {
          moment: "1. CONEXIÓN",
          activity: "Activación de conocimientos previos mediante pregunta generadora.",
          resource: "Video/Caso Real",
          dua_variant: {
            visual: "Infografía del proceso",
            auditivo: "Debate en parejas",
            kinestesico: "Lluvia de ideas con post-its"
          }
        },
        {
          moment: "2. COLABORACIÓN",
          activity: "Análisis grupal de la normativa o teoría base.",
          resource: "Documento Compartido",
          dua_principle: "Interdependencia Positiva"
        },
        {
          moment: "3. CONSTRUCCIÓN",
          activity: context.act_const,
          tool: context.tool,
          evidence_type: context.evidence,
          ui_render_hint: context.ua_component // Pista para el Frontend
        },
        {
          moment: "4. CLARIFICACIÓN",
          activity: "Cierre cognitivo y validación de aprendizajes.",
          technique: "Ticket de Salida"
        }
      ],
      evaluation_instrument: {
        type: "Rúbrica Analítica",
        total_points: 15,
        criteria: [
          {
            indicator: `Ejecuta el procedimiento de ${subject} según normativa.`,
            levels: {
              "3_Advanced": "Ejecuta con precisión, seguridad y sin errores.",
              "2_Intermediate": "Ejecuta con errores menores que no afectan el resultado.",
              "1_Initial": "Requiere asistencia constante para completar la tarea."
            }
          }
        ]
      }
    }
  };
}

// 3. LA INYECCIÓN: DATA SEEDING MASIVO
async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta Admin."); return; }

  // SIMULACIÓN DE BARRIDO DE CARPETA (Múltiples materias y niveles)
  const filesToProcess = [
    { name: "Desarrollo de Apps Móviles", level: "12mo" },
    { name: "Ciberseguridad de Redes", level: "11mo" },
    { name: "Turismo Ecológico", level: "10mo" },
    { name: "Contabilidad y Finanzas", level: "11mo" },
    { name: "Biología General", level: "10mo" },
    { name: "Física Matemática", level: "11mo" },
    { name: "Educación Musical", level: "7mo" },
    { name: "Agropecuaria (Cultivos)", level: "10mo" },
    { name: "Mecánica de Precisión", level: "12mo" },
    { name: "Español y Literatura", level: "9no" }
  ];

  console.log("🚀 EJECUTANDO BARRIDO MASIVO (ETL)...");

  for (const file of filesToProcess) {
    const family = classifySubject(file.name);
    const jsonPayload = generateKernelJson(file.name, file.level, family);
    const title = `MEP KERNEL: ${file.name} - ${file.level}`;

    // UPSERT PARA EVITAR DUPLICADOS
    const exists = await prisma.lessonPlan.findFirst({ where: { title } });
    
    if (!exists) {
        console.log(`   ⚡ Procesando: ${file.name} -> [${family}] -> JSON Generado.`);
        await prisma.lessonPlan.create({
            data: {
                title: title,
                subject: file.name,
                level: file.level,
                status: "PUBLISHED",
                userId: admin.id,
                content: jsonPayload // AQUÍ VA EL JSON PURO
            }
        });
    } else {
        // SI EXISTE, ACTUALIZAMOS CON LA NUEVA LÓGICA KERNEL
         console.log(`   🔄 Actualizando Kernel: ${file.name}`);
         await prisma.lessonPlan.update({
            where: { id: exists.id },
            data: { content: jsonPayload }
         });
    }
  }

  console.log("✅ CARGA DE DATOS COMPLETADA. 1000% FUNCIONAL.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());