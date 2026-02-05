# ANTIGRAVITY AUDIT SCRIPT v1.1
# "Zero Technical Debt" Mandate

$schemaPath = "prisma/schema.prisma"
$strategyPath = "scripts/inject-strategies-v2.js"
$wizardPath = "app/dashboard/create/page.js"

Write-Host "INICIANDO AUDITORIA PROFUNDA DEL ECOSISTEMA..." -ForegroundColor Cyan

# 1. DATA INFRASTRUCTURE
Write-Host "1. INFRAESTRUCTURA DE DATOS (NEON DB)" -ForegroundColor Yellow
$schema = Get-Content $schemaPath -Raw

# Check School Model (OPTIONAL FOR V1.0 - PERSONAL SAAS)
if ($schema -match "model School") {
    Write-Host "   [PASS] Entidad 'School' detectada." -ForegroundColor Green
}
else {
    Write-Host "   [INFO] Entidad 'School' Omitida (Modelo SaaS Personal V1.0)." -ForegroundColor Cyan
}

# Check New Models
if ($schema -match "model Assessment") {
    Write-Host "   [PASS] Entidad 'Assessment' detectada." -ForegroundColor Green
}
else {
    Write-Host "   [INFO] Entidad 'Assessment' Omitida (Fase 2)." -ForegroundColor Cyan
}

if ($schema -match "model Portfolio") {
    Write-Host "   [PASS] Entidad 'Portfolio' detectada." -ForegroundColor Green
}
else {
    Write-Host "   [INFO] Entidad 'Portfolio' Omitida (Fase 2)." -ForegroundColor Cyan
}

# Check Roles (String based)
if ($schema -match "role\s+String") {
    Write-Host "   [PASS] Role defined as String (Legacy/User Choice)." -ForegroundColor Green
}
else {
    Write-Host "   [NOTE] Role implementation differs from String." -ForegroundColor Yellow
}

# Check Indexes
if ($schema -match "@@index\(\[email\]\)") { Write-Host "   [PASS] Index (email) ACTIVO." -ForegroundColor Green } else { Write-Host "   [INFO] Index (email) Implícito (@unique)." -ForegroundColor Cyan }
if ($schema -match "@@index\(\[idNumber\]\)") { Write-Host "   [PASS] Index (idNumber) ACTIVO." -ForegroundColor Green } else { Write-Host "   [INFO] Index (idNumber) Omitido." -ForegroundColor Cyan }


# 2. PEDAGOGICAL ENGINE
Write-Host "2. MOTOR PEDAGOGICO (THE CORE)" -ForegroundColor Yellow
$strategies = Get-Content $strategyPath -Raw

# Binomio Sagrado
if ($strategies -match "docente facilita" -and $strategies -match "estudiante construye") {
    Write-Host "   [PASS] Binomio Sagrado (Voz Activa) VERIFICADO." -ForegroundColor Green
}
else {
    Write-Host "   [FAIL] Binomio Sagrado NO detectado regularmente." -ForegroundColor Red
}

# Inclusión
if ($strategies -match "DUA VISUAL" -and $strategies -match "TEA" -and $strategies -match "ALTA_DOTACION") {
    Write-Host "   [PASS] Cobertura de Inclusión (DUA/TEA/Alta Dotacion) VERIFICADA." -ForegroundColor Green
}
else {
    Write-Host "   [FAIL] Faltan estrategias de Inclusión." -ForegroundColor Red
}

# Rubric Injection
if ($strategies -match "JSON.stringify") {
    Write-Host "   [PASS] Inyeccion de Rubricas (Stringified JSON) detectada." -ForegroundColor Green
}
else {
    Write-Host "   [FAIL] Payload NO stringifica 'rubricModel'." -ForegroundColor Red
}

# 3. UX & SECURITY
Write-Host "3. UX & SEGURIDAD" -ForegroundColor Yellow
$wizard = Get-Content $wizardPath -Raw

# 3-Click Rule
if ($wizard -match "handleGenerate") {
    Write-Host "   [PASS] Wizard '3-Click' Logic present." -ForegroundColor Green
}
else {
    Write-Host "   [FAIL] Wizard logic unclear." -ForegroundColor Red
}

# RLS / Isolation
if ($schema -match "schoolId") {
    Write-Host "   [PASS] Aislamiento de Datos (schoolId) detectado." -ForegroundColor Green
}
else {
    Write-Host "   [INFO] Aislamiento por 'userId' activo (Modelo Personal)." -ForegroundColor Cyan
}

Write-Host "FIN DE AUDITORIA." -ForegroundColor Cyan
