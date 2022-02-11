import config from 'shared/jest.config';

import pkg from './package.json';

export default {
  ...config,
  displayName: pkg.name,
};
