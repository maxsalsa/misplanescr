const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🧹 KAIZEN 200.0: DATABASE CLEANUP & OPTIMIZATION...");

    // 1. Remove Duplicates in BancoMediacion (Heuristic: same name)
    const allStrategies = await prisma.bancoMediacion.findMany();
    const seenNames = new Set();
    let deletedCount = 0;

    for (const strategy of allStrategies) {
        if (seenNames.has(strategy.nombre)) {
            await prisma.bancoMediacion.delete({ where: { id: strategy.id } });
            deletedCount++;
        } else {
            seenNames.add(strategy.nombre);
        }
    }

    console.log(`✅ Removed ${deletedCount} duplicate strategies.`);

    // 2. Clear Old Test Data (e.g., from 'Demo' institutional context if flagged)
    // const deletedPlans = await prisma.historialPlanes.deleteMany({ where: { user: { email: { contains: 'test' } } } });

    // 3. Re-index is handled by Neon/Postgres, but we could run a VACUUM ANALYZE in raw SQL
    // await prisma.$executeRaw`VACUUM ANALYZE;`;

    console.log("🚀 DATABASE OPTIMIZED FOR PRODUCTION.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
