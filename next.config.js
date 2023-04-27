/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
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
		unoptimized: true,
	},
}

module.exports = nextConfig
