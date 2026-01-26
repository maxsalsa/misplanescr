# ========================================================
# 🌙 LANZADOR VIGILANCIA UPRE (CRON JOB)
# ========================================================

Write-Host "🌙 Ejecutando análisis de riesgo estudiantil..." -ForegroundColor Cyan
cmd /c "npx tsx scripts/run_nightly_upre.ts"

Write-Host "✅ VIGILANCIA COMPLETADA." -ForegroundColor Green
Write-Host "   El estado de los estudiantes ha sido actualizado."
