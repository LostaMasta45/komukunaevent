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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for mobile-first approach
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
};

export default nextConfig;

