const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// IMPORTAR BANCOS (Simulado)
const STRATEGIES = {
  HARD_TECH: {
    conn: ["Análisis de Fallo Épico", "Reto Flash de Código", "Debate Hacker Ético"],
    const: [{a:"Laboratorio CTF", e:"Bandera Digital"}, {a:"Pair Programming", e:"Pull Request"}, {a:"Auditoría Cruzada", e:"Informe"}],
    tasks: ["Investigación CVE", "Setup Docker", "Topología Red"]
  },
  SERVICE: {
    conn: ["Video Reacción", "Storytelling Crisis", "Dinámica Teléfono Chocho"],
    const: [{a:"Simulación Roleplay", e:"Video"}, {a:"Service Blueprint", e:"Diagrama"}, {a:"Mystery Shopper", e:"Formulario"}],
    tasks: ["Ensayo Intel. Emocional", "Guion Bilingüe", "Glosario Ilustrado"]
  }
};

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateVariedContent(filename, subject) {
  const type = (subject.includes("Ciber") || subject.includes("Software") || subject.includes("IA")) ? "HARD_TECH" : "SERVICE";
  const pool = STRATEGIES[type] || STRATEGIES.SERVICE; // Default a soft skills si no es tech puro

  // SELECCIÓN ALEATORIA DE COMPONENTES
  const connection = pickRandom(pool.conn);
  const construction = pickRandom(pool.const);
  const task = pickRandom(pool.tasks);

  return {
    administrative: { period: "2026", origin: filename, variety_seed: Math.random() }, // Seed para regenerar
    curriculum: { unit: "Unidad Dinámica", outcome: "Competencia según programa oficial." },
    mediation: [
        { moment: "1. CONEXIÓN", activity: connection, dua: "Múltiples formas de implicación" },
        { moment: "2. COLABORACIÓN", activity: "Técnica de Rompecabezas o Lluvia de Ideas en Miro.", dua: "Aprendizaje Social" },
        { moment: "3. CONSTRUCCIÓN", activity: construction.a, evidence: construction.e, dua: "Acción y Expresión" },
        { moment: "4. CLARIFICACIÓN", activity: "Metacognición y validación contra rúbrica.", technique: "Evaluación Formativa" }
    ],
    evaluation_system: {
        short_task: { title: task, value: "10%", desc: "Ver indicaciones en anexo." },
        written_test: { title: "Prueba Parcial", value: "20%", rows: [] } // Se llena con el editor
    },
    // GUARDAMOS LAS VARIANTES EN LA BD PARA QUE LA UI PUEDA CAMBIARLAS
    alternatives: {
        connection_options: pool.conn.filter(c => c !== connection),
        construction_options: pool.const.filter(c => c.a !== construction.a)
    }
  };
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
        const cleanName = file.replace(".pdf","");
        let level = cleanName.match(/\d+/) ? cleanName.match(/\d+/)[0] + "mo" : "10mo";
        
        console.log(`   🎲 VARIANDO: ${subject} (${level}) -> Generando combinación única...`);

        // INYECTAR VARIAS VERSIONES SI ES NECESARIO
        // Para el ejemplo, inyectamos una versión "A" robusta
        await prisma.lessonPlan.create({
            data: {
                title: `MEP 2026: ${subject} - ${cleanName} (Versión Adaptativa)`,
                subject: subject,
                level: level,
                status: "PUBLISHED",
                userId: adminId,
                content: generateVariedContent(file, subject)
            }
        });
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;
  await scan(BASE_PATH, admin.id);
  console.log("✅ INGESTA POLÍMATA COMPLETADA.");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());