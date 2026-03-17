import 'react-syntax-highlighter';

import {
  type WebComponentsTypes,
  definePreview
} from '@storybook/web-components-vite';
import { SyntaxHighlighter } from 'storybook/internal/components';
import type { ProjectAnnotations } from 'storybook/internal/csf';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import { withDefaults } from 'commons/esm/.storybook/preview.js';

SyntaxHighlighter.registerLanguage('scss', scss);

// See issue: https://github.com/storybookjs/storybook/issues/33798
type Parameters = ProjectAnnotations<
  WebComponentsTypes & { csf4: true }
>['parameters'];
const parameters: unknown = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
} as Parameters;

export default {
  parameters,
  ...withDefaults<WebComponentsTypes>((defaults) =>
    definePreview({
      ...defaults,
      parameters: {
        ...defaults.parameters,
        ...(parameters as Parameters),
        docs: {
          ...defaults.parameters.docs,
          source: {
            ...defaults.parameters.docs.source,
            async transform(code) {
              const prettier = await import('prettier/standalone');
              const prettierPluginHtml = await import('prettier/plugins/html');
              return prettier.format(code, {
                parser: 'html',
                plugins: [prettierPluginHtml]
              });
            }
          }
        }
      }
    })
  )
};
