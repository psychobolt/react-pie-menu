import type { ComponentType } from 'react';
import type {
  ReactMeta as _ReactMeta,
  ReactStory as _ReactStory,
  ReactTypes
} from '@storybook/react-vite';
import type {
  Args as _Args,
  ArgsStoryFn as _ArgsStoryFn,
  DecoratorFunction
} from 'storybook/internal/csf';
import type { PreviewApi, Renderer } from 'commons/esm/.storybook/preview.js';
import type {
  ComponentAnnotations as _ComponentAnnotations,
  IfNever,
  InferArgs,
  Merge,
  StoryAnnotations
} from 'commons/esm/.storybook/types.d.ts';

type ComponentAnnotations<
  TRenderer extends ReactTypes,
  TComponentArgs extends object,
  TArgs extends object,
  TDecorators extends DecoratorFunction<TRenderer, any>,
  TArgTypes extends object,
  TInput extends object
> = Omit<TInput, 'args' | 'argTypes' | 'component' | 'decorators' | 'render'> &
  _ComponentAnnotations<
    TRenderer,
    NoInfer<TArgs> & _Args,
    TDecorators,
    _ArgsStoryFn<TRenderer, NoInfer<TArgs> & _Args>,
    Partial<NoInfer<TArgs>>,
    TArgTypes & _Args,
    ComponentType<TComponentArgs>
  >;

type ReactMeta<
  TArgs extends object,
  TRenderer extends ReactTypes & { args: TArgs & _Args },
  TInput extends object
> = Omit<_ReactMeta<TRenderer, TInput>, 'extend' | 'story' | 'type'> & {
  extend<
    TComponentArgs extends object = TArgs,
    TDecorators extends DecoratorFunction<TRenderer, any> = DecoratorFunction<
      TRenderer,
      any
    >,
    TArgTypes extends object = TArgs,
    const TOverride extends object = {}
  >(
    overrides?: ComponentAnnotations<
      TRenderer,
      TComponentArgs,
      TArgs,
      TDecorators,
      TArgTypes,
      TOverride
    >
  ): Merge<TInput, TOverride>;

  story(
    input?: StoryAnnotations<TRenderer, TRenderer['args']>
  ): _ReactStory<TRenderer, StoryAnnotations<TRenderer, TRenderer['args']>>;

  type<T extends object>(): ReactMeta<
    InferArgs<T, TArgs, object>,
    Omit<TRenderer, 'args'> & T & { args: InferArgs<T, TArgs, object> & _Args },
    TInput
  >;
};

export type DefineMeta<TPreview extends PreviewApi> = <
  TComponentArgs extends object = {},
  TArgs extends object = TComponentArgs &
    IfNever<
      InferArgs<Renderer<TPreview>>,
      {},
      InferArgs<Renderer<TPreview>, {}, object>
    >,
  TRenderer extends ReactTypes & { args: TArgs & _Args } = ReactTypes & {
    args: TArgs & _Args;
  },
  TDecorators extends DecoratorFunction<TRenderer, any> = DecoratorFunction<
    TRenderer,
    any
  >,
  TArgTypes extends object = TArgs,
  const TInput extends object = {}
>(
  input: ComponentAnnotations<
    TRenderer,
    TComponentArgs,
    TArgs,
    TDecorators,
    TArgTypes,
    TInput
  >
) => ReactMeta<
  TArgs,
  TRenderer,
  Omit<TInput, 'args'> &
    Omit<
      _ComponentAnnotations<
        TRenderer,
        NoInfer<TArgs> & _Args,
        DecoratorFunction<TRenderer, NoInfer<TArgs> & _Args>
      >,
      'args'
    > & {
      args?: Partial<TArgs>;
    }
>;
