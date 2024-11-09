import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    reactCompiler: false
  },
  eslint: {
    ignoreDuringBuilds: true
  },  
};

export default nextConfig;
