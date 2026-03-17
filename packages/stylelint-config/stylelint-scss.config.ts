import type { Config } from 'stylelint';

import orderRules from './rules/order.js';

const config: Config = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-hudochenkov/order'
  ],
  rules: {
    ...orderRules,
    // See https://github.com/stylelint-scss/stylelint-config-recommended-scss/pull/373
    'no-invalid-position-declaration': [
      true,
      {
        ignoreAtRules: ['mixin']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  allowEmptyInput: true,
  formatter: process.env.CI ? 'compact' : 'string'
};

export default config;
