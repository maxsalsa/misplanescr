# ==============================================================================
#  AULAPLAN - PROTOCOLO DE REFUERZO DE SISTEMA (ANTIGRAVITY V1)
#  OPERADOR: MAX SALAZAR | NIVEL: SUPER_ADMIN
# ==============================================================================

Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "   ACTIVANDO PROTOCOLO DE REFUERZO INDUSTRIAL - AULAPLAN    " -ForegroundColor Cyan
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan

# 1. MATAR PROCESOS ZOMBIE (Limpieza de Puerto 3000)
Write-Host "`n[1/5] 🧹 Escaneando puerto 3000..." -ForegroundColor Yellow
$portProcess = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portProcess) {
    Write-Host "    -> Detectado proceso bloqueando el puerto. Eliminando..." -ForegroundColor Red
    Stop-Process -Id $portProcess.OwningProcess -Force -ErrorAction SilentlyContinue
    Write-Host "    -> Puerto 3000 liberado." -ForegroundColor Green
} else {
    Write-Host "    -> Puerto 3000 despejado." -ForegroundColor Green
}

# 2. PURGA DE CACHÉ (Hard Reset de Next.js)
Write-Host "`n[2/5] 🗑️  Purgando caché corrupta (.next)..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "    -> Caché eliminada. Se forzará una reconstrucción limpia." -ForegroundColor Green
} else {
    Write-Host "    -> No se encontró caché previa." -ForegroundColor Green
}

# 3. VERIFICACIÓN DE LOGÍSTICA (NPM)
Write-Host "`n[3/5] 📦 Verificando dependencias críticas..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "    -> Alerta: node_modules no existe. Instalando..." -ForegroundColor Red
    npm install
} else {
    Write-Host "    -> Dependencias listas." -ForegroundColor Green
}

# 4. SINCRONIZACIÓN NEURAL (NEON DB -> PRISMA)
Write-Host "`n[4/5] 🧠 Sincronizando Cerebro (Neon DB) con Código..." -ForegroundColor Yellow
Write-Host "    -> Descargando esquema actualizado..." -ForegroundColor Gray
cmd /c "npx prisma db pull"
if ($LASTEXITCODE -eq 0) {
    Write-Host "    -> Estructura de BD actualizada." -ForegroundColor Green
    Write-Host "    -> Regenerando cliente Prisma..." -ForegroundColor Gray
    cmd /c "npx prisma generate"
    Write-Host "    -> Cliente regenerado con éxito." -ForegroundColor Green
} else {
    Write-Host "    ❌ ERROR CRÍTICO EN PRISMA. REVISA TU CONEXIÓN." -ForegroundColor Red
    Read-Host "Presiona Enter para salir..."
    exit
}

# 5. INICIO DE MOTORES
Write-Host "`n[5/5] 🚀 INICIANDO AULAPLAN (MODO DEV)..." -ForegroundColor Cyan
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "    El sistema está listo, Arquitecto Salazar."
Write-Host "    Accede en: http://localhost:3000"
Write-Host "------------------------------------------------------------" -ForegroundColor Cyan

npm run dev