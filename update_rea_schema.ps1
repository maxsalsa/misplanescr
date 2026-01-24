# ========================================================
# 📊 ACTUALIZADOR DE ESQUEMA REA (RUBRICAS 1-3)
# ========================================================

$ErrorActionPreference = "Stop"

Write-Host "📊 Integrando Motor de Evaluación REA (1-3)..." -ForegroundColor Cyan

# 1. PUSH SCHEMA
Write-Host "📦 Creando tablas de Rúbricas y Calificaciones..." -ForegroundColor Yellow
cmd /c "npx prisma db push --accept-data-loss"

# 2. GENERATE CLIENT
Write-Host "🔄 Actualizando Cliente Prisma..." -ForegroundColor Magenta
cmd /c "npx prisma generate"

Write-Host "✅ MOTOR DE EVALUACIÓN INSTALADO." -ForegroundColor Green
Write-Host "   Ahora puedes crear:"
Write-Host "   - Actividades (EvaluationActivity)"
Write-Host "   - Rúbricas (Rubric -> Criteria -> Levels)"
Write-Host "   - Calificaciones (StudentGrade -> GradeDetail)"
Write-Host "--------------------------------------------------------"
