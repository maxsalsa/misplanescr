const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FINAL_SUBJECTS = [
  { name: "Educación Religiosa", levels: ["1er", "2do", "3er", "4to", "5to", "6to", "7mo", "8vo", "9no", "10mo", "11mo"], topics: ["Valores Humanos", "Historia Sagrada", "Ética", "Diálogo Interreligioso"] },
  { name: "Artes Industriales", levels: ["7mo", "8vo", "9no"], topics: ["Trabajo en Maderas", "Trabajo en Metales", "Dibujo Básico", "Electricidad Básica"] },
  { name: "Educación para el Hogar", levels: ["7mo", "8vo", "9no"], topics: ["Nutrición y Salud", "Textiles y Ropa", "Presupuesto Familiar", "Etiqueta y Protocolo"] }
];

function generateFinalisContent(subject, level, topic) {
    return {
        status: "success",
        meta: { mode: "FINALIS_COMPLETE", variety: "Contextual" },
        administrative: { asignatura: subject, nivel: level, docente: "Sistema Aulaplan" },
        planning_module: {
            learning_outcome: `Comprensión de ${topic} en la vida cotidiana.`,
            mediation: [
                { moment: "1. CONEXIÓN", activity: "Reflexión vivencial sobre el tema.", dua_variant: "Círculo de diálogo" },
                { moment: "2. COLABORACIÓN", activity: "Taller práctico en parejas.", technique: "Aprender Haciendo" },
                { moment: "3. CONSTRUCCIÓN", activity: `Elaboración de proyecto: ${topic}.`, evidence_type: "Producto Físico", ui_render_hint: "Checklist" },
                { moment: "4. CLARIFICACIÓN", activity: "Exposición y disfrute de lo creado.", technique: "Galería" }
            ],
            evaluation_indicators: [
                { indicator: `Demuestra habilidades en ${topic}`, technique: "Observación", instrument: "Lista de Cotejo" },
                { indicator: "Aplica normas de seguridad e higiene", technique: "Observación", instrument: "Escala" }
            ]
        }
    };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("💎 DETONANDO FINALIS: COMPLETANDO LA MALLA...");

  for (const item of FINAL_SUBJECTS) {
    for (const lvl of item.levels) {
        for (const topic of item.topics) {
            const title = `MEP FINALIS: ${item.name} - ${topic} (${lvl})`;
            const exists = await prisma.lessonPlan.findFirst({ where: { title } });
            if (!exists) {
                await prisma.lessonPlan.create({
                    data: {
                        title, subject: item.name, level: lvl, status: "PUBLISHED", userId: admin.id,
                        content: generateFinalisContent(item.name, lvl, topic)
                    }
                });
                // Feedback visual minimalista
                process.stdout.write("♦"); 
            }
        }
    }
  }
  console.log("\n✅ FINALIS COMPLETADO. AULAPLAN ESTÁ AL 100%.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());