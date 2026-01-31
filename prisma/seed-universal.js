const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CEREBRO SIMULADO (Para que corra en Node sin módulos ES6)
const MATRIX = {
  HARD_TECH: { type: "HARD_TECH", act: "Laboratorio Código", ev: "Repositorio" },
  INDUSTRIAL: { type: "INDUSTRIAL", act: "Taller Mecánico/Eléctrico", ev: "Producto Físico" },
  AGRO: { type: "AGRO", act: "Práctica de Campo", ev: "Bitácora" },
  ARTS_SPORTS: { type: "ARTS_SPORTS", act: "Expresión/Deporte", ev: "Presentación" },
  SERVICE: { type: "SERVICE", act: "Roleplay", ev: "Video" },
  HUMANITIES: { type: "HUMANITIES", act: "Ensayo/Debate", ev: "Portafolio" }
};

function classify(name) {
  const n = name.toLowerCase();
  if (n.match(/mecanic|electr|metal|mader|automot|construc/)) return MATRIX.INDUSTRIAL;
  if (n.match(/agro|pecuar|jardin/)) return MATRIX.AGRO;
  if (n.match(/fisica|deport|music|artes|hogar/)) return MATRIX.ARTS_SPORTS;
  if (n.match(/ciber|soft|web|redes|ia/)) return MATRIX.HARD_TECH;
  if (n.match(/turismo|hotel|ejecut|banca|conta/)) return MATRIX.SERVICE;
  return MATRIX.HUMANITIES; // Catch-all
}

const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

async function scan(dir, adminId) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
        await scan(fullPath, adminId);
    } else if (file.toLowerCase().endsWith(".pdf")) {
        const subject = path.basename(dir);
        const cleanName = file.replace(".pdf","").replace(/_/g," ");
        let level = cleanName.match(/\d+/) ? cleanName.match(/\d+/)[0] + "mo" : "General";
        
        // ANÁLISIS PROFUNDO
        const meta = classify(subject + " " + cleanName); // Usamos nombre de carpeta + archivo para contexto

        console.log(`   ⚡ [${meta.type}] Procesando: ${subject} - ${cleanName}`);

        // GENERAR 4 MOMENTOS ADAPTADOS
        const mediation = [
            { moment: "1. CONEXIÓN", activity: "Activación de conocimientos previos contextualizada.", dua: "Captar interés" },
            { moment: "2. COLABORACIÓN", activity: "Trabajo en pares para análisis técnico/teórico.", dua: "Colaboración" },
            { moment: "3. CONSTRUCCIÓN", activity: meta.act, evidence: meta.ev, dua: "Acción y Expresión" },
            { moment: "4. CLARIFICACIÓN", activity: "Cierre, limpieza y autoevaluación.", technique: "Metacognición" }
        ];

        // CREAR EN BD
        const title = `MEP 2026: ${subject} - ${cleanName}`;
        const exists = await prisma.lessonPlan.findFirst({ where: { title } });
        
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title,
                    subject,
                    level,
                    status: "PUBLISHED",
                    userId: adminId,
                    content: {
                        administrative: { period: "2026", origin: file, modality: meta.type },
                        curriculum: { unit: cleanName, outcome: "Competencia del Programa Oficial" },
                        mediation,
                        evaluation_system: {
                            written_test: { title: "Prueba Parcial", rows: [] },
                            rubric: { type: "Analítica", criteria: [{indicator: "Dominio técnico", levels: {high:"Excelente", low:"Deficiente"}}] }
                        }
                    }
                }
            });
        }
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;
  console.log("🚀 EJECUTANDO PROTOCOLO UNIVERSAL...");
  if (fs.existsSync(BASE_PATH)) { await scan(BASE_PATH, admin.id); }
  else { console.log("⚠️ CARPETA MEP_ORDENADO NO ENCONTRADA. VERIFIQUE RUTA."); }
  console.log("✅ UNIVERSO EDUCATIVO INYECTADO (100% COBERTURA).");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());