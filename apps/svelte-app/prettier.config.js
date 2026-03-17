import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('prettier').Options} */
export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [
		require.resolve('prettier-plugin-svelte'),
		require.resolve('prettier-plugin-sh'),
		require.resolve('prettier-plugin-packagejson')
	],
	overrides: [
		{ files: '*.svelte', options: { parser: 'svelte' } },
		{
			files: ['.*', '*.sh'],
			excludeFiles: ['.*.yml'],
			options: {
				parser: 'sh'
			}
		}
	]
};
