const appRoot = require('app-root-path');
const slash = require('slash');

const { getStories } = require('./utils.cjs');

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
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
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
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'source-map-loader',
          enforce: 'pre',
        },
      ],
    },
    resolve: {
      ...config.resolve,
      // match defaults to rollup's https://github.com/rollup/plugins/tree/master/packages/node-resolve/#exportconditions
      ...(process.env.BABEL_ENV === 'development' ? { conditionNames: ['development', 'default', 'module', 'require'] } : undefined),
    },
  }),
};
