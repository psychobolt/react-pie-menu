import { defineMain } from '@storybook/react-vite/node';
import { mergeConfig } from 'vite';
import { configureSort } from 'commons/esm/.storybook/vite-main.js';
import commonConfig from '@psychobolt/circle-ui-react/esm/.storybook/main.js';

import viteConfig from './vite.config.ts';

configureSort({
  storyOrder: {
    readme: null,
    examples: null
  }
});

export default defineMain({
  ...commonConfig,
  viteFinal: (config, options) =>
    mergeConfig(commonConfig.viteFinal?.(config, options) ?? {}, viteConfig)
});
