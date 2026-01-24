# ========================================================
# 🇨🇷 LANZADOR DEL GRAND TOUR (TODAS LAS MODALIDADES)
# ========================================================

Write-Host "🇨🇷 Iniciando Grand Tour Educativo..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma db push"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_grand_tour.ts"

Write-Host "✅ GRAND TOUR COMPLETADO." -ForegroundColor Green
Write-Host "   El sistema ahora contiene ejemplos de:"
Write-Host "   - Preescolar (Cualitativo)"
Write-Host "   - Técnica (Resultados Aprendizaje)"
Write-Host "   - CINDEA, Primaria, Cívica y Educ. Especial"
