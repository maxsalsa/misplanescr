# ========================================================
# 🌱 SEMBRADOR DE DATOS (DATA SEEDER)
# ========================================================
# 1. Actualiza Base de Datos con nuevos modelos (UPRE, Conducta)
# 2. Ejecuta prisma/seed.ts
# ========================================================

Write-Host "🌱 Preparando terreno..." -ForegroundColor Cyan
cmd /c "npx prisma db push --accept-data-loss"
cmd /c "npx prisma generate"

Write-Host "🚜 Sembrando datos de prueba..." -ForegroundColor Yellow
cmd /c "npx tsx prisma/seed.ts"

Write-Host "✅ SIEMBRA COMPLETADA." -ForegroundColor Green
Write-Host "   Ahora puedes pedirle a la IA el REPORTE UPRE."
