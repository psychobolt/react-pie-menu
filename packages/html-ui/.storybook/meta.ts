import type {
  Args as _Args,
  ComponentAnnotations as _ComponentAnnotations,
  DecoratorFunction,
  Renderer as _Renderer
} from 'storybook/internal/csf';
import type { WebComponentsMeta as _WebComponentsMeta } from '@storybook/web-components-vite';
import type { Merge as _Merge } from 'type-fest';
import type { PreviewApi, Renderer } from 'commons/esm/.storybook/preview.js';
import type {
  ArgsStoryFn,
  ComponentAnnotations,
  IfNever,
  InferArgs,
  Merge,
  SetProperty,
  StoryAnnotations
} from 'commons/esm/.storybook/types.d.ts';

type DecoratorFn<
  TPreview extends PreviewApi,
  TArgs extends object
> = DecoratorFunction<Renderer<TPreview, TArgs & _Args>, TArgs & _Args>;

type WebComponentsAnnotations<
  TPreview extends PreviewApi,
  TArgs extends object,
  TDecorator extends DecoratorFn<TPreview, TArgs> = DecoratorFn<
    TPreview,
    TArgs
  >,
  StoryFn extends ArgsStoryFn<TArgs & _Args> = ArgsStoryFn<TArgs & _Args>
> = ComponentAnnotations<
  Renderer<TPreview, TArgs & _Args>,
  TArgs & _Args,
  TDecorator,
  StoryFn,
  Partial<NoInfer<TArgs>>,
  TArgs & _Args
>;

type WebComponentsMeta<
  TPreview extends PreviewApi,
  TArgs extends object,
  TRenderer extends _Renderer = Renderer<TPreview, TArgs & _Args>,
  TInput extends object = _ComponentAnnotations<TRenderer, TArgs & _Args>
> = Omit<
  _WebComponentsMeta<TRenderer, _ComponentAnnotations<TRenderer, _Args>>,
  'extend' | 'input' | 'story' | 'type'
> & {
  input: TInput;

  story(input?: StoryAnnotations<TRenderer, TArgs & _Args>): _WebComponentsMeta<
    TRenderer,
    _ComponentAnnotations<TRenderer, _Args>
  > extends {
    story(): infer TReturn;
  }
    ? TReturn
    : never;

  type<T extends object>(): WebComponentsMeta<
    TPreview,
    InferArgs<T, TArgs, object>,
    _Merge<TRenderer, T & { args: InferArgs<T, TArgs, object> & _Args }>,
    _ComponentAnnotations<
      _Merge<TRenderer, T & { args: InferArgs<T, TArgs, object> & _Args }>,
      InferArgs<T, TArgs, object> & _Args
    >
  >;

  extend<
    StoryFn extends ArgsStoryFn,
    UArgs extends object = InferArgs<StoryFn, {}, object>,
    UInput extends SetProperty<
      WebComponentsAnnotations<
        TPreview,
        UArgs,
        DecoratorFn<TPreview, UArgs>,
        StoryFn
      >,
      'render',
      'required'
    > = SetProperty<
      WebComponentsAnnotations<
        TPreview,
        UArgs,
        DecoratorFn<TPreview, UArgs>,
        StoryFn
      >,
      'render',
      'required'
    >,
    const TOverride extends object = {}
  >(
    overrides: Omit<
      TOverride,
      'args' | 'argTypes' | 'component' | 'decorators' | 'render'
    > &
      UInput
  ): Merge<TInput, TOverride>;

  extend<
    UArgs extends object = TArgs,
    UInput extends WebComponentsAnnotations<TPreview, UArgs> =
      WebComponentsAnnotations<TPreview, UArgs>,
    const TOverride extends object = {}
  >(
    overrides?: Omit<
      TOverride,
      'args' | 'argTypes' | 'component' | 'decorators' | 'render'
    > &
      UInput
  ): Merge<TInput, TOverride>;
};

export type DefineMeta<TPreview extends PreviewApi> = IfNever<
  InferArgs<Renderer<TPreview>>,
  {
    <
      StoryFn extends ArgsStoryFn,
      TArgs extends object = InferArgs<StoryFn, {}, object>,
      TDecorator extends DecoratorFn<TPreview, TArgs> = DecoratorFn<
        TPreview,
        TArgs
      >,
      const TInput extends object = {}
    >(
      input: Omit<
        TInput,
        'args' | 'argTypes' | 'component' | 'decorators' | 'render'
      > &
        SetProperty<
          WebComponentsAnnotations<TPreview, TArgs, TDecorator, StoryFn>,
          'render',
          'required'
        >
    ): WebComponentsMeta<
      TPreview,
      TArgs,
      Renderer<TPreview, TArgs & _Args>,
      TInput
    >;

    <
      TArgs extends object = {},
      TDecorator extends DecoratorFn<TPreview, TArgs> = DecoratorFn<
        TPreview,
        TArgs
      >,
      const TInput extends object = {}
    >(
      input: Omit<
        TInput,
        'args' | 'argTypes' | 'component' | 'decorators' | 'render'
      > &
        WebComponentsAnnotations<TPreview, TArgs, TDecorator>
    ): WebComponentsMeta<
      TPreview,
      TArgs,
      Renderer<TPreview, TArgs & _Args>,
      TInput
    >;
  },
  <
    TArgs extends object = InferArgs<Renderer<TPreview>, {}, object>,
    TDecorator extends DecoratorFn<TPreview, TArgs> = DecoratorFn<
      TPreview,
      TArgs
    >,
    const TInput extends object = {}
  >(
    input: Omit<
      TInput,
      'args' | 'argTypes' | 'component' | 'decorators' | 'render'
    > &
      WebComponentsAnnotations<TPreview, NoInfer<TArgs>, TDecorator>
  ) => WebComponentsMeta<
    TPreview,
    TArgs,
    Renderer<TPreview, TArgs & _Args>,
    TInput
  >
>;
