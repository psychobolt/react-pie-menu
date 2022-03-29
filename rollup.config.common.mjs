import fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';
import mjsEntry from 'rollup-plugin-mjs-entry';
import flowEntry from 'rollup-plugin-flow-entry';

import { rootResolve } from './shared/utils.js';

import { setup, getProjects, getPackageName, getIncludes } from './workspaces.js';

await (setup());
const ROOT_RESOLVE = rootResolve();
const projects = await (getProjects());
const paths = [];

let exportConditions = [];

if (['development', 'test'].some(env => env === process.env.BABEL_ENV)) {
  exportConditions = ['development'];
}

let packages = [];

projects.forEach((project, cwd) => {
  paths.push(cwd);
  packages.push(getPackageName(cwd));
});

packages = await (Promise.all(packages));

export const output = ({ dir, format, suffix = '', ...options }) => {
  const extension = format === 'es' ? '.js' : '.cjs';
  return {
    dir,
    entryFileNames: `[name]${suffix}${extension}`,
    chunkFileNames: `[name]-[hash]${suffix}${extension}`,
    format,
    exports: 'auto',
    sourcemap: 'inline',
    ...options,
  };
};

const config = {
  input: path.resolve(ROOT_RESOLVE, 'src', 'index.js'),
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.BABEL_ENV || 'production'),
      },
    }),
    resolve({
      exportConditions,
    }),
    commonjs({
      include: /node_modules/,
    }),
    flowEntry(),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'bundled',
      configFile: path.resolve(ROOT_RESOLVE, './babel.config.js'),
    }),
    mjsEntry({ includeDefault: true }),
  ],
  external: [
    ...packages,
    'react',
    'react-dom',
    'styled-components',
  ],
};

export const configs = getIncludes().length === 0 && fs.statSync(config.input).isFile()
  ? [ROOT_RESOLVE, config]
  : paths.map(cwd => [
    cwd,
    {
      ...config,
      input: path.resolve(cwd, 'src', 'index.js'),
    },
  ]);

export default config;
