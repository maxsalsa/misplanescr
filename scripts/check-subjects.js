const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Consultando Materias Oficiales en Neon DB...");
    const subjects = await prisma.subject.findMany({
        select: { name: true, code: true, educationLevel: true, modalityType: true }
    });

    console.log("\n📋 LISTA DE MATERIAS (FUENTE DE VERDAD):");
    if (subjects.length === 0) {
        console.log("⚠️ Base de datos vacía. No hay materias cargadas.");
    } else {
        subjects.forEach(s => console.log(`- [${s.educationLevel || 'N/A'}] [${s.modalityType || 'N/A'}] ${s.name} (${s.code || 'S/C'})`));
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
