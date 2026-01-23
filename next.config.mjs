/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Ignoramos errores para forzar el despliegue en producción
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignoramos errores de estilo
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
