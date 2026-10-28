import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from './lib/image-config';

const nextConfig: NextConfig = {
  // Keep an existing production server intact while measuring an audit build.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Compression for better performance
  compress: true,

  // Production source maps
  productionBrowserSourceMaps: false,

  // Security
  poweredByHeader: false,

  async redirects() {
    return [
      { source: '/komukunaevent', destination: '/', permanent: true },
      { source: '/komukunaevent/:path+', destination: '/:path+', permanent: true },
    ];
  },

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
    deviceSizes,
    imageSizes,
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
  },

  experimental: {
    // Avoid pulling unrelated wedding-album styles into the marketing routes.
    cssChunking: false,
    // With route CSS isolated, inline the small styles to paint before hydration.
    inlineCss: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
};

export default nextConfig;

