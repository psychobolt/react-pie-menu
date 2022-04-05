# Development Guide

## Setup

Install the latest [Node](https://nodejs.org/)@^17.4.0 and [Yarn](https://yarnpkg.com) and simply run ```yarn node ./bootstrap.js``` in the root project directory.

## Local development

During development,
```sh
yarn start # watch, build, and serves packages
# or
yarn dev # same as above, but includes development sources and maps
```

## Including NPM packages

```sh
yarn add <package-name> --dev # for dev tools, story dependencies, libraries to be bundled
yarn add <package-name> [--peer] # for external dependencies (Note: Include in externals from rollup.config.common.js whenever update)
yarn workspace <workspace-name> add <package-name>@* [--dev] # Add/link a package to a specific local package. See section: Including local packages
```

> Note: All packages are installed using the [PnP strategy](https://yarnpkg.com/features/pnp) by default. To see advantages, visit the [official Yarn docs](https://yarnpkg.com/features/pnp#the-node_modules-problem). Some tools however, such as Flow, are not compatible with the PnP resolution strategy. In order to circumvent you can opt out by installing non PnP configurations as a seperate Yarn project. For example, see [Static Types](#static-types).

## Local packages and commands

This boilerplate supports [Monorepo](https://danluu.com/monorepo/) configurations out of the box and will watch, build, serve any local packages. Each package should have ```src/index.js``` entry file. Refer to Yarn's [CLI docs](https://yarnpkg.com/cli/) for more information on running workspace commands.

> You can also give alias to source files of the packages in order to work with Visual Studio Code's Intellisense and ESLint. See [jsconfig.json](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/jsconfig.json) and [usage](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases). Also see the [Lint](#lint) section.

## Static Types

### Installing Types

```sh
yarn flow-typed-install # clean & install flow definitions from dependencies and peerDependencies
yarn flow-typed-update # downloads and updates new flow definitions
cd shared/flow-deps && yarn install <package-name> # install any node modules that flow cannot resolve with PnP strategy
```

### Creating Stubs

```
yarn flow-typed-create-stub <package-name> # create a flow-typed stub for a package name into shared/flow-typed/npm
```

> Note: Since the shared/flow-typed/npm is ignored, it is best to move the stub file so it can be committed.

### Run Flow

```sh
yarn flow # performs type checking on files
```

## Lint

```sh
yarn lint # runs linter to detect any style issues (css & js)
yarn lint:css # lint only css
yarn lint:js # lint only js
yarn lint:js --fix # attempts to fix js lint issues
```

### Local Package Aliases

Alias for local packages can be configured in [.eslintrc.json](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/.eslintrc.json) using the [Alias Resolver](https://www.npmjs.com/package/eslint-import-resolver-node) plugin. In the future, package names for workspace projects will be automatically configured by the usage of [workspaces.js](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/workspaces.js). Due to the nature of this, that work will be postponed until eslint have support for [ESM Configurations](https://github.com/eslint/eslint/issues/13481). 

## Test

```sh
yarn test # runs functional/unit tests for all packages
```

> Supports the [PACKAGES](#packages) variable. You can also inspect all tests in debug mode within Visual Studio Code.

## Coverage

Coverage will be uploaded to your [codecov](https://codecov.io/) account, individually for packages by using each package's name as a [flag](https://docs.codecov.io/docs/flags).

## Other scripts

```sh

yarn build # builds sources for prod and dev
yarn build:dev # builds sources for development
yarn build:prod # builds sources for production

yarn watch # watches dev builds
yarn dist # builds all packages and publishes to npm
```

> Supports the [PACKAGES](#packages) variable.

## Environment Variables

### PACKAGES

Some scripts optionally allow the environment variable to specific local packages(s) (in Glob format) for running scripts e.g. ```PACKAGES=default-export,package-* yarn test```