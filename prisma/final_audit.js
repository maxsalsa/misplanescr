const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.syllabus.count();
  const pdfs = await prisma.syllabus.count({ where: { period: "Importado" } });
  const oficial = await prisma.syllabus.count({ where: { period: "I Periodo" } });
  const preescolar = await prisma.syllabus.count({ where: { level: { contains: "Materno" } } });
  
  console.log("   ---------------------------------------------");
  console.log("   CERTIFICADO DE ESTADO DE BASE DE DATOS");
  console.log("   ---------------------------------------------");
  console.log(`   ✅ ESTADO:       OPERATIVO (ONLINE)`);
  console.log(`   📚 TOTAL REGISTROS: ${total}`);
  console.log(`      - Oficial MEP:   ${oficial}`);
  console.log(`      - PDFs/JSONs:    ${pdfs}`);
  console.log(`      - Preescolar:    ${preescolar > 0 ? "INSTALADO" : "FALTANTE"}`);
  console.log("   ---------------------------------------------");
  
  if (total === 0) throw new Error("LA BASE DE DATOS ESTÁ VACÍA");
}

main()
  .catch(e => { console.error("❌ FALLO DE AUDITORÍA:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());