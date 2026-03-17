import { defineConfig } from 'eslint/config';
import commonConfig from 'commons/esm/eslint.config.js';

export default defineConfig([
  ...commonConfig,
  {
    ignores: ['apps/', 'packages/']
  }
]);
