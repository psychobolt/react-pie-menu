import type { ComponentType } from 'react';
import { type ReactTypes, definePreview } from '@storybook/react-vite';
import type { ProjectAnnotations as _ProjectAnnotations } from 'storybook/internal/csf';
import type { Merge as _Merge } from 'type-fest';
import {
  ProxyProvider as _ProxyProvider,
  type Preview,
  type PreviewApi,
  withDefaults
} from 'commons/esm/.storybook/preview.js';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

import type { DefineMeta } from './meta';
import {
  enhanceArgTypes,
  extractArgTypes,
  withoutPropTypes
} from './utils/functions';

type ComponentAnnotations = object & {
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
  Preview<TPreview, T>,
  'meta' | 'type'
> & {
  meta: DefineMeta<Preview<TPreview, T>>;

  type<U extends object>(): ReactPreview<TPreview, _Merge<T, U>>;
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

const defineParameters = (
  parameters: NonNullable<
    _ProjectAnnotations<ReactTypes & { csf4: true }>['parameters']
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
  })
};
