import type { ComponentType } from 'react';
import { type ReactTypes, definePreview } from '@storybook/react-vite';
import type { ProjectAnnotations as _ProjectAnnotations } from 'storybook/internal/csf';
import type { Merge as _Merge } from 'type-fest';
import {
  ProxyProvider as _ProxyProvider,
  type Preview as _Preview,
  type PreviewApi,
  withDefaults
} from 'commons/esm/.storybook/preview.js';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

import type { DefineMeta } from './meta.d.ts';
import {
  enhanceArgTypes,
  extractArgTypes,
  withoutPropTypes
} from './utils/functions.js';

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
  _Preview<TPreview, T>,
  'meta' | 'type'
> & {
  meta: DefineMeta<_Preview<TPreview, T>>;

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

type Parameters = NonNullable<
  _ProjectAnnotations<ReactTypes & { csf4: true }>['parameters']
>;

const defineParameters = (parameters: Parameters) => parameters;

const parameters: Parameters = defineParameters({
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
});

export type Preview = {
  parameters: Parameters;
  meta: ReactPreview<PreviewApi>['meta'];
  type: ReactPreview<PreviewApi>['type'];
};

const preview: Preview = {
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

export default preview;
