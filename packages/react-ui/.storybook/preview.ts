import { type ReactTypes, definePreview } from '@storybook/react-vite';
import type { ProjectAnnotations } from 'storybook/internal/csf';
import { withDefaults } from 'commons/esm/.storybook/preview.js';

// See issue: https://github.com/storybookjs/storybook/issues/33798
type Parameters = ProjectAnnotations<ReactTypes & { csf4: true }>['parameters'];
const parameters: unknown = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
} as Parameters;

export default {
  parameters,
  ...withDefaults<ReactTypes>(
    (defaults) =>
      definePreview({
        ...defaults,
        parameters: {
          ...defaults.parameters,
          ...(parameters as Parameters)
        }
      }) as any
  )
};
