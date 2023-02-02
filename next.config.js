/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      'shiki',
      'vscode-oniguruma',
      'vscode-textmate',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'image.hyoban.cc',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/api/feed',
      },
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
