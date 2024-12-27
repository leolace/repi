import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    reactCompiler: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/inicio",
      permanent: true,
    }
  ],
};

export default nextConfig;
