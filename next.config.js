/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: [
      "shiki",
      "vscode-oniguruma",
      "vscode-textmate",
      "stream-parser",
      "needle",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
