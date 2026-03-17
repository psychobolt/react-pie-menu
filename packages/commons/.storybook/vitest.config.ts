import { createRequire } from 'node:module';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const require = createRequire(import.meta.url);

const configDir = join(process.cwd(), '.storybook');

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
    storybookTest({
      configDir,
      storybookUrl: process.env.SB_URL
    })
  ],
  test: {
    name: 'storybook',
    root: process.cwd(),
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    },
    setupFiles: [
      require.resolve('../vitest.setup'),
      join(configDir, 'vitest.setup.ts')
    ]
  }
});
