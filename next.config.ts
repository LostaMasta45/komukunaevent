import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compression for better performance
  compress: true,

  // Production source maps
  productionBrowserSourceMaps: false,

  // Security
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    formats: ['image/webp'],
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
};

export default nextConfig;
