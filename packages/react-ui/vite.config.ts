import { globSync } from 'glob';
import { defineConfig, mergeConfig, esmExternalRequirePlugin } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import commonConfig, {
  type ModulePattern,
  srcPattern,
  getInputMap
} from 'commons/esm/vite.config.js';

const extPattern = /\.tsx?$/;
const patterns: ModulePattern[] = [
  {
    pattern: /^src[/\\](index)\.ts/
  },
  {
    pattern: /^src[/\\](.+[/\\].+)\.tsx?/
  }
];

export default mergeConfig(
  commonConfig,
  defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    css: {
      modules: {
        exportGlobals: true,
        localsConvention: 'camelCase'
      }
    },
    build: {
      lib: {
        entry: getInputMap(patterns, [
          'src/index.ts',
          ...globSync('src/**/*[!@(.story|.stories)].{ts,tsx}')
        ])
      },
      rolldownOptions: {
        plugins: [
          esmExternalRequirePlugin({
            external: ['react']
          })
        ],
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['prop-types', 'react/jsx-runtime', 'react-dom', 'html-ui'],
        output: {
          // chunkFileNames: '[name]', // name is handled in manualChunks
          manualChunks(id) {
            if (!srcPattern.test(id)) return 'vendor';
            return id.replace(srcPattern, '').replace(extPattern, '');
          }
        }
      }
    }
  }),
  false
);
