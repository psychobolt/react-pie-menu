import { defineConfig, mergeConfig } from 'vitest/config';
import commonConfig from 'commons/esm/.storybook/vitest.config.js';

import vitestConfig from '../vitest.config.ts';

export default defineConfig((env) =>
  mergeConfig(commonConfig, vitestConfig(env))
);
