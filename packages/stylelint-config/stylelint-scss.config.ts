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
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(--?[a-z0-9]+)*$',
      {
        message: (selector: string) =>
          `Expected class selector "${selector}" to be kebab-case`
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
