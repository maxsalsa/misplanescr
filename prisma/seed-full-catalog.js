const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  console.log("🚀 Carga Masiva MEP 2026...");
  const catalog = [
    { name: "Estudios Sociales", code: "SOC", icon: "🌍", units: [ { title: "Geografía y ser humano", level: "7°", outcomes: [{ desc: "Relación ser humano-medio", indicators: ["Describe conceptos geográficos", "Relaciona clima y vida"] }] } ] },
    { name: "Ciencias", code: "CIE", icon: "🧬", units: [ { title: "Los seres vivos", level: "7°", outcomes: [{ desc: "Estructura celular", indicators: ["Diferencia célula animal/vegetal"] }] } ] },
    { name: "Matemáticas", code: "MAT", icon: "📐", units: [ { title: "Números Enteros", level: "7°", outcomes: [{ desc: "Operaciones enteros", indicators: ["Resuelve sumas/restas"] }] } ] }
  ];
  for (const sub of catalog) {
    const s = await prisma.subject.upsert({ where: { name: sub.name }, update: {}, create: { name: sub.name, code: sub.code, icon: sub.icon }});
    for (const u of sub.units) {
      const un = await prisma.studyUnit.create({ data: { title: u.title, level: u.level, subjectId: s.id }});
      for (const o of u.outcomes) {
        const out = await prisma.learningOutcome.create({ data: { description: o.desc, unitId: un.id }});
        for (const i of o.indicators) { await prisma.indicator.create({ data: { description: i, outcomeId: out.id }}); }
      }
    }
  }
  console.log("✅ Carga Completa.");
}
main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});