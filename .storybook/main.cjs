const appRoot = require('app-root-path');
const slash = require('slash');

const { getStories } = require('./utils.cjs');
const defaultConfig = require('./webpack.config.cjs');

const PROJECT_ROOT = slash(`${appRoot}`);

module.exports = {
  stories: getStories([`${PROJECT_ROOT}/stories/index.cjs`]),
  features: {
    postcss: false,
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: 'webpack5',
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
    },
  }),
};
