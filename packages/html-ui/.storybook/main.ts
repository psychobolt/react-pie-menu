import { createRequire } from 'node:module';
import { defineMain } from '@storybook/web-components-vite/node';
import { mergeConfig } from 'vite';
import commonConfig, {
  configureSort,
  getAbsolutePath
} from 'commons/esm/.storybook/vite-main.js';

import viteConfig from './vite.config.ts';

const require = createRequire(import.meta.url);

configureSort({
  storyOrder: {
    'configure your project': null,
    readme: null,
    components: null
  }
});

export default defineMain({
  ...commonConfig,
  addons: [
    ...commonConfig.addons,
    getAbsolutePath('@storybook/addon-coverage', require)
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite', require),
    options: {}
  },
  viteFinal: (config, options) =>
    mergeConfig(commonConfig.viteFinal(config, options), viteConfig)
});
