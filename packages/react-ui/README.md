# React UI

[<img src="https://codecov.io/gh/psychobolt/vite-storybook-boilerplate/branch/main/graph/badge.svg?flag=react-ui&component-id=react-ui">](https://codecov.io/gh/psychobolt/vite-storybook-boilerplate/tree/main/packages/react-ui)

UI Components used for the [next-app demo](https://github.com/psychobolt/vite-storybook-boilerplate/tree/main/apps/next-app).

Powered by:

- [html-ui](https://github.com/psychobolt/vite-storybook-boilerplate/tree/main/packages/html-ui)
- [React](https://react.dev)
- [Storybook React Docs](https://storybook.js.org/docs/writing-docs/introduction) with CSS Module support [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)

## Install

```sh
yarn [workspace workspace-name] add [-D[E]] html-ui react-ui
```

## Usage

```jsx
// Component.jsx
// import 'html-ui/style.css';
// or
import 'html-ui/ComponentA.css';
import 'html-ui/ComponentB.css';

import React from 'react';
// import { ComponentA, ComponentB } from 'react-ui';
// or
import { ComponentA } from 'react-ui/ComponentA';
import { ComponentB } from 'react-ui/ComponentB';

export const Component = ({ label = 'Default Text' }) => (
  <ComponentA>
    <ComponentB>{label}</ComponentB>
  </ComponentA>
);
```

## API

See main Storybook [docs](https://main--642f33339c5eee1cdf95b318.chromatic.com/?path=/docs/readme--docs)
