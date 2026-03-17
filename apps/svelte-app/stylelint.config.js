/** @type {import('stylelint').Config} */
const config = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
	allowEmptyInput: true,
	formatter: process.env.CI ? 'compact' : 'string'
};

export default config;
