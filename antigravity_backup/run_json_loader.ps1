# ========================================================
# 🤖 LANZADOR DE INYECCIÓN MASIVA (JSONs)
# ========================================================

Write-Host "🤖 Leyendo carpeta /seeds/data..." -ForegroundColor Cyan
cmd /c "npm install tsx --save-dev"
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_loader.ts"

Write-Host "✅ DATOS CARGADOS." -ForegroundColor Green
Write-Host "   Ahora puedes copiar textos de PDFs, pedirle a ChatGPT el JSON,"
Write-Host "   guardarlo en /seeds/data y correr este script."
