# HTML UI

[<img src="https://codecov.io/gh/psychobolt/vite-storybook-boilerplate/branch/main/graph/badge.svg?flag=html-ui&component-id=html-ui">](https://codecov.io/gh/psychobolt/vite-storybook-boilerplate/tree/main/packages/html-ui)

UI Components used for the [svelte-app demo](https://github.com/psychobolt/vite-storybook-boilerplate/tree/main/apps/svelte-app).

Powered by:

- [Lit](https://lit.dev)
- [Sass](https://sass-lang.com) and PostCSS plugins:
  - [postcss-pseudo-classes](https://www.npmjs.com/package/postcss-pseudo-classes)
- Docs Renderer [@storybook/web-components](https://www.npmjs.com/package/@storybook/web-components) with CSS Module support [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)

## Install

```sh
yarn [workspace workspace-name] add [-D[E]] html-ui
```

## Usage

### as Import

#### CSS

```scss
@import 'html-ui/style[.css]';
// or
@import 'html-ui/[ComponentA][.css]';
@import 'html-ui/[ComponentB][.css]';
```

#### Sass

```scss
@use 'html-ui/style[.css]';
// or
@use 'html-ui/[ComponentA][.css]';
@use 'html-ui/[ComponentB][.css]';
```

#### JS or JSX

```js
import 'html-ui/style.css';
// or
import 'html-ui/[ComponentA].css';
import 'html-ui/[ComponentB].css';
```

### as Mixin

#### Sass

```scss
@use 'sass:meta';

.html-ui {
  @include meta.load-css('html-ui/style[.css]');
  // or
  @include meta.load-css('html-ui/[ComponentA][.css]');
  @include meta.load-css('html-ui/[ComponentB][.css]');
}
```

### as Module

#### JS

```js
import classesA from 'html-ui/[ComponentA].css';
import classesB from 'html-ui/[ComponentB].css';

export function render() {
  const body = document.createElement('body');

  body.insertAdjacentHTML(
    'beforeend',
    `<div class="${classesA.componentA}">
      <button class="${classesB.componentB}">Click Me!</button>
    </div>`
  );

  return body;
}
```

#### JSX

```jsx
import classesA from 'html-ui/[ComponentA].css';
import classesB from 'html-ui/[ComponentB].css';

export const Component = (props) => (
  <div className={classesA.componentA}>
    <button className={classesB.componentB}>Click Me!</button>
  </div>
);
```

## API

See main Storybook [docs](https://main--642f32dc32967ec57a93be46.chromatic.com/?path=/docs/readme--docs)
