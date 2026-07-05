import { createRequire } from 'node:module';
import { getJestConfig } from '@storybook/test-runner';

const require = createRequire(import.meta.url);

// The default Jest configuration comes from @storybook/test-runner
const testRunnerConfig = getJestConfig();

const config: typeof testRunnerConfig = {
  ...testRunnerConfig,
  /** Add your own overrides below, and make sure
   *  to merge testRunnerConfig properties with your own
   * @see https://jestjs.io/docs/configuration
   */
  passWithNoTests: true,
  reporters: [
    'default',
    [
      require.resolve('jest-junit'),
      {
        outputDirectory: 'test-reports'
      }
    ]
  ]
};

export default config;
