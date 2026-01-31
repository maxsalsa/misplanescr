Write-Host "🧹 LIMPIEZA DE SISTEMA..."
Remove-Item -Path ".next" -Recurse -ErrorAction SilentlyContinue
Write-Host "🔄 REGENERANDO CLIENTE PRISMA..."
npx prisma generate
Write-Host "🚀 LISTO PARA ARRANCAR."