import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during build for POC
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build for POC
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
