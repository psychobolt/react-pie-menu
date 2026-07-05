import { defineConfig } from 'eslint/config';
import commonConfig from 'commons/esm/eslint.config.js';
import storybookConfig from 'commons/esm/.storybook/eslint-config.js';

export default defineConfig(commonConfig, storybookConfig);
