module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module'
	},
	// https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier']
}
