/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
	},
}

module.exports = nextConfig
