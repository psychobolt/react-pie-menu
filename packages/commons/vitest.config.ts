import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/*.@(story|stories).@(js|jsx|ts|tsx)']
    },
    reporters: ['default', ['junit', { outputFile: 'test-reports/junit.xml' }]]
  }
});
