/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
	},
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			hostname: "*",
	// 		},
	// 	],
	// },
	output: "export",
	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig
