/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {
		"@typescript-eslint/no-empty-interface": [
			"error",
			{
				allowSingleExtends: true,
			},
		],
	},
}
