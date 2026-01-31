const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// DATA PROCESADA POR NOTEBOOKLM (HARDCODED PARA PRECISIÓN)
const SPECIAL_PLANS = [
  {
    // CASO 1: CONTEXTO INDÍGENA (BRIBRI/CABÉCAR)
    title: "MEP CULTURAL: Fotosíntesis y la Energía de Sibö",
    subject: "Biología",
    level: "10mo",
    context: "INDIGENA",
    content: {
      status: "success",
      meta: { context: "INDIGENA", culture: "Bribri/Cabécar", adaptation: "Ley 8899" },
      planning_module: {
        learning_outcome: "Analizar la fotosíntesis como proceso vital y espiritual.",
        mediation: [
          { moment: "1. CONEXIÓN", activity: "Relato del origen del maíz (ditsö) y la energía de Sibö.", dua_variant: "Narración oral por mayores" },
          { moment: "2. COLABORACIÓN", activity: "Comparar ciclo del maíz (Teitö) con Ciclo de Calvin.", technique: "Círculo de Diálogo" },
          { moment: "3. CONSTRUCCIÓN", activity: "Esquema dual: Proceso Químico vs Proceso Espiritual.", evidence_type: "Mural", ui_render_hint: "Checklist" },
          { moment: "4. CLARIFICACIÓN", activity: "Reflexión sobre el cuidado de la naturaleza.", technique: "Cierre Ancestral" }
        ],
        evaluation_system: {
          project: { title: "Herbario Cultural", phases: [{ name: "Recolección", deliverable: "Planta" }, { name: "Investigación", deliverable: "Ficha Dual" }] }
        }
      }
    }
  },
  {
    // CASO 2: SEGURIDAD INDUSTRIAL (CTP - MECÁNICA)
    title: "MEP CTP: Torno y Seguridad Ocupacional",
    subject: "Mecánica de Precisión",
    level: "11mo",
    context: "CTP_TECH",
    content: {
      status: "success",
      meta: { context: "CTP", risk_level: "ALTO", adaptation: "Norma MTSS" },
      planning_module: {
        learning_outcome: "Operar el torno paralelo cumpliendo normas de seguridad.",
        mediation: [
          { moment: "1. CONEXIÓN", activity: "Análisis de video de accidente por atrapamiento.", dua_variant: "Video con audiodescripción" },
          { moment: "2. COLABORACIÓN", activity: "Revisión de EPP entre pares (Buddy Check).", technique: "Lista de Cotejo" },
          { moment: "3. CONSTRUCCIÓN", activity: "Cilindrado simple en torno.", evidence_type: "Pieza Mecánica", ui_render_hint: "Checklist" }, // Aquí usaremos la lista de NotebookLM
          { moment: "4. CLARIFICACIÓN", activity: "Limpieza y mantenimiento de máquina.", technique: "Bitácora" }
        ],
        evaluation_system: {
          daily_work: { 
             title: "Protocolo de Seguridad", 
             rubric: [
                { indicator: "Usa Gafas ANSI Z87", levels: { high: "Siempre", low: "Nunca" } },
                { indicator: "Ropa ajustada (Sin mangas)", levels: { high: "Correcto", low: "Riesgo" } }
             ] 
          }
        }
      }
    }
  },
  {
    // CASO 3: EDUCACIÓN ESPECIAL (DISCAPACIDAD VISUAL)
    title: "MEP SPED: Literatura y Accesibilidad (Baja Visión)",
    subject: "Español",
    level: "8vo",
    context: "SPED",
    content: {
      status: "success",
      meta: { context: "SPED", disability: "Visual / Baja Visión", adaptation: "Ley 7600" },
      planning_module: {
        learning_outcome: "Análisis literario de cuentos costarricenses.",
        mediation: [
          { moment: "1. CONEXIÓN", activity: "Escucha activa de audiolibro.", dua_variant: "Audio de alta calidad" },
          { moment: "2. COLABORACIÓN", activity: "Debate oral sobre los personajes.", technique: "Mesa Redonda" },
          { moment: "3. CONSTRUCCIÓN", activity: "Redacción de final alternativo.", evidence_type: "Texto Digital", ui_render_hint: "Checklist" },
          { moment: "4. CLARIFICACIÓN", activity: "Lectura compartida.", technique: "Lectura en Voz Alta" }
        ],
        evaluation_system: {
           short_task: { title: "Análisis de Personaje", description: "Uso de Magnificador / ZoomText", value: "10%" }
        }
      }
    }
  }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("💉 INYECTANDO PLANES QUIRÚRGICOS...");

  for (const plan of SPECIAL_PLANS) {
    // Buscar la institución adecuada para el contexto (Ya creadas en Omega)
    let instType = "LICEO";
    if (plan.context === "CTP_TECH") instType = "CTP";
    if (plan.context === "INDIGENA") instType = "INDIGENA";
    if (plan.context === "SPED") instType = "ESPECIAL";

    const inst = await prisma.institution.findFirst({ where: { type: instType } });
    
    // Crear el plan vinculado al admin
    await prisma.lessonPlan.create({
        data: {
            title: plan.title,
            subject: plan.subject,
            level: plan.level,
            status: "PUBLISHED",
            userId: admin.id,
            content: plan.content
        }
    });
    console.log(`   ✨ Plan Especial Creado: ${plan.title} [${inst ? inst.name : "General"}]`);
  }
  console.log("✅ CIRUGÍA COMPLETADA. DATOS DE ALTA PRECISIÓN INYECTADOS.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());