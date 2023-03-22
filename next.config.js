/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		appDir: true,
		mdxRs: true,
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
}
const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
