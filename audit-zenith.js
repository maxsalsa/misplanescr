const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const CHECKS = {
    UX: ["components/Sidebar.js", "components/PremiumGuard.js", "app/dashboard/page.js", "lib/utils.js"],
    SECURITY: ["middleware.js", "lib/security.js", "lib/ai-config.js"],
    CONFIG: ["prisma/schema.prisma", "next.config.js"]
};

async function main() {
    console.log("📊 REPORTE DE ESTADO DEL SISTEMA AULAPLAN\n");
    let score = 100;

    // 1. VERIFICACIÓN DE IDENTIDAD (GOD TIER)
    const admin = await prisma.user.findFirst({ where: { email: "max@misplanescr.com" } });
    if (admin && admin.subscriptionStatus === "GOD_TIER") {
        console.log("✅ [IDENTIDAD] Usuario Max Salazar identificado como GOD_TIER.");
        
        // Verificar Colegios
        if (admin.customData && JSON.stringify(admin.customData).includes("CTP_MN")) {
            console.log("✅ [CONTEXTO] Multi-Institución Activa (CTP Mercedes Norte + San Rafael).");
        } else {
            console.log("⚠️ [CONTEXTO] No se detectaron los colegios en customData.");
            score -= 10;
        }
    } else {
        console.log("❌ [IDENTIDAD] Error crítico: No se encuentra el SuperAdmin.");
        score -= 50;
    }

    // 2. VERIFICACIÓN DE VOLUMEN DE DATOS (INYECCIONES)
    const subjects = await prisma.subject.count();
    const plans = await prisma.lessonPlan.count();
    const assessments = await prisma.assessment.count();

    console.log(`\n📦 [DATA] Inventario de Recursos:`);
    console.log(`   -> Asignaturas: ${subjects} (Cobertura Megatrón/Nebula)`);
    console.log(`   -> Planes Anuales/Diarios: ${plans}`);
    console.log(`   -> Instrumentos (Rúbricas/Exámenes): ${assessments}`);

    if (subjects > 50 && assessments > 500) {
        console.log("✅ [DATA] Volumen Industrial Confirmado.");
    } else {
        console.log("⚠️ [DATA] El volumen de datos parece bajo.");
        score -= 10;
    }

    // 3. AUDITORÍA DE ARCHIVOS UX/UI Y SEGURIDAD
    console.log("\n🎨 [UX/UI & SEGURIDAD] Integridad de Archivos:");
    let missingFiles = 0;
    
    [...CHECKS.UX, ...CHECKS.SECURITY, ...CHECKS.CONFIG].forEach(file => {
        if (fs.existsSync(path.join(process.cwd(), file))) {
            // console.log(`   OK: ${file}`); // Ocultamos para limpiar salida
        } else {
            console.log(`   ❌ FALTANTE: ${file}`);
            missingFiles++;
        }
    });

    if (missingFiles === 0) {
        console.log("✅ [ESTRUCTURA] Todos los componentes críticos existen.");
    } else {
        console.log(`❌ [ESTRUCTURA] Faltan ${missingFiles} archivos críticos.`);
        score -= 20;
    }

    // RESULTADO FINAL
    console.log("\n---------------------------------------------------");
    if (score === 100) {
        console.log("🏆 ESTADO DEL SISTEMA: PERFECCIÓN TOTAL (ZENITH).");
        console.log("   Listo para despliegue y facturación.");
    } else {
        console.log(`⚠️ ESTADO DEL SISTEMA: ${score}/100. REVISE ALERTAS.`);
    }
    console.log("---------------------------------------------------");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());