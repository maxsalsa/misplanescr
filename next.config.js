const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Auth
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub Auth
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false; // Evita error de dependencia de canvas en servidor
    return config;
  },
};

module.exports = withPWA(nextConfig);