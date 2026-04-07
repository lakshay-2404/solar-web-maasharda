import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
