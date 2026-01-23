Write-Host "Fixing Next.js configuration..."
npm install next-pwa --save --legacy-peer-deps
git add package.json package-lock.json
git commit -m "Fix: Add next-pwa dependency"
git push
Write-Host "Done. PWA library installed and pushed."
