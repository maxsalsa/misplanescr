/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Desactivar modo estricto acelera dev y evita doble render
  swcMinify: true,        // Compilación rápida
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Evitar chequear ESLint durante el build de desarrollo para ir mas rapido
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;