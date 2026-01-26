Write-Host "🕵️ AUDITORÍA DE PRECISIÓN..." -ForegroundColor Cyan
$errors = 0

# Buscar alertas mostrando RUTA COMPLETA
$filesWithAlerts = Get-ChildItem -Path "app" -Recurse -Filter "*.js" | Select-String "alert\("
if ($filesWithAlerts) {
    Write-Host "⚠️ ALERTA ENCONTRADA EN:" -ForegroundColor Red
    $filesWithAlerts | ForEach-Object { 
        Write-Host "   ❌ $($_.Path)  (Línea $($_.LineNumber))" -ForegroundColor Yellow 
    }
    $errors++
} else {
    Write-Host "✅ CÓDIGO LIMPIO: Cero alertas detectadas." -ForegroundColor Green
}

if ($errors -eq 0) {
    Write-Host "🏆 LISTO PARA DESPEGUE." -ForegroundColor Green
}
