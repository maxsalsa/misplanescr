# ========================================================
# 🧠 LANZADOR DE SEMILLA INTELIGENTE (RAG -> DB)
# ========================================================

Write-Host "🧠 Conectando Cerebro Vectorial con Base de Datos..." -ForegroundColor Cyan
# Asegurar dependencias de python si es necesario (asumimos instaladas por el usuario "sistema funcional")
# pip install langchain-chroma ...

cmd /c "npx tsx scripts/seed_from_vectors.ts"

Write-Host "✅ PROCESO FINALIZADO." -ForegroundColor Green
Write-Host "   Revise los logs para 'Warnings' de lecciones."
