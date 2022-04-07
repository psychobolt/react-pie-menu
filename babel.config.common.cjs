module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: process.env.BABEL_ENV === 'test' ? { node: 'current' } : {},
    }],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-property-in-object',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    [
      'lodash',
      {
        id: ['lodash'],
      },
    ],
    'babel-plugin-add-module-exports',
    [
      'babel-plugin-styled-components',
      {
        topLevelImportPaths: ['styled-components-theme-connector'],
      },
    ],
    'babel-plugin-named-exports-order',
  ],
};
