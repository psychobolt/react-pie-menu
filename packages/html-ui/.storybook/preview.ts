import 'react-syntax-highlighter';

import {
  type WebComponentsTypes,
  definePreview
} from '@storybook/web-components-vite';
import { SyntaxHighlighter } from 'storybook/internal/components';
import type { ProjectAnnotations } from 'storybook/internal/csf';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import type { Merge as _Merge } from 'type-fest';
import {
  ProxyProvider,
  type Preview,
  type PreviewApi,
  withDefaults
} from 'commons/esm/.storybook/preview.js';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

import type { DefineMeta } from './meta';

type WebComponentsPreview<
  TPreview extends PreviewApi,
  T extends object = {}
> = Omit<Preview<TPreview, T>, 'meta' | 'type'> & {
  meta: DefineMeta<Preview<TPreview, T>>;
  type<U extends object>(): WebComponentsPreview<TPreview, _Merge<T, U>>;
};

SyntaxHighlighter.registerLanguage('scss', scss);

const defineParameters = (
  parameters: NonNullable<
    ProjectAnnotations<WebComponentsTypes & { csf4: true }>['parameters']
  >
) => parameters;

const parameters = defineParameters({
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
});

export default {
  parameters,
  ...withDefaults((defaults) => {
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
      } satisfies Partial<typeof defaults>)
    );
    return new ProxyProvider<
      typeof preview,
      WebComponentsPreview<typeof preview>
    >(preview).instance;
  })
};
