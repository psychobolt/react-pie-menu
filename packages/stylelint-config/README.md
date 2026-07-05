# Stylelint Config

Local workspace for sharing Stylelint configs.

## Setup

```sh
yarn workspace [workspace-name] add -DE stylelint-config
```

## Config

Create a `stylelint.config.js` file at your workspace root. e.g.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: [
    '<relative>/<path>/<to>/stylelint-config/esm/stylelint-foobar.config'
  ]
};
```

### [stylelint-scss.config](stylelint-scss.config.ts)

Linting for Sass syntax.
