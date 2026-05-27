import type { NextConfig } from "next";
import { apiUrl } from "./lib/config";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/static/uploads/**",
      },
    ],
    domains: ["127.0.0.1"],
  },
};

export default nextConfig;
