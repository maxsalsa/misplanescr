# ========================================================
# 🔵 LANZADOR DEL MEGA-SEED (DATOS REALES)
# ========================================================

Write-Host "🔵 Inyectando Ecosistema MEP Completo..." -ForegroundColor Cyan
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed.ts"

Write-Host "✅ MEGA-SEED LISTO." -ForegroundColor Green
Write-Host "   - Examen de Mate creado con Tabla de Especificaciones."
Write-Host "   - Proyecto de Software con Rúbrica Técnica."
Write-Host "   - Nota de Conducta de Jaimito: 89."
