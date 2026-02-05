const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Buscamos todo lo que el sistema no supo clasificar
  const mysteryItems = await prisma.syllabus.findMany({
    where: { 
        OR: [
            { level: "Sin Nivel" },
            { level: "10" },  // A veces lo guardó como número string
            { level: "11" },
            { level: "12" }
        ]
    }
  });

  console.log(`   📊 Se encontraron ${mysteryItems.length} registros con nivel numérico o desconocido.`);

  if (mysteryItems.length === 0) {
    console.log("   ✅ Todo parece estar bien clasificado con nombres (Décimo, Undécimo, etc).");
    return;
  }

  console.log("   ----------------------------------------------------------------");
  console.log("   MUESTRA DE CONTENIDO (Para que usted juzgue):");
  console.log("   ----------------------------------------------------------------");

  // Mostramos los primeros 10 para no saturar
  mysteryItems.slice(0, 15).forEach(item => {
    console.log(`   📂 MATERIA: ${item.subject}`);
    console.log(`      NIVEL ACTUAL: [${item.level}]`);
    console.log(`      CONTENIDO (Snippet): ${item.topic.substring(0, 100)}...`);
    console.log("   ----------------------------------------------------------------");
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());