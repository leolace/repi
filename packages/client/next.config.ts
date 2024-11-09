import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    reactCompiler: true
  }
};

export default nextConfig;
