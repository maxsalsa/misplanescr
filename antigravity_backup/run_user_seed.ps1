# ========================================================
# 💳 LANZADOR DE USUARIOS SAAS (MARKET SEED)
# ========================================================

Write-Host "💳 Creando Clientes y Licencias..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_users.ts"

Write-Host "✅ MERCADO ACTIVO." -ForegroundColor Green
Write-Host "   - Max Admin (Super Admin)"
Write-Host "   - Clientes con Permisos Granulares (Mate, Técnico, Artes)"
