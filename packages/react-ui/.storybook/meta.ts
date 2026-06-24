import type { ComponentType } from 'react';
import type {
  ReactStory as _ReactStory,
  ReactTypes
} from '@storybook/react-vite';
import type {
  Args as _Args,
  ArgsStoryFn as _ArgsStoryFn
} from 'storybook/internal/csf';
import type { PreviewApi, Renderer } from 'commons/esm/.storybook/preview.js';
import type {
  ComponentAnnotations as _ComponentAnnotations,
  IfNever,
  InferArgs,
  IntrinsicShape,
  Merge,
  SetProperty,
  StoryAnnotations
} from 'commons/esm/.storybook/types.d.ts';

type ComponentAnnotations<
  TRenderer extends ReactTypes,
  TComponentArgs extends object,
  TArgs extends object,
  TArgTypes extends object,
  TInput extends object
> = Omit<TInput, 'args' | 'argTypes' | 'component' | 'decorators' | 'render'> &
  _ComponentAnnotations<
    TRenderer,
    NoInfer<TArgs>,
    _ArgsStoryFn<TRenderer, NoInfer<TArgs> & _Args>,
    Partial<NoInfer<TArgs>>,
    TArgTypes & _Args,
    ComponentType<TComponentArgs>
  >;

type MetaInput<TArgs extends object, TInput extends object> = Omit<
  TInput,
  'args'
> &
  Omit<
    _ComponentAnnotations<
      any,
      NoInfer<TArgs>,
      _ArgsStoryFn<any, NoInfer<TArgs> & _Args>
    >,
    'args' | 'render'
  > & {
    render?: _ArgsStoryFn<any, TArgs & _Args>;
    args?: Partial<TArgs>;
  };

type ReactMeta<TArgs extends object, TInput extends object> = {
  input: TInput & IntrinsicShape<TArgs>;

  extend<
    TComponentArgs extends object = TArgs,
    TArgTypes extends object = TArgs,
    const TOverride extends object = {}
  >(
    overrides?: ComponentAnnotations<
      ReactTypes & { args: TArgs & _Args },
      TComponentArgs,
      TArgs,
      TArgTypes,
      TOverride
    >
  ): Merge<TInput, TOverride> & IntrinsicShape<TArgs>;

  story(
    input?: StoryAnnotations<ReactTypes & { args: TArgs & _Args }, TArgs>
  ): _ReactStory<
    any,
    SetProperty<
      StoryAnnotations<any, any>,
      'args',
      'optional',
      Partial<TArgs & _Args>
    >
  >;

  type<T extends object>(): ReactMeta<
    InferArgs<T, TArgs, object>,
    MetaInput<InferArgs<T, TArgs, object>, TInput>
  >;
};

export type DefineMeta<TPreview extends PreviewApi> = {
  <
    TArgs extends object = InferArgs<Renderer<TPreview>, {}, object>,
    TComponentArgs extends object = TArgs,
    TRenderer extends ReactTypes & { args: TArgs & _Args } = ReactTypes & {
      args: TArgs & _Args;
    },
    TArgTypes extends object = TArgs,
    const TInput extends object = {}
  >(
    input: IfNever<
      InferArgs<Renderer<TPreview>>,
      never,
      IntrinsicShape<any> &
        ComponentAnnotations<
          TRenderer,
          TComponentArgs,
          TArgs,
          TArgTypes,
          TInput
        >
    >
  ): ReactMeta<TArgs, MetaInput<TArgs, TInput>>;

  <
    TArgs extends object,
    TComponentArgs extends object = TArgs,
    TRenderer extends ReactTypes & { args: TArgs & _Args } = ReactTypes & {
      args: TArgs & _Args;
    },
    TArgTypes extends object = TArgs,
    const TInput extends object = {}
  >(
    input: IntrinsicShape<TArgs> &
      ComponentAnnotations<
        TRenderer,
        TComponentArgs,
        NoInfer<TArgs>,
        TArgTypes,
        TInput
      >
  ): ReactMeta<TArgs, MetaInput<TArgs, TInput>>;

  <
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
    TArgTypes extends object = TArgs,
    const TInput extends object = {}
  >(
    input: ComponentAnnotations<
      TRenderer,
      TComponentArgs,
      TArgs,
      TArgTypes,
      TInput
    >
  ): ReactMeta<TArgs, MetaInput<TArgs, TInput>>;
};
