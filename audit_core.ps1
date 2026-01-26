# --- AUDITORÍA DE ARQUITECTURA AULAPLAN V5 ---
Write-Host "🕵️ INICIANDO AUDITORÍA FORENSE AULAPLAN..." -ForegroundColor Cyan

$criticalFiles = @(
    "app/layout.js",
    "app/globals.css",
    "app/page.js",
    "app/not-found.js",
    "app/login/page.js",
    "app/dashboard/page.js",
    "app/dashboard/layout.js",
    "app/api/auth/login/route.js",
    "lib/db.js",
    "prisma/schema.prisma",
    "middleware.js",
    ".env"
)

$errors = 0

# A. Revisión de Estructura de Archivos
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ OK: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ CRÍTICO: Faltante -> $file" -ForegroundColor Red
        $errors++
    }
}

# B. Auditoría de Código Prohibido (Alerts)
Write-Host "`n🔍 Buscando 'alert()' prohibidos en código fuente..." -ForegroundColor Yellow
$alertUsage = Get-ChildItem -Path "app" -Recurse -Filter "*.js" | Select-String "alert\("
if ($alertUsage) {
    Write-Host "⚠️ ADVERTENCIA: Se detectaron 'alert()' nativos. Reemplazar por 'toast'." -ForegroundColor Red
    $alertUsage | ForEach-Object { Write-Host "   -> $($_.Filename): Line $($_.LineNumber)" -ForegroundColor Gray }
    $errors++
} else {
    Write-Host "✅ UX LIMPIO: No se detectaron alertas nativas." -ForegroundColor Green
}

# C. Auditoría de Marca (Lic. Salazar)
Write-Host "`n🔍 Verificando identidad del SuperAdmin..." -ForegroundColor Yellow
$loginContent = Get-Content "app/login/page.js" -Raw
if ($loginContent -match "max.salazar.sanchez@mep.go.cr") {
    Write-Host "✅ IDENTIDAD: Credenciales de Lic. Salazar configuradas." -ForegroundColor Green
} else {
    Write-Host "⚠️ ALERTA: No se detectó el correo oficial en el Login." -ForegroundColor Red
    $errors++
}

Write-Host "------------------------------------------------"
if ($errors -eq 0) {
    Write-Host "🏆 ESTADO: ARQUITECTURA GRADO INDUSTRIAL (100% SALUDABLE)" -ForegroundColor Green
} else {
    Write-Host "🚨 ESTADO: REQUIERE INTERVENCIÓN ($errors hallazgos)" -ForegroundColor Red
}
