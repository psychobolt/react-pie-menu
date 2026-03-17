import { globSync } from 'glob';
import { defineConfig, mergeConfig } from 'vite';
import sassGlobImport from 'vite-plugin-sass-glob-import';
import noEmit from 'rollup-plugin-no-emit';
import commonConfig, {
  type ModulePattern,
  getInputMap
} from 'commons/esm/vite.config.js';

const patterns: ModulePattern[] = [
  {
    pattern: /src[/\\](style)\.scss$/,
    ext: 'css'
  },
  {
    pattern: /^.+[/\\]+.+[/\\]+(.+)\.module\.scss$/,
    ext: 'css'
  }
];

const mainEntryJs = /^index.+\.js(?:\.map)?/;

export default mergeConfig(
  commonConfig,
  defineConfig({
    plugins: [
      sassGlobImport(),
      noEmit({ match: (file) => mainEntryJs.test(file) })
    ],
    css: {
      modules: {
        scopeBehaviour: 'global'
      }
    },
    build: {
      lib: false,
      rolldownOptions: {
        input: getInputMap(patterns, [
          'src/style.scss',
          ...globSync('src/*/*.module.scss')
        ]),
        preserveEntrySignatures: 'strict',
        output: {
          entryFileNames: 'index.js', // disabling JS output is unsupported, use noEmit()
          assetFileNames: ({ name }) => name || 'assets/[name]-[hash][extname]'
        }
      }
    }
  }),
  false
);
