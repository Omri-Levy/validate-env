module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [`standard-with-typescript`, `prettier`],
	overrides: [],
	parserOptions: {
		ecmaVersion: `latest`,
		sourceType: `module`,
		project: `./tsconfig.json`,
	},
	rules: {
		quotes: [`error`, `backtick`],
		'array-callback-return': `off`,
		'prefer-template': `error`,
		'@typescript-eslint/restrict-template-expressions': `off`,
	},
};
