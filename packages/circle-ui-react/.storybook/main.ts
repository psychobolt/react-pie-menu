import { createRequire } from 'node:module';
import { defineMain } from '@storybook/react-vite/node';
import commonConfig, {
  configureSort,
  getAbsolutePath
} from 'commons/esm/.storybook/vite-main.js';

const require = createRequire(import.meta.url);

configureSort({
  storyOrder: {
    readme: null,
    components: {
      sector: null,
      circle: null,
      pie: null
    }
  }
});

export default defineMain({
  ...commonConfig,
  addons: [
    ...commonConfig.addons,
    getAbsolutePath('@storybook/addon-vitest', require)
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite', require),
    options: {
      strictMode: true
    }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      skipChildrenPropWithoutDoc: false,
      propFilter: () => true
    }
  }
});
