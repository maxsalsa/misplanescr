# ========================================================
# AUTO-PLANEA ARCHITECTURE ENFORCER (SRE MODE)
# ========================================================
# 1. Clean Conflicts (JS vs TS)
# 2. Install Dependencies
# 3. Generate Prisma Client
# ========================================================

$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚧 INICIANDO PROTOCOLO DE ESTANDARIZACION..." -ForegroundColor Cyan

# 1. CLEAN CONFLICTS
# Delete legacy .js files that conflict with .tsx
Write-Host "🧹 Buscando archivos legacy (.js) en src/app..." -ForegroundColor Yellow

$conflicts = @(
    "src/app/page.js", 
    "src/app/layout.js", 
    "src/app/dashboard/page.js", 
    "src/app/login/page.js"
)

foreach ($file in $conflicts) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   DEL: $file" -ForegroundColor Red
    }
}

# 2. INSTALL DEPENDENCIES
Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
cmd /c "npm install prisma @prisma/client lucide-react @types/node @types/react @types/react-dom --save-dev --legacy-peer-deps"

# 3. DATABASE ENGINE
Write-Host "💾 Generando Prisma Client..." -ForegroundColor Magenta
cmd /c "npx prisma generate"

# 4. STRUCTURE CHECK
$requiredDirs = @("src/app/login", "src/app/dashboard", "src/lib")
foreach ($dir in $requiredDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "   DIR: $dir" -ForegroundColor Green
    }
}

Write-Host "✅ ARQUITECTURA RESTAURADA." -ForegroundColor Green
Write-Host "--------------------------------------------------------"
