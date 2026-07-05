import * as tseslint from '@typescript-eslint/utils/ts-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';

import { stories } from './vite-main.js';

const configs = storybook.configs['flat/recommended'].map((config) => {
  switch (config.name) {
    case 'storybook:recommended:stories-rules':
      return {
        ...config,
        files: stories
      };
    default:
      return config;
  }
});

// See issue https://github.com/storybookjs/storybook/issues/32405
type Config = Exclude<
  (typeof configs)[0],
  // @ts-ignore
  { plugins: { storybook: { [key: string]: tseslint.RuleModule } } }
>;

export default defineConfig(
  ...(configs as Config[]),
  {
    rules: {
      'storybook/prefer-pascal-case': 0
    }
  },
  globalIgnores(['!.storybook'])
);
