Write-Host "Iniciando Sincronización con GitHub..."
git status --short
git add .
$fecha = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update: Mejoras y correcciones generales $fecha"
git push
Write-Host "Sincronización completada."
