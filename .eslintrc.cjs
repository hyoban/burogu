/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"next/core-web-vitals",
		"plugin:tailwindcss/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
}
