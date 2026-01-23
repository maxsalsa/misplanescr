/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Desactivado para evitar doble render en dev
  typescript: {
    ignoreBuildErrors: true, // IGNORAR ERRORES TS
  },
  eslint: {
    ignoreDuringBuilds: true, // IGNORAR ERRORES DE ESTILO
  },
  experimental: {
    // Forzamos características estables
  }
}

module.exports = nextConfig
