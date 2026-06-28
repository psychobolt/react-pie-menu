import type { ComponentType } from 'react';
import {
  type ReactTypes,
  definePreview as _definePreview
} from '@storybook/react-vite';
import type { ProjectAnnotations as _ProjectAnnotations } from 'storybook/internal/csf';
import {
  ProxyProvider as _ProxyProvider,
  withDefaults as _withDefaults
} from 'commons/esm/.storybook/preview.js';
import type {
  Preview as _Preview,
  PreviewApi
} from 'commons/esm/.storybook/preview.d.ts';

import type { DefineMeta } from './meta.d.ts';
import {
  enhanceArgTypes,
  extractArgTypes,
  mergeConfig,
  withoutPropTypes
} from './utils/functions.js';

type ComponentAnnotations = {
  component?: ComponentType<any>;
};

type ProjectAnnotations<TDefaults extends object> = Partial<TDefaults> & {
  parameters?: {
    docs?: {
      extractArgTypes?: typeof extractArgTypes;
    };
  };
};

type ReactPreview<TPreview extends PreviewApi, T extends object = {}> = Omit<
  _Preview<TPreview, T>,
  'meta' | 'type'
> & {
  meta: DefineMeta<_Preview<TPreview, T>>;

  type<U extends object>(): ReactPreview<TPreview, T & U>;
};

class ProxyProvider<TPreview extends PreviewApi> extends _ProxyProvider<
  TPreview,
  ReactPreview<TPreview>,
  ComponentAnnotations
> {
  protected override meta<TInput extends ComponentAnnotations>(input: TInput) {
    return super.meta(
      input.component
        ? {
            ...input,
            component: withoutPropTypes(input.component)
          }
        : input
    );
  }
}

export type Parameters = NonNullable<
  _ProjectAnnotations<ReactTypes & { csf4: true }>['parameters']
>;

const parameters = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
} satisfies Parameters;

export type Preview = {
  parameters: Parameters;
} & ReactPreview<PreviewApi>;

export const withDefaults = (
  definePreview: typeof _definePreview
): ReactPreview<PreviewApi> =>
  _withDefaults((defaults) => {
    const preview = definePreview(
      mergeConfig(defaults, {
        argTypesEnhancers: [
          ...(defaults.argTypesEnhancers ?? []),
          enhanceArgTypes
        ],
        parameters: {
          ...parameters,
          docs: {
            ...(defaults.parameters?.docs ?? {}),
            extractArgTypes
          }
        }
      } satisfies ProjectAnnotations<typeof defaults>)
    );

    return new ProxyProvider(preview).instance;
  });

const preview: Preview = {
  parameters,
  ...withDefaults(_definePreview)
};

export default preview;
