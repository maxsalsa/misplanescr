# ========================================================
# 🔥 EJECUTAR TEST DE FUEGO (SaaS Verification)
# ========================================================

Write-Host "🔥 Auditando Lógica de Negocio..." -ForegroundColor Cyan
cmd /c "npx tsx prisma/verify_saas.ts"
