Write-Host "🚀 ANTIGRAVITY ONE-TOUCH: INICIANDO SECUENCIA MAESTRA..." -ForegroundColor Cyan

# 1. INSTALACIÓN SILENCIOSA (Sin preguntas)
Write-Host "📦 1/5 Verificando dependencias..." -ForegroundColor Yellow
cmd /c "npm install --silent --no-audit --no-fund"

# 2. SINCRONIZACIÓN DB FORZADA (El truco: --accept-data-loss)
# Esto evita que te pregunte "Are you sure?" y le da YES a todo automáticamente.
Write-Host "☁️ 2/5 Sincronizando Neon DB (Modo Force)..." -ForegroundColor Yellow
cmd /c "npx prisma db push --accept-data-loss"
cmd /c "npx prisma generate"

# 3. SEMBRADO DE DATOS (SUPER ADMIN)
Write-Host "🌱 3/5 Inyectando Credenciales Max Salazar..." -ForegroundColor Yellow
node scripts/seed_admin.js

# 4. COMPILACIÓN LIMPIA
Write-Host "🏗️ 4/5 Construyendo Ecosistema (Build)..." -ForegroundColor Yellow
# Borrar caché vieja silenciosamente
if (Test-Path ".next") { Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue }
cmd /c "npm run build"

# 5. LANZAMIENTO
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 5/5 SISTEMA LISTO. DESPEGANDO..." -ForegroundColor Green
    # Abrir navegador automáticamente (Opcional, pero útil)
    Start-Process "http://localhost:3000"
    cmd /c "npm start"
} else {
    Write-Host "❌ ERROR CRÍTICO EN EL BUILD. REVISA LOS LOGS." -ForegroundColor Red
    Pause
}
