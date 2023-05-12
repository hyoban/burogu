/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	experimental: {
		typedRoutes: true,
	},
	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig
