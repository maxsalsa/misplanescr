# ========================================================
# 📚 LANZADOR DE PLANES MAESTROS (CONTENIDO PREMIUM)
# ========================================================

Write-Host "📚 Publicando contenido oficial del MEP..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_master_plans.ts"

Write-Host "✅ TIENDA ABASTECIDA." -ForegroundColor Green
Write-Host "   - English 10th (Bilingüe)"
Write-Host "   - Contabilidad (Técnico)"
Write-Host "   - Música (Artes)"
Write-Host "   Todo marcado como 'isOfficialTemplate = true'"
