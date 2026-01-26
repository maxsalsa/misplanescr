# ========================================================
# 🧪 LANZADOR ALQUIMISTA (INGESTIÓN RICA)
# ========================================================

Write-Host "🧪 Iniciando Transmutación de Datos..." -ForegroundColor Cyan
cmd /c "npx tsx scripts/auto-ingest.ts"

Write-Host "✅ LISTO." -ForegroundColor Green
Write-Host "   El sistema ahora tiene actividades con sugerencias DUA,"
Write-Host "   tipos de evidencia y rúbricas pre-generadas."
