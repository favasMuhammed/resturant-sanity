import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Hostinger
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.sanity.io',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
  experimental: {
    // Improve React 19 compatibility
    reactCompiler: false,
  },
  // Better error handling for server components
  serverExternalPackages: ['@sanity/image-url', 'next-sanity'],
  // Ensure proper webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
