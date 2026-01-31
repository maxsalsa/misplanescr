/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Seguridad: Oculta que usamos Next.js
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Permitir subida de PDF/Adjuntos grandes
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, // Avatares de Google
    ],
  },
};

export default nextConfig;