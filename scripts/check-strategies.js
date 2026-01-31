const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Consultando Estrategias Pedagógicas (V-ULTRA / V2000)...");

    // Check total count
    const total = await prisma.pedagogicalStrategy.count();
    console.log(`📊 Total de Estrategias: ${total}`);

    // Check Categories (DUA)
    const dualVisual = await prisma.pedagogicalStrategy.findFirst({ where: { title: { contains: "Pictogramas" } } });
    const duaAuditivo = await prisma.pedagogicalStrategy.findFirst({ where: { title: { contains: "Podcast" } } });
    const adaptationTDAH = await prisma.pedagogicalStrategy.findFirst({ where: { title: { contains: "Pomodoro" } } });

    console.log("\n🧪 VERIFICACIÓN DE INCLUSIÓN (V2000):");
    console.log(`- DUA Visual: ${dualVisual ? '✅' : '❌'}`);
    console.log(`- DUA Auditivo: ${duaAuditivo ? '✅' : '❌'}`);
    console.log(`- Adaptación TDAH: ${adaptationTDAH ? '✅' : '❌'}`);

    // Check Binomio Sagrado Syntax
    console.log("\n📜 MUESTRA DE CONTENIDO (BINOMIO SAGRADO):");
    if (dualVisual) {
        console.log(`[${dualVisual.title}]: ${dualVisual.content}`);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
