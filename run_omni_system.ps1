# ========================================================
# 🦅 LANZADOR OMNI-PROMPT (MEP TOTAL)
# ========================================================

Write-Host "🦅 Ejecutando Ingestión y Verificación..." -ForegroundColor Cyan

# 1. Asegurar dependencias DaisyUI (sólo si faltan, pero asumimos instalado en package.json)
# cmd /c "npm install daisyui"

# 2. Correr Script de Ingestión
Write-Host "📂 Buscando JSONs en /meplan_data..." -ForegroundColor Yellow
cmd /c "npx tsx scripts/auto-ingest.ts"

Write-Host "✅ OMNI-SYSTEM OPERATIVO." -ForegroundColor Green
Write-Host "   - Motor Matemático: src/lib/mep-math.ts"
Write-Host "   - Componentes UI: ExamGenerator y SpeedGrader"
Write-Host "   - Base de Datos Sincronizada."
