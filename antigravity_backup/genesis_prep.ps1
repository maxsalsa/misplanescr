# ========================================================
# 🏗️ GÉNESIS PREP: ENTORNO PARA VERSIÓN FINAL (MNC + FILES)
# ========================================================
$ErrorActionPreference = "SilentlyContinue"

Write-Host "🏗️ PREPARANDO ENTORNO..." -ForegroundColor Magenta

# 1. Instalar gestor de subida de archivos y estado
Write-Host "📦 Instalando Uploadthing (Archivos) y Zustand (Trivias)..." -ForegroundColor Cyan
cmd /c "npm install uploadthing @uploadthing/react zustand clsx tailwind-merge --save --legacy-peer-deps"

# 2. Instalar componentes de interfaz modernos (Radix UI para Shadcn)
Write-Host "🎨 Instalando Radix UI..." -ForegroundColor Cyan
cmd /c "npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu class-variance-authority --save --legacy-peer-deps"

# 3. Limpiar caché de Next.js
if (Test-Path ".next") { 
    Remove-Item ".next" -Recurse -Force 
    Write-Host "🧹 Caché .next limpiada." -ForegroundColor Green
}

Write-Host "✅ LIBERÍAS INSTALADAS. LISTO PARA EL SCHEMA." -ForegroundColor Green
