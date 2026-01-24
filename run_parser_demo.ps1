# ========================================================
# 🟠 LANZADOR DEMO PARSER
# ========================================================

Write-Host "🟠 Probando Motor de Inyección de Texto..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_parser_demo.ts"

Write-Host "✅ MOTOR LISTO." -ForegroundColor Green
Write-Host "   El campo 'estimatedLessons' ya existe en la base de datos."
Write-Host "   Pega tus PDFs y yo generaré los scripts."
