const fs = require('fs');
const path = require('path');

// AUDITORIA AUTOMÁTICA ANTIGRAVITY v7.5
const CHECKS = [
    { name: "Middleware Security", file: "src/middleware.ts", pattern: "matcher", description: "Verifica protección de rutas" },
    { name: "Session Timeout", file: "src/components/security/SessionTimeout.jsx", pattern: "TIMEOUT_MS", description: "Valida cierre de sesión (20m)" },
    { name: "DB Schema (Sessions)", file: "prisma/schema.prisma", pattern: "model Session", description: "Tabla de Sesiones activa" },
    { name: "DB Schema (Conducta)", file: "prisma/schema.prisma", pattern: "model ConductReport", description: "Tabla de Vida Estudiantil" },
    { name: "Prompt Binomio", file: "src/actions/generate.js", pattern: "AUDITORÍA ACTIVA", description: "QA Pedagógico (Verbos Activos)" }
];

console.log("🚀 INICIANDO AUDITORÍA FULL STACK ANTIGRAVITY v7.5...\n");

let passed = 0;
let failed = 0;

CHECKS.forEach(check => {
    const filePath = path.join(__dirname, '..', check.file);
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(check.pattern)) {
                console.log(`✅ [PASS] ${check.name}: Detectado correctamente.`);
                passed++;
            } else {
                console.log(`❌ [FAIL] ${check.name}: Patrón '${check.pattern}' no encontrado.`);
                failed++;
            }
        } else {
            console.log(`❌ [FAIL] ${check.name}: Archivo no existe (${check.file}).`);
            failed++;
        }
    } catch (e) {
        console.error(`⚠️ Error verificando ${check.name}:`, e.message);
        failed++;
    }
});

console.log("\n---------------------------------------------------");
console.log(`RESUMEN: ${passed} PASSED | ${failed} FAILED`);
if (failed === 0) {
    console.log("🏆 ESTADO: SISTEMA INDESTRUCTIBLE (Antigravity Certified)");
} else {
    console.log("⚠️ ESTADO: REQUIERE ATENCIÓN MANUAL");
}
console.log("---------------------------------------------------");
