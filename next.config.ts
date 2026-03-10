import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      },
    ],
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }
};

export default nextConfig;
