# ========================================================
# 🚀 INSTALACIÓN FINAL (GENESIS)
# ========================================================

Write-Host "🚀 Iniciando Instalación Final..." -ForegroundColor Cyan

# 1. Instalar dependencias si faltan
cmd /c "npm install"

# 2. Generar Cliente Prisma (Crucial para TS errors)
Write-Host "⚡ Generando Cliente Prisma..." -ForegroundColor Yellow
cmd /c "npx prisma generate"

# 3. Empujar Schema Definitivo
Write-Host "💾 Sincronizando Base de Datos..." -ForegroundColor Yellow
cmd /c "npx prisma db push --accept-data-loss"

# 4. Inyectar Datos Masivos (Loader)
Write-Host "🤖 Cargando Contenido JSON..." -ForegroundColor Yellow
cmd /c "npx tsx prisma/seed_loader.ts"

Write-Host "✅ SISTEMA LISTO PARA PRODUCCIÓN." -ForegroundColor Green
Write-Host "   - Schema Final Aplicado (AuditLog, ExamSpec, Notifications)."
Write-Host "   - Loader configurado en 'prisma/seeds/data'."
