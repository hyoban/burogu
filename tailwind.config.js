const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				// https://tailwindcss.com/docs/font-family#customizing-the-default-font
				mono: ["var(--font-dm-mono)", ...defaultTheme.fontFamily.mono],
				syne: ["var(--font-syne-mono)", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections(["carbon"]),
		}),
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
	darkMode: "class",
}
