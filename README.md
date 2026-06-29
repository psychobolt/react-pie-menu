# React Pie Menu

[<img src="https://img.shields.io/npm/v/react-pie-menu.svg">](https://www.npmjs.com/package/react-pie-menu)
[<img src="https://github.com/psychobolt/react-pie-menu/actions/workflows/status.yml/badge.svg">](https://github.com/psychobolt/react-pie-menu/actions/workflows/main.yml)
[<img src="https://codecov.io/gh/psychobolt/react-pie-menu/branch/next/graph/badge.svg">](https://codecov.io/gh/psychobolt/react-pie-menu/tree/next/src)

> This README is for the next release 2.x. Please see [v1](https://github.com/psychobolt/react-pie-menu/tree/react-pie-menu%401.0.0-alpha.4) for the previous release docs.

A configurable radial menu for React.

## Features

Powered by:

- [@psychobolt/circle-ui-elements](https://next--69a65f257a10176f943035ff.chromatic.com/)
- [@psychobolt/circle-ui-react](https://next--69a6607dcf15c4da3159cfcb.chromatic.com)
- [Storybook React Docs](https://storybook.js.org/docs/writing-docs/introduction) with CSS Module support [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)

## Installation (Preview)

This package is currently published to GitHub Packages as a preview release.

Create or update a project-level `.npmrc` file:

```ini
@psychobolt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install the package:

```sh
npm install @psychobolt/react-pie-menu
# or
yarn add @psychobolt/react-pie-menu
```

`GITHUB_TOKEN` must be a GitHub token with access to the package. For private packages, use a personal access token with `read:packages` access.

Do not commit a real token to `.npmrc`.

### Yarn Berry

For Yarn 2+, you can use `.yarnrc.yml` instead:

```yml
npmScopes:
  psychobolt:
    npmRegistryServer: 'https://npm.pkg.github.com'
    npmAuthToken: '${GITHUB_TOKEN}'
```

Then install the package:

```sh
yarn add @psychobolt/react-pie-menu
```

## API (Experimental)

See [docs](https://next--62646041abdb4b004aab3fdf.chromatic.com)

## References

1. "Building a Circular Navigation with CSS Clip-paths" by Chris Coyier, CSS-Tricks. Available at: https://css-tricks.com/building-a-circular-navigation-with-css-clip-paths/ (Accessed: 10 June 2024)
2. "A Simple Pie Chart in SVG" by David Gilbertson, Medium. Available at: https://david-gilbertson.medium.com/a-simple-pie-chart-in-svg-dbdd653b6936 (Accessed: 10 June 2024)
