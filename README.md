# React Rollup Boilerplate

[![Main workflow](https://github.com/psychobolt/react-rollup-boilerplate/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/react-rollup-boilerplate/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/react-rollup-boilerplate/branch/master/graph/badge.svg?flag=react-rollup-boilerplate)](https://codecov.io/gh/psychobolt/react-rollup-boilerplate/tree/master/src)

A boilerplate for building [React](https://reactjs.org/) libraries.

## Included

- Yarn [Plug'n'Play](https://yarnpkg.com/features/pnp) and [workspaces](https://yarnpkg.com/features/workspaces/) support
- [ES Module](https://nodejs.org/api/esm.html) system support
- Build packages in CommonJS and ESM formats with [Rollup](https://rollupjs.org/) and other plugins:
    - [Babel](https://www.npmjs.com/package/@rollup/plugin-babel)
    - [Node Resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)
    - [CommonJS](https://www.npmjs.com/package/rollup-plugin-commonjs)
    - [Terser](https://www.npmjs.com/package/rollup-plugin-terser)
    - [Replace](https://www.npmjs.com/package/@rollup/plugin-replace)
- [styled-components](https://www.styled-components.com/) with [default](https://www.styled-components.com/docs/tooling#stylelint) [stylelint](https://stylelint.io/) support
- Run tests with [Jest](https://facebook.github.io/jest/)
- Code Coverage reporting with [Codecov](https://codecov.io/)
- Dev sandbox and documentation with [Storybook](https://storybook.js.org/)
- Structural and interaction testing with [Enzyme](https://github.com/airbnb/enzyme)
- Type checking with [Flow](https://flow.org)
- JS style check with [ESLint](http://eslint.org/) using [AirBnb style guide](https://github.com/airbnb/javascript)
- Continuous integration with [GitHub Actions](https://github.com/features/actions)

## Development Guide

Please see [DEVELOPMENT.md](DEVELOPMENT.md)