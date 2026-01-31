const fs = require("fs");
const path = require("path");

console.log("🏥 INICIANDO CHEQUEO DE SALUD FRONTEND...");

// 1. Verificar package.json
const pkgPath = path.join(process.cwd(), "package.json");
if (fs.existsSync(pkgPath)) {
    const pkg = require(pkgPath);
    const deps = pkg.dependencies || {};
    const required = ["next", "react", "lucide-react", "@prisma/client"];
    
    console.log("📦 Revisando Dependencias Críticas:");
    required.forEach(r => {
        if (deps[r]) console.log(`   ✅ ${r}: Instalado`);
        else console.log(`   ❌ ${r}: FALTA - Instalar urgente`);
    });
} else {
    console.log("❌ No se encontró package.json");
}

// 2. Verificar Estructura de Rutas (App Router)
const appDir = path.join(process.cwd(), "app");
const routes = ["dashboard", "auth", "api"];
if (fs.existsSync(appDir)) {
    console.log("📂 Revisando Rutas Next.js:");
    routes.forEach(r => {
        if (fs.existsSync(path.join(appDir, r))) console.log(`   ✅ /${r}: OK`);
        else console.log(`   ⚠️ /${r}: No detectada (¿Falta crearla?)`);
    });
}

console.log("\n✅ AUDITORÍA FINALIZADA.");