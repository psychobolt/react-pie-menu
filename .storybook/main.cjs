const appRoot = require('app-root-path');
const slash = require('slash');

const { getStories } = require('./utils.cjs');
const defaultConfig = require('./webpack.config.cjs');

const PROJECT_ROOT = slash(`${appRoot}`);

module.exports = {
  stories: getStories([`${PROJECT_ROOT}/stories/index.cjs`]),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  // See https://github.com/storybookjs/storybook/blob/master/addons/docs/src/frameworks/common/preset.ts, to configure
  webpackFinal: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.map(rule => {
          const { test, exclude } = rule;
          if (test.test('.md')) {
            return {};
          }
          if (exclude && exclude.test('.stories.mdx')) {
            return { ...rule, test: /\.md$/ };
          }
          if (test.test('.stories.mdx')) {
            return { ...rule, test: /\.mdx$/ };
          }
          if (test.test('.js') || test.test('.css')) {
            return {
              ...rule,
              ...(rule.use && rule.use.find(({ loader }) => loader && loader.indexOf('babel-loader') > -1)
                ? { exclude: /(node_modules|.yarn|.+.prod\.m?jsx?$)/ }
                : undefined),
              resourceQuery: { not: [/raw/] },
            };
          }
          return rule;
        }),
        ...defaultConfig.module.rules,
      ],
    },
    resolve: {
      ...config.resolve,
      ...defaultConfig.resolve,
      alias: {
        ...config.resolve.alias,
        ...defaultConfig.resolve.alias,
      },
    },
  }),
};
