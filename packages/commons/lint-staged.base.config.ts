import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*': (filenames) => `yarn format -- ${filenames.join(' ')}`
};

export default config;
