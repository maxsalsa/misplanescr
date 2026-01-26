# ========================================================
# 🌌 LANZADOR MULTI-VERSO (DOBLE SUSCRIPCIÓN)
# ========================================================

Write-Host "🌌 Iniciando Simulación Multi-Entidad..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_multiverse.ts"

Write-Host "✅ UNIVERSO EXPANDIDO." -ForegroundColor Green
Write-Host "   - Profe Multi tiene 2 licencias activas."
Write-Host "   - Gestiona cursos en 2 colegios diferentes."
