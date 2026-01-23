
param([string]$mensaje = "Mejoras y actualizaciones")

Write-Host "🚀 PREPARANDO MOTORES..." -ForegroundColor Cyan
git add .
Write-Host "📦 Empaquetando cambios..." -ForegroundColor Yellow
git commit -m "$mensaje"
Write-Host "☁️  Enviando a GitHub..." -ForegroundColor Cyan
git push

Write-Host "---------------------------------------------------"
Write-Host "✅ ¡ÉXITO! Cambios guardados en la nube." -ForegroundColor Green
Write-Host "📡 Vercel ha recibido la señal y está actualizando tu web."
Write-Host "---------------------------------------------------"
