const {
	iconsPlugin,
	getIconCollections,
} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		iconsPlugin({
			// Select the icon collections you want to use
			collections: getIconCollections(["mdi", "carbon"]),
		}),
	],
	darkMode: "class",
};
