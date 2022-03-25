import path from 'path';

import { requireCJS } from './shared/utils.js';

const config = requireCJS(import /*:: ("") */.meta.url, './babel.config.common.cjs');
const cjs = 'cjs';

export default {
  ...config,
  plugins: [
    ...config.plugins,
    [
      'module-resolver',
      {
        root: ['./'],
        cwd: './',
        alias: {
          ...(
            process.env.BABEL_ENV === 'test'
              ? {
                'styled-components': path.resolve(cjs, 'styled-components.cjs'), // See: https://github.com/styled-components/styled-components/issues/3601
                enzyme: path.resolve(cjs, 'enzyme.cjs'), // See: // See https://github.com/facebook/jest/issues/11563
              }
              : {}
          ),
        },
      },
    ],
  ],
};
