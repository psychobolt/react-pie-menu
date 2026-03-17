import { createRequire } from 'node:module';
import { defineConfig, mergeConfig } from 'vitest/config';
import commonConfig from 'commons/esm/vitest.config.js';

import viteConfig from './vite.config.ts';

const require = createRequire(import.meta.url);

export default mergeConfig(
  mergeConfig(commonConfig, viteConfig),
  defineConfig({
    test: {
      coverage: {
        include: ['src/**/*.{ts,tsx}']
      },
      projects: [
        '.storybook/vitest.config.ts',
        {
          extends: true,
          test: {
            name: 'react (jsdom)',
            environment: 'jsdom',
            setupFiles: [require.resolve('commons/esm/vitest.setup')]
          }
        }
      ],
      passWithNoTests: true
    }
  })
);
