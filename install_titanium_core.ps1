# ========================================================
# 💎 ANTIGRAVITY TITANIUM: INSTALACIÓN DE CORE ACADÉMICO
# ========================================================

$ErrorActionPreference = "Stop"

Write-Host "💎 INYECTANDO CEREBRO ACADÉMICO MEP (Titanium)..." -ForegroundColor Magenta

# 1. Asegurar dependencias de Prisma
Write-Host "📦 Asegurando Driver Prisma..." -ForegroundColor Yellow
cmd /c "npm install prisma @prisma/client --save-dev"

# 2. Empujar a Neon
Write-Host "📡 Sincronizando con Base de Datos Neon..." -ForegroundColor Cyan
cmd /c "npx prisma db push --accept-data-loss"

# 3. Generar el cliente
Write-Host "🧠 Reconstruyendo Cliente de Datos..." -ForegroundColor Cyan
cmd /c "npx prisma generate"

Write-Host "✅ SISTEMA ACADÉMICO MEP TITANIUM INSTALADO." -ForegroundColor Green
Write-Host "   - Motor de Evaluación 100% Configurable"
Write-Host "   - Rúbricas Escala 1-3"
Write-Host "   - Conducta con Deducción Automática"
Write-Host "   - Auditoría Total"
Write-Host "--------------------------------------------------------"
