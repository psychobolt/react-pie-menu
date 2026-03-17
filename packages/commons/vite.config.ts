import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import postcssConfig from './postcss.config.js';

const root = process.cwd();
const packageName = process.env.npm_package_name ?? '';
const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');

export const srcPattern = /^(.*src)[/\\]/;

export interface ModulePattern {
  pattern: RegExp;
  ext?: string;
}

function getFileName(patterns: ModulePattern[], moduleId: string) {
  for (const { pattern, ext } of patterns) {
    if (!pattern.test(moduleId)) continue;
    const [, name] = moduleId.match(pattern) ?? [];
    if (name) return `${name}${ext ? '.' + ext : ''}`;
  }
  return moduleId.replace(srcPattern, '');
}

export const getInputMap = (
  patterns: ModulePattern[],
  input: string[]
): Record<string, string> =>
  input.reduce((rest, file) => {
    const fileName = getFileName(patterns, file);
    return {
      ...rest,
      [fileName]: file
    };
  }, {});

export default defineConfig({
  base: '',
  plugins: [tsconfigPaths({ root })],
  build: {
    emptyOutDir: !isWatch,
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/index.ts',
      name: packageName,
      // the proper extensions will be added
      formats: ['es', 'cjs']
    }
  },
  css: {
    postcss: postcssConfig
  }
});
