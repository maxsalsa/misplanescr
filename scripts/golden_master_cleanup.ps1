# ==============================================================================
# PROTOCOLO DE LIMPIEZA: GOLDEN MASTER (AULAPLAN V16)
# AUTORIDAD: Antigravity Engine
# ==============================================================================

$SecurityBackup = "_OLD_BACKUP"
Write-Host "INICIANDO PROTOCOLO DE LIMPIEZA MAESTRA..." -ForegroundColor Cyan

# 1. CREAR CARPETA DE SEGURIDAD
if (!(Test-Path $SecurityBackup)) {
    New-Item -ItemType Directory -Force -Path $SecurityBackup | Out-Null
    Write-Host "Carpeta $SecurityBackup creada." -ForegroundColor Green
}

# 2. MOVER COMPONENTES HUÉRFANOS
$Orphans = @(
    "components\Navbar.js",
    "components\compliance-indicator.jsx",
    "components\MediationDeck.jsx",
    "components\GlobalSearch.jsx"
)

foreach ($file in $Orphans) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination $SecurityBackup -Force
        Write-Host "Componente huerfano archivado: $file" -ForegroundColor Yellow
    }
}

# 3. ORGANIZAR COMPONENTES ACTIVOS
if (Test-Path "components\DashboardShell.jsx") {
    Move-Item -Path "components\DashboardShell.jsx" -Destination "components\layout\DashboardShell.jsx" -Force
    Write-Host "DashboardShell movido a components/layout" -ForegroundColor Green
}

if (Test-Path "components\notification-center.js") {
    Move-Item -Path "components\notification-center.js" -Destination "components\features\NotificationCenter.js" -Force
    Write-Host "NotificationCenter normalizado en components/features" -ForegroundColor Green
}

# 4. LIMPIEZA DE RAÍZ
$RootJunk = Get-ChildItem -Path . -Include *.ps1, *.py, *.bat, *.log, *.txt, Dockerfile -Exclude "README.md", "package.json", "cleanup.ps1"
foreach ($junk in $RootJunk) {
    if ($junk.Name -ne "golden_master_cleanup.ps1") {
        Move-Item -Path $junk.FullName -Destination $SecurityBackup -Force
        Write-Host "Archivo raiz limpiado: $($junk.Name)" -ForegroundColor Gray
    }
}

# 5. LIMPIEZA DE CARPETAS OBSOLETAS
$ObsoleteFolders = @("meplan_data", "python_core", "tests")
foreach ($folder in $ObsoleteFolders) {
    if (Test-Path $folder) {
        Move-Item -Path $folder -Destination $SecurityBackup -Force
        Write-Host "Carpeta obsoleta archivada: $folder" -ForegroundColor Yellow
    }
}

# 6. LIMPIEZA DE SCRIPTS
if (Test-Path "scripts") {
    $Scripts = Get-ChildItem -Path "scripts" -Exclude "brand-check.js", "validate-integrity.js", "golden_master_cleanup.ps1"
    $ScriptBackup = "$SecurityBackup\scripts"
    if (!(Test-Path $ScriptBackup)) {
        New-Item -ItemType Directory -Force -Path $ScriptBackup | Out-Null
    }
    
    foreach ($s in $Scripts) {
        Move-Item -Path $s.FullName -Destination $ScriptBackup -Force
    }
    Write-Host "Scripts de mantenimiento limpiados." -ForegroundColor Green
}

# 7. VERIFICACIÓN FINAL
if (Test-Path "prisma\schema.prisma") {
    Write-Host "PRISMA SCHEMA VERIFICADO COMO FUENTE DE VERDAD." -ForegroundColor Green
}
else {
    Write-Host "ALERTA: No se encontró prisma/schema.prisma" -ForegroundColor Red
}

Write-Host "LIMPIEZA COMPLETADA. ARQUITECTURA GOLDEN MASTER LISTA." -ForegroundColor Cyan
Write-Host "Todo archivo eliminado esta en: $SecurityBackup" -ForegroundColor Gray
