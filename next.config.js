/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Minificación extrema para velocidad
  experimental: {
    optimizePackageImports: ['lucide-react', '@prisma/client'],
  },
  eslint: {
    ignoreDuringBuilds: true, // No detener producción por warnings menores
  },
};

module.exports = nextConfig;