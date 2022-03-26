module.exports = {
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    // match defaults to rollup's https://github.com/rollup/plugins/tree/master/packages/node-resolve/#exportconditions
    ...(process.env.BABEL_ENV === 'development' ? { conditionNames: ['development', 'default', 'module', 'require'] } : undefined),
  },
};
