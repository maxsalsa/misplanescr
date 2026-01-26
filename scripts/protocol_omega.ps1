# --- PROTOCOLO OMEGA: SEO, SEGURIDAD Y PWA ---
# AUTOR: LIC. MAX SALAZAR SÁNCHEZ
# OBJETIVO: VISIBILIDAD EN GOOGLE Y BLINDAJE DE SERVIDOR

Write-Host "📡 CONFIGURANDO RADARES DE BÚSQUEDA Y ESCUDOS..." -ForegroundColor Cyan

# 1. NEXT.CONFIG.MJS (BLINDAJE DE CABECERAS HTTP)
# Esto protege contra ataques XSS, Clickjacking y fuerza HTTPS.
$nextConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Ocultar que usamos Next.js para despistar hackers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
'@
$configPath = Join-Path $PWD "next.config.mjs"
[System.IO.File]::WriteAllText($configPath, $nextConfig, [System.Text.Encoding]::UTF8)

# 2. ROBOTS.TXT (PARA QUE GOOGLE NOS INDEXE)
if (!(Test-Path "app/robots.js")) {
    $robotsFile = @'
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/', // Protegemos el área privada
    },
    sitemap: 'https://aulaplan.cr/sitemap.xml',
  }
}
'@
    $rPath = Join-Path $PWD "app\robots.js"
    [System.IO.File]::WriteAllText($rPath, $robotsFile, [System.Text.Encoding]::UTF8)
}

# 3. MANIFEST.JSON (PARA QUE PAREZCA UNA APP NATIVA EN CELULAR)
if (!(Test-Path "app/manifest.js")) {
    $manifestFile = @'
export default function manifest() {
  return {
    name: 'AulaPlan CR - Planeamiento Inteligente',
    short_name: 'AulaPlan',
    description: 'Plataforma oficial de planeamiento didáctico MEP con IA.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#1e293b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
'@
    $mPath = Join-Path $PWD "app\manifest.js"
    [System.IO.File]::WriteAllText($mPath, $manifestFile, [System.Text.Encoding]::UTF8)
}

# 4. REGLAS LEGALES (TÉRMINOS Y PRIVACIDAD - PLACEHOLDER)
$legalDir = Join-Path $PWD "app/legal"
if (!(Test-Path $legalDir)) { New-Item -ItemType Directory -Path $legalDir -Force | Out-Null }

$legalPage = @'
export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 prose prose-slate">
      <h1>Términos de Servicio y Privacidad</h1>
      <p>AulaPlan CR cumple con la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley No. 8968).</p>
      <h3>1. Datos de Estudiantes</h3>
      <p>Los datos ingresados son encriptados y propiedad exclusiva del docente suscriptor.</p>
      <h3>2. Pagos</h3>
      <p>Las suscripciones vía SINPE Móvil no son reembolsables una vez activado el servicio digital.</p>
    </div>
  );
}
'@
$lPath = Join-Path $PWD "app\legal\page.js"
[System.IO.File]::WriteAllText($lPath, $legalPage, [System.Text.Encoding]::UTF8)

Write-Host "✅ SISTEMA BLINDADO Y LISTO PARA BUSCADORES." -ForegroundColor Green
Write-Host "   -> Seguridad HTTP: ACTIVA" -ForegroundColor Gray
Write-Host "   -> SEO (Robots/Manifest): ACTIVO" -ForegroundColor Gray
