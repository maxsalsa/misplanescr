const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function runDiagnostics() {
    console.log("🏥 DIAGNÓSTICO DE SALUD DEL ECOSISTEMA AULAPLAN\n");
    let health = 100;
    let errors = [];

    // 1. VERIFICAR USUARIOS
    const users = await prisma.user.count();
    console.log(`👤 Usuarios Totales: ${users}`);
    if (users === 0) {
        errors.push("❌ CRÍTICO: No hay usuarios. El login fallará.");
        health -= 50;
    } else {
        console.log("   ✅ Usuarios OK");
    }

    // 2. VERIFICAR VOLUMEN DE DATOS (SUPERNOVA)
    const subjects = await prisma.subject.count();
    const plans = await prisma.lessonPlan.count();
    const assessments = await prisma.assessment.count();
    
    console.log(`📚 Asignaturas: ${subjects}`);
    console.log(`📝 Planes de Lección: ${plans}`);
    console.log(`🧪 Instrumentos/Recursos: ${assessments}`);

    if (subjects < 10) { errors.push("⚠️ ALERTA: Pocas asignaturas."); health -= 10; }
    if (assessments < 50) { errors.push("⚠️ ALERTA: La base de datos se siente vacía."); health -= 20; }
    
    // 3. VERIFICAR INTEGRIDAD RELACIONAL (ORFANADAD)
    // Buscar instrumentos sin materia asignada
    const orphans = await prisma.assessment.count({ where: { subjectId: null } });
    if (orphans > 0) {
        console.log(`⚠️ Advertencia: ${orphans} recursos son huérfanos (sin materia).`);
        // No es crítico, pueden ser generales
    } else {
        console.log("   ✅ Integridad Relacional OK");
    }

    // 4. VERIFICAR RECURSOS CRÍTICOS (MUST HAVE)
    const hasMath = await prisma.subject.findFirst({ where: { name: { contains: "Mate" } } });
    const hasLaw7600 = await prisma.assessment.findFirst({ where: { title: { contains: "Adecuación" } } });
    
    if (!hasMath) { errors.push("❌ CRÍTICO: No se encontró Matemáticas."); health -= 30; }
    if (!hasLaw7600) { errors.push("⚠️ ALERTA: Faltan recursos de Ley 7600."); health -= 10; }

    console.log("\n---------------------------------------------------");
    if (errors.length > 0) {
        console.log("🚨 RESULTADO: EL SISTEMA TIENE FALLOS");
        errors.forEach(e => console.log(e));
        console.log(`\nSALUD DEL SISTEMA: ${health}%`);
    } else {
        console.log("🏆 RESULTADO: SISTEMA ROBUSTO Y LISTO PARA FACTURAR.");
        console.log("   Salud del Sistema: 100%");
        console.log("   El cliente encontrará contenido en todas las áreas clave.");
    }
    console.log("---------------------------------------------------");
}

runDiagnostics().catch(e => console.error(e)).finally(() => prisma.$disconnect());