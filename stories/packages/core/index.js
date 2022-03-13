import React from 'react';
import { HelloWorld } from '@psychobolt/react-rollup-boilerplate';

import App from 'stories/shared/App/index.js';

export default {
  title: 'packages/core',
  component: HelloWorld,
};

export const Example = () => <App><HelloWorld /></App>;
