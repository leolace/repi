import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    reactCompiler: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },  
};

export default nextConfig;
