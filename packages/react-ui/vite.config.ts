import { globSync } from 'glob';
import type { OutputOptions, ChunkFileNamesFunction } from 'rolldown';
import { defineConfig, mergeConfig, esmExternalRequirePlugin } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import commonConfig, {
  type ModulePattern,
  srcPattern,
  getInputMap
} from 'commons/esm/vite.config.js';

const patterns: ModulePattern[] = [
  {
    pattern: /^src[/\\](index)\.ts?/
  },
  {
    pattern: /^src[/\\](.+[/\\]index|functions)\.ts/
  }
];

const output: OutputOptions = {
  keepNames: true,
  codeSplitting: {
    groups: [
      {
        name: 'vendor',
        test: (id) => !srcPattern.test(id)
      },
      {
        name: 'styles',
        test: (id) => id.endsWith('.scss')
      }
    ]
  }
};

const chunkfileNames =
  (ext: 'cjs' | 'js'): ChunkFileNamesFunction =>
  (chunk) =>
    `${chunk.moduleIds.find((id) => id.endsWith('index.ts')) ? '[name]/' : ''}[name].${ext}`;

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
          ...globSync('src/utils/**/*.ts'),
          ...globSync('src/*/index.{ts,tsx}')
        ]),
        cssFileName: 'style'
      },
      rolldownOptions: {
        plugins: [
          esmExternalRequirePlugin({
            external: ['react']
          })
        ],
        experimental: {
          lazyBarrel: true
        },
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          'prop-types',
          'react/jsx-runtime',
          'react-dom',
          /^html-ui\/?/
        ],
        output: [
          { ...output, format: 'es', chunkFileNames: chunkfileNames('js') },
          { ...output, format: 'cjs', chunkFileNames: chunkfileNames('cjs') }
        ]
      }
    }
  }),
  false
);
