const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");

let errors = 0;

console.log("\x1b[36m%s\x1b[0m", "\n🧬 INICIANDO PROTOCOLO OMEGA V2 (NATIVE JS)...");

// 1. ANÁLISIS DE DEPENDENCIAS
console.log("\n📦 FASE 1: DEPENDENCIAS");
try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const REQUIRED = ["@react-pdf/renderer", "next-auth", "daisyui", "@google/generative-ai"];
    const BANNED = ["docx", "file-saver"];

    REQUIRED.forEach(d => {
        if (deps[d]) console.log(`   ✅ [OK] ${d} instalado.`);
        else { console.log(`   ❌ [FATAL] Falta: ${d}`); errors++; }
    });

    BANNED.forEach(d => {
        if (deps[d]) { console.log(`   ❌ [SEGURIDAD] Librería prohibida detectada: ${d}`); errors++; }
    });
} catch (e) {
    console.log("   ❌ [FATAL] No se pudo leer package.json");
    errors++;
}

// 2. AUDITORÍA DE ARCHIVOS CRÍTICOS
console.log("\n🔍 FASE 2: VERIFICACIÓN DE INTEGRIDAD");
const filesToCheck = [
    "app/dashboard/library/[id]/page.js",
    "app/api/auth/[...nextauth]/route.js",
    "components/pedagogy/DownloadPDF.jsx"
];

filesToCheck.forEach(f => {
    const fullPath = path.join(ROOT, f);
    if (fs.existsSync(fullPath)) {
        console.log(`   ✅ [OK] Existe: ${f}`);
        // Chequeo profundo de PDF
        if (f.includes("page.js") && f.includes("library")) {
            const content = fs.readFileSync(fullPath, "utf8");
            if (content.includes("DownloadPDF")) console.log("      -> Lógica PDF Activa (Seguro).");
            else { console.log("      -> ❌ ERROR: No se detecta el componente PDF."); errors++; }
        }
    } else {
        console.log(`   ❌ [FATAL] Falta archivo crítico: ${f}`);
        errors++;
    }
});

console.log("\n---------------------------------------------------");
if (errors === 0) {
    console.log("\x1b[32m%s\x1b[0m", "🏆 ESTADO OMEGA: APROBADO. SISTEMA INTEGRO.");
} else {
    console.log("\x1b[31m%s\x1b[0m", `🔥 FALLO: ${errors} ERRORES CRÍTICOS DETECTADOS.`);
    process.exit(1);
}