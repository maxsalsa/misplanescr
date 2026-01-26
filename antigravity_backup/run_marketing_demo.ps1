# ========================================================
# 🎬 LANZADOR DE DEMO (MARKETING SEED)
# ========================================================

Write-Host "🎬 Preparando Escenarios de Venta..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma db push"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_marketing.ts"

Write-Host "✅ DEMO LISTA. Revisa la tabla 'EvaluationActivity' y 'AlertUPRE'." -ForegroundColor Green
Write-Host "   - Ana tiene un Reto Diferenciado."
Write-Host "   - Pedro tiene una Alerta y Práctica de Refuerzo."
