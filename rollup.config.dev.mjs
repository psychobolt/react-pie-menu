import path from 'path';

import { configs, output } from './rollup.config.common.mjs';

const suffix = '.dev';

export default configs.map(([pathname, config]) => {
  const dir = path.resolve(pathname, 'dist');
  const options = {
    dir,
    suffix,
  };
  return {
    ...config,
    output: [
      output({ ...options, format: 'cjs' }),
      output({ ...options, format: 'es' }),
    ],
  };
});
