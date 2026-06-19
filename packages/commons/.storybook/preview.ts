import {
  type Args,
  type Renderer as _Renderer,
  type InferTypes,
  type ProjectAnnotations as _ProjectAnnotations,
  definePreview as _definePreview
} from 'storybook/internal/csf';
import addonDocs from '@storybook/addon-docs';
import type { Except, Merge as _Merge } from 'type-fest';

import { MetaProxy, type Meta } from './meta.js';
import Proxy from './utils/proxy.js';
import type {
  ConfigFn,
  InferArgs as _InferArgs,
  Use,
  SetProperty
} from './types.d.ts';

const addons = [addonDocs()];

type Addons = typeof addons;

type ProjectAnnotations = _ProjectAnnotations<
  InferTypes<Addons> & _Renderer
> & {
  addons: Addons;
};

const input = {
  addons,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      codePanel: true,
      source: {
        excludeDecorators: true
      }
    }
  }
} satisfies ProjectAnnotations;

declare const genericKey: unique symbol;

type Subtype<T extends object> = {
  readonly [genericKey]?: T;
};

type Type<TPreview> = TPreview extends {
  input: _ProjectAnnotations<infer TRenderer>;
}
  ? TPreview extends Subtype<infer T>
    ? _Merge<TRenderer, T>
    : TRenderer
  : never;

export type PreviewApi = {
  meta: ConfigFn;
  type<T>(): Use<T>;
};

export class ProxyProvider<
  TPreview extends PreviewApi,
  TOutput extends object = Preview<TPreview>,
  TMetaInput extends object = object
> extends Proxy<TPreview, TOutput> {
  get instance() {
    return this.value;
  }

  constructor(protected readonly preview: TPreview) {
    super(preview);
    this.register('meta', this.meta);
    this.register('type', this.type);
  }

  protected type<T extends object>() {
    return this.instance as unknown as Preview<TPreview, T> & Use<T>;
  }

  protected meta<TInput extends TMetaInput>(input: TInput) {
    return new MetaProxy(this.preview.meta(input), input).value as ReturnType<
      Preview<TPreview>['meta']
    >;
  }
}

export type InferArgs<TPreview> = _InferArgs<Type<TPreview>>;

export type Renderer<
  TPreview,
  TArgs extends Args = _InferArgs<Type<TPreview>>
> =
  Type<TPreview> extends _Renderer
    ? SetProperty<Type<TPreview>, 'args', 'required', TArgs>
    : _Renderer;

export type Preview<
  TPreview extends PreviewApi,
  T extends object = {}
> = Except<TPreview, 'meta' | 'type'> &
  Subtype<T> & {
    meta: <TInput extends object>(
      input: TInput
    ) => ReturnType<TPreview['meta']> extends infer TMeta extends object
      ? Meta<TMeta, TInput>
      : never;

    type<U extends object>(): Preview<TPreview, _Merge<T, U>>;
  };

export const withDefaults = <TPreview extends object>(
  definePreview: (defaults: ProjectAnnotations) => TPreview
) => definePreview(input);

export default withDefaults(
  (defaults) => new ProxyProvider(_definePreview(defaults)).instance
);
