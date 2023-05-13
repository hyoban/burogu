/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
	},
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
}

module.exports = nextConfig
