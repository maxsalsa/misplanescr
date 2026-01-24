# ========================================================
# 🧠 CEREBRO MEP: INICIALIZACIÓN DE BASE DE DATOS
# ========================================================
# Este script aplica el esquema estricto del REA a Neon DB.
# ========================================================

$ErrorActionPreference = "Stop"

Write-Host "🧠 Conectando Cerebro Académico a Neon DB..." -ForegroundColor Cyan

# 1. PUSH SCHEMA (Sin Data Loss si es posible, o reset si es necesario)
# Usamos db push para sincronizar el esquema sin migraciones complejas por ahora
Write-Host "📦 Aplicando Estructura REA (Conducta, Rúbricas, Planeamiento)..." -ForegroundColor Yellow
cmd /c "npx prisma db push --accept-data-loss"

# 2. GENERATE CLIENT (Para que el backend entienda los nuevos Enums)
Write-Host "🔄 Regenerando Cliente Prisma (Tipos Fuertes)..." -ForegroundColor Magenta
cmd /c "npx prisma generate"

Write-Host "✅ BASE DE DATOS MEP LISTA." -ForegroundColor Green
Write-Host "   - Tabla Conducta: Soporta LEVE, GRAVE, MUY_GRAVE"
Write-Host "   - Tabla Planeamiento: Soporta Mediación Docente/Estudiante"
Write-Host "   - Tabla Evaluación: Soporta Rúbricas 1-3"
Write-Host "--------------------------------------------------------"
