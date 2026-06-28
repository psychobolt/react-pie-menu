import { definePreview } from '@storybook/react-vite';
import {
  type Parameters,
  withDefaults
} from '@psychobolt/circle-ui-react/esm/.storybook/preview.js';
import { mergeConfig } from '@psychobolt/circle-ui-react/esm/.storybook/utils/functions.js';

const parameters = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
} satisfies Parameters;

export default {
  parameters,
  ...withDefaults((defaults) =>
    definePreview(
      mergeConfig(defaults, {
        parameters
      })
    )
  )
};
