import 'react-syntax-highlighter';

import {
  type WebComponentsTypes,
  definePreview
} from '@storybook/web-components-vite';
import { SyntaxHighlighter } from 'storybook/internal/components';
import type { ProjectAnnotations as _ProjectAnnotations } from 'storybook/internal/csf';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import {
  ProxyProvider,
  withDefaults as _withDefaults
} from 'commons/esm/.storybook/preview.js';
import type {
  Preview as _Preview,
  PreviewApi
} from 'commons/esm/.storybook/preview.d.ts';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

import type { DefineMeta } from './meta.d.ts';

type ProjectAnnotations<TDefaults extends object> = Partial<TDefaults> & {
  parameters?: {
    docs?: {
      source?: {
        transform?: (code: string) => string | Promise<string>;
      };
    };
  };
};

type WebComponentsPreview<
  TPreview extends PreviewApi,
  T extends object = {}
> = Omit<_Preview<TPreview, T>, 'meta' | 'type'> & {
  meta: DefineMeta<_Preview<TPreview, T>>;

  type<U extends object>(): WebComponentsPreview<TPreview, T & U>;
};

SyntaxHighlighter.registerLanguage('scss', scss);

export type Parameters = NonNullable<
  _ProjectAnnotations<WebComponentsTypes & { csf4: true }>['parameters']
>;

const parameters = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
} satisfies Parameters;

export type Preview = {
  parameters: Parameters;
} & WebComponentsPreview<PreviewApi>;

export const withDefaults = (
  definePreview: typeof import('@storybook/web-components-vite').definePreview
): WebComponentsPreview<PreviewApi> =>
  _withDefaults((defaults) => {
    const preview = definePreview(
      mergeConfig(defaults, {
        parameters: {
          ...parameters,
          docs: {
            source: {
              async transform(code) {
                const prettier = await import('prettier/standalone');
                const prettierPluginHtml =
                  await import('prettier/plugins/html');

                return prettier.format(code, {
                  parser: 'html',
                  plugins: [prettierPluginHtml]
                });
              }
            }
          }
        }
      } satisfies ProjectAnnotations<typeof defaults>)
    );

    return new ProxyProvider<typeof preview, Preview>(preview).instance;
  });

const preview: Preview = {
  parameters,
  ...withDefaults(definePreview)
};

export default preview;
