/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
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
		unoptimized: true,
	},
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
