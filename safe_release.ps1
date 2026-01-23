# ========================================================
# 🔱 ANTIGRAVITY INDUSTRIAL: RELEASE ESTABLE (SRE MODE)
# ========================================================
Write-Host "🛡️ INICIANDO PROTOCOLO DE ESTABILIZACIÓN SEGURA..." -ForegroundColor Cyan

# --------------------------------------------------------
# 1. REPO HYGIENE
# --------------------------------------------------------
Write-Host "🧹 1. Configurando exclusiones de seguridad (.gitignore)..." -ForegroundColor Yellow

$rules = @(
    "node_modules",
    ".next",
    ".env",
    "npm-debug.log*",
    "data/chroma_db",
    "*.sqlite3",
    "*.sqlite3-journal",
    "*.bin",
    "brain_dump.json",
    "storage/",
    "public/mep-docs/cerebro_mep",
    ".DS_Store",
    "Thumbs.db"
)

$ignoreContent = $rules -join "`r`n"
Set-Content -Path ".gitignore" -Value $ignoreContent -Encoding UTF8
Write-Host "✅ .gitignore blindado." -ForegroundColor Green

# --------------------------------------------------------
# 2. CONFIGURACIÓN DEL MOTOR
# --------------------------------------------------------
Write-Host "⚙️ 2. Estableciendo reglas de motor..." -ForegroundColor Yellow
Set-Content -Path ".npmrc" -Value "legacy-peer-deps=true" -Encoding UTF8
Write-Host "✅ Reglas de motor configuradas." -ForegroundColor Green

# --------------------------------------------------------
# 3. FIJACIÓN DE VERSIONES
# --------------------------------------------------------
Write-Host "🔒 3. Anclando Prisma a versión 5.22.0..." -ForegroundColor Yellow

if (Test-Path node_modules) { 
    Write-Host "   Eliminando node_modules..." 
    Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
}

npm install prisma@5.22.0 @prisma/client@5.22.0 --save-exact --save-dev
Write-Host "⬇️  Instalando resto de dependencias..." -ForegroundColor Cyan
npm install

# --------------------------------------------------------
# 4. VALIDACIÓN LOCAL
# --------------------------------------------------------
Write-Host "🧪 4. Ejecutando pruebas de construcción..." -ForegroundColor Cyan

npx prisma generate
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Falló Prisma Generate" -ForegroundColor Red; exit }

Write-Host "🏗️  Intentando Build local..." -ForegroundColor Cyan
$env:NODE_ENV = "production"
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:NEXT_TELEMETRY_DISABLED = "1"

# Skipping full build for speed if user just wants to fix red errors, but script says "Clean & Safe Release".
# Let's try to run the build.
try {
    # Using Call Operator for safety
    & npx next build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ BUILD LOCAL EXITOSO." -ForegroundColor Green
    }
    else {
        throw "Build failed"
    }
}
catch {
    Write-Host "`n❌ EL BUILD FALLÓ. No subiremos código roto." -ForegroundColor Red
    exit 1
}

# --------------------------------------------------------
# 5. COMMIT QUIRÚRGICO
# --------------------------------------------------------
Write-Host "🚀 5. Empaquetando envío seguro..." -ForegroundColor Cyan

git add .gitignore .npmrc package.json package-lock.json prisma/schema.prisma
# Corrected paths
git add src/ public/ 

git commit -m "SRE Release: Fix Prisma 5.22 + Saneamiento"
git push

Write-Host "--------------------------------------------------------"
Write-Host "🏁 DESPLIEGUE INDUSTRIAL ENVIADO."
Write-Host "--------------------------------------------------------"
