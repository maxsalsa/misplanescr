/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Ocultar que usamos Next.js para despistar hackers
  images: {
    unoptimized: true, // Para facilitar despliegue
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // Ajustar a dominios específicos en producción
    ],
  },
  // CABECERAS DE SEGURIDAD BANCARIA (OWASP)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' }, // Evita Clickjacking
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' } // Privacidad total
        ],
      },
    ];
  },
};

export default nextConfig;