import { createRequire } from 'node:module';
import _ from 'lodash';
import type { Config as _Config } from 'prettier';

const require = createRequire(import.meta.url);
const standardConfig = require('prettier-config-standard');

export type Config = _Config;

const config: Config = _.merge<Config, Config, Config>({}, standardConfig, {
  plugins: [
    require.resolve('prettier-plugin-sh'),
    require.resolve('prettier-plugin-packagejson')
  ],
  semi: true,
  overrides: [
    {
      files: ['.*', '*.sh'],
      excludeFiles: ['.*.yml'],
      options: {
        parser: 'sh'
      }
    }
  ]
});

export default config;
