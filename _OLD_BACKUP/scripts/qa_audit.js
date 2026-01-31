
// scripts/qa_audit.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function audit() {
    console.log("🔍 EJECUTANDO AUDITORÍA DE CALIDAD AULAPLAN...");

    const totalFamilies = await prisma.curriculumFamily.count();
    const totalUnits = await prisma.curriculumUnit.count();
    const totalActivities = await prisma.activityTemplate.count();

    console.log(`📊 REPORTE FINAL:`);
    console.log(`   - Asignaturas: ${totalFamilies}`);
    console.log(`   - Unidades: ${totalUnits}`);
    console.log(`   - Actividades DUA Listas: ${totalActivities}`);

    // Alerta de Vacíos
    const emptyUnits = await prisma.curriculumUnit.findMany({
        where: { outcomes: { none: {} } },
        include: { level: true }
    });

    if (emptyUnits.length > 0) {
        console.warn(`⚠️ ALERTA: ${emptyUnits.length} Unidades están vacías (Revisar PDFs):`);
        emptyUnits.forEach(u => console.log(`   - ${u.title} (${u.level.name})`));
    } else {
        console.log("✅ Integridad Estructural: PERFECTA.");
    }
}

audit().finally(() => prisma.$disconnect());
