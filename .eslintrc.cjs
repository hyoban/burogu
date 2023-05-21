/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		"plugin:tailwindcss/recommended",
		"plugin:@typescript-eslint/recommended",
		"next/core-web-vitals",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
}
