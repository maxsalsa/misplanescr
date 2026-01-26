# ========================================================
# 🏗️ AUTO-PLANEA ARCHITECTURE ENFORCER (SRE MODE)
# ========================================================
# Este script alinea el proyecto con los 5 Pilares de Ejecución.
# 1. Estructura Estricta (TSX)
# 2. Limpieza de Conflictos (JS vs TS)
# 3. Datos (Prisma Gen)
# ========================================================

$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚧 INICIANDO PROTOCOLO DE ESTANDARIZACIÓN..." -ForegroundColor Cyan

# 1. LIMPIEZA DE CONFLICTOS (JABÓN Y LIMPIEZA)
# Eliminamos archivos JS en src/app que chocan con las nuevas versiones TSX
Write-Host "🧹 Buscando artefactos legacy (.js) en src/app..." -ForegroundColor Yellow

$conflicts = @(
    "src/app/page.js", 
    "src/app/layout.js", 
    "src/app/dashboard/page.js", 
    "src/app/login/page.js"
)

foreach ($file in $conflicts) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   🗑️ Eliminado conflicto: $file" -ForegroundColor Red
    }
}

# 2. INSTALACIÓN DE DEPENDENCIAS (AUTOMATIZACIÓN - ICONOS Y PRISMA)
Write-Host "📦 Asegurando dependencias vitales..." -ForegroundColor Cyan
# Instalamos Prisma, Cliente, Iconos y Tipos de una vez
cmd /c "npm install prisma @prisma/client lucide-react @types/node @types/react @types/react-dom --save-dev --legacy-peer-deps"

# 3. DATABASE ENGINE (STORAGE Y NEON)
Write-Host "💾 Sincronizando Motor de Base de Datos (Prisma)..." -ForegroundColor Magenta
# Generamos el cliente basado en el schema existente (que ya verificamos que es correcto)
cmd /c "npx prisma generate"

# 4. RUTAS Y ESTRUCTURA (LA ESTRUCTURA)
# Verificación rápida de carpetas clave
$requiredDirs = @("src/app/login", "src/app/dashboard", "src/lib")
foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "   📂 Carpeta creada: $dir" -ForegroundColor Green
    }
}

Write-Host "✅ ARQUITECTURA STANDARD RESTAURADA." -ForegroundColor Green
Write-Host "👉 Siguiente paso sugerido: npx prisma db push (Si deseas actualizar la DB real)" -ForegroundColor Gray
Write-Host "--------------------------------------------------------"
