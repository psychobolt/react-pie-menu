import { definePreview } from 'storybook/internal/csf';

import { mergeConfig } from './utils/functions.js';

const { meta, ...preview } = definePreview({});

export default {
  ...preview,
  meta: (input: object) => ({
    ...meta(input),
    extend(overrides: object) {
      return mergeConfig(input, overrides);
    },
    type() {
      return this;
    }
  })
};
