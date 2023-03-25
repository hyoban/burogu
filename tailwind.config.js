const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				// https://tailwindcss.com/docs/font-family#customizing-the-default-font
				mono: ["var(--font-dm-mono)", ...defaultTheme.fontFamily.mono],
			},
			screens: {
				sm: "645px",
			},
		},
	},
	plugins: [
		iconsPlugin({
			// Select the icon collections you want to use
			collections: getIconCollections(["mdi", "carbon"]),
		}),
		require("tailwindcss-animate"),
	],
	darkMode: "class",
}
