# ========================================================
# 📚 SEMBRADOR DE CURRÍCULO (MEP KNOWLEDGE)
# ========================================================

Write-Host "📚 Inyectando Inteligencia Curricular..." -ForegroundColor Cyan
cmd /c "npx prisma generate"
cmd /c "npx tsx prisma/seed_curriculum.ts"

Write-Host "✅ LISTO. Revisa la tabla 'EvaluationActivity' para ver los ejemplos." -ForegroundColor Green
