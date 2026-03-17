import path from "path";
import type { NextConfig } from "next";

const nextConfig = async (): Promise<NextConfig> => ({
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve("../../"),
  turbopack: {
    resolveAlias: {
      "prop-types": "./node_modules/prop-types",
    },
  },
});

export default nextConfig;
