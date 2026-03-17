import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      exportGlobals: true,
      localsConvention: 'camelCase'
    }
  }
});
