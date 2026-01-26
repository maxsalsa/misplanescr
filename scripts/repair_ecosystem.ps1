# ==========================================
# ANTIGRAVITY REPAIR PROTOCOL V5 (INDUSTRIAL)
# ==========================================
# Executes the 5 Commandments of SuperAdmin
# Author: Antigravity AI
# ==========================================

Write-Host " [ANTIGRAVITY] INITIATING FULL-STACK RECOVERY..." -ForegroundColor Cyan

# 1. MAPA DE RUTAS ABSOLUTO (Structure Enforcement)
# -------------------------------------------------
$folders = @(
    "app\login",
    "app\dashboard",
    "app\dashboard\create",
    "app\admin\programs",
    "app\api\auth\[...nextauth]"
)

foreach ($folder in $folders) {
    if (-not (Test-Path -Path $folder)) {
        Write-Host " [+] Creating missing directory: $folder" -ForegroundColor Green
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
    else {
        Write-Host " [OK] Directory exists: $folder" -ForegroundColor Gray
    }
}

# 2. CLEANUP ZOMBIES
# ------------------
# Remove conflicting old auth routes
$zombie = "app\api\auth\login"
if (Test-Path -Path $zombie) {
    Write-Host " [-] Removing ZOMBIE path: $zombie" -ForegroundColor Yellow
    Remove-Item -Path $zombie -Recurse -Force
}

# 3. VERIFY CRITICAL FILES
# ------------------------
$criticalFiles = @(
    "auth.js",
    "auth.config.js",
    "lib\db.js",
    "app\dashboard\layout.js",
    "app\api\auth\[...nextauth]\route.js"
)

foreach ($file in $criticalFiles) {
    if (-not (Test-Path -Path $file)) {
        Write-Host " [CRITICAL ERROR] Missing file: $file" -ForegroundColor Red
    }
    else {
        Write-Host " [OK] Critical file verified: $file" -ForegroundColor Gray
    }
}

# 4. PRISMA SYNC
# --------------
Write-Host " [DB] Syncing Prisma Schema..." -ForegroundColor Cyan
npx prisma generate

Write-Host " [SUCCESS] ANTIGRAVITY RECOVERY COMPLETE." -ForegroundColor Green
Write-Host " [INSTRUCTION] Restart your server now: npm run dev" -ForegroundColor Plan
