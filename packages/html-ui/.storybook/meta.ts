import type {
  Args as _Args,
  Renderer as _Renderer,
  Story
} from 'storybook/internal/csf';
import type { WebComponentsRenderer } from '@storybook/web-components-vite';
import type { Merge as _Merge } from 'type-fest';
import type { PreviewApi, Renderer } from 'commons/esm/.storybook/preview.js';
import type {
  ArgsStoryFn,
  ComponentAnnotations,
  IfNever,
  InferArgs,
  IntrinsicShape,
  Merge,
  SetProperty,
  StoryAnnotations
} from 'commons/esm/.storybook/types.d.ts';

type Args<TPreview extends PreviewApi> = InferArgs<
  Renderer<TPreview>,
  {},
  object
>;

type MetaInput<TArgs extends object, TInput extends object> = Omit<
  TInput,
  'args' | 'argTypes' | 'component' | 'decorators' | 'render'
> &
  IntrinsicShape<TArgs>;

type WebComponentsMeta<
  TPreview extends PreviewApi,
  TArgs extends object,
  TRenderer extends _Renderer = Renderer<TPreview, TArgs & _Args>,
  TInput extends object = MetaInput<TArgs, object>
> = {
  input: TInput;

  story(
    input?: StoryAnnotations<
      WebComponentsRenderer & { args: TArgs & _Args },
      TArgs
    >
  ): Story<
    any,
    SetProperty<
      StoryAnnotations<any, any>,
      'args',
      'optional',
      Partial<TArgs & _Args>
    >
  >;

  type<T extends object>(): WebComponentsMeta<
    TPreview,
    InferArgs<T, TArgs, object>,
    _Merge<TRenderer, T & { args: InferArgs<T, TArgs, object> & _Args }>,
    MetaInput<InferArgs<T, TArgs, object>, TInput>
  >;

  extend<
    StoryFn extends ArgsStoryFn,
    UArgs extends object = InferArgs<StoryFn, TArgs, object>,
    UArgTypes extends object = UArgs,
    UInput extends SetProperty<
      ComponentAnnotations<
        WebComponentsRenderer & { args: UArgs & _Args },
        UArgs,
        StoryFn,
        Partial<NoInfer<UArgs>>,
        UArgTypes & _Args
      >,
      'render',
      'required'
    > = SetProperty<
      ComponentAnnotations<
        WebComponentsRenderer & { args: UArgs & _Args },
        UArgs,
        StoryFn,
        Partial<NoInfer<UArgs>>,
        UArgTypes & _Args
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
  ): Merge<TInput, TOverride> & IntrinsicShape<UArgs>;

  extend<
    UArgs extends object = TArgs,
    UArgTypes extends object = UArgs,
    UInput extends ComponentAnnotations<
      WebComponentsRenderer & { args: UArgs & _Args },
      UArgs,
      ArgsStoryFn<UArgs & _Args>,
      Partial<NoInfer<UArgs>>,
      UArgTypes & _Args
    > = ComponentAnnotations<
      WebComponentsRenderer & { args: UArgs & _Args },
      UArgs,
      ArgsStoryFn<UArgs & _Args>,
      Partial<NoInfer<UArgs>>,
      UArgTypes & _Args
    >,
    const TOverride extends object = {}
  >(
    overrides?: Omit<
      TOverride,
      'args' | 'argTypes' | 'component' | 'decorators' | 'render'
    > &
      UInput
  ): Merge<TInput, TOverride> & IntrinsicShape<UArgs>;
};

export type DefineMeta<TPreview extends PreviewApi> = IfNever<
  InferArgs<Renderer<TPreview>>,
  {
    <
      TArgs extends object,
      TArgTypes extends object = TArgs,
      const TInput extends object = {}
    >(
      input: IntrinsicShape<TArgs> &
        Omit<
          TInput,
          'args' | 'argTypes' | 'component' | 'decorators' | 'render'
        > &
        ComponentAnnotations<
          WebComponentsRenderer & { args: NoInfer<TArgs> & _Args },
          NoInfer<TArgs>,
          ArgsStoryFn<NoInfer<TArgs> & _Args>,
          Partial<NoInfer<TArgs>>,
          TArgTypes & _Args
        >
    ): WebComponentsMeta<
      TPreview,
      TArgs,
      Renderer<TPreview, TArgs & _Args>,
      MetaInput<TArgs, TInput>
    >;

    <
      const TInput extends object = {},
      StoryFn extends ArgsStoryFn = ArgsStoryFn,
      TArgs extends object = TInput extends IntrinsicShape<
        infer TIntrinsicArgs extends object
      >
        ? TIntrinsicArgs
        : InferArgs<StoryFn, {}, object>,
      TArgTypes extends object = TArgs
    >(
      input: Omit<
        TInput,
        'args' | 'argTypes' | 'component' | 'decorators' | 'render'
      > &
        SetProperty<
          ComponentAnnotations<
            WebComponentsRenderer & { args: TArgs & _Args },
            TArgs,
            StoryFn,
            Partial<NoInfer<TArgs>>,
            TArgTypes & _Args
          >,
          'render',
          'required'
        >
    ): WebComponentsMeta<
      TPreview,
      TArgs,
      Renderer<TPreview, TArgs & _Args>,
      MetaInput<TArgs, TInput>
    >;

    <
      const TInput extends object = {},
      TArgs extends object = TInput extends IntrinsicShape<
        infer TIntrinsicArgs extends object
      >
        ? TIntrinsicArgs
        : {},
      TArgTypes extends object = TArgs
    >(
      input: Omit<
        TInput,
        'args' | 'argTypes' | 'component' | 'decorators' | 'render'
      > &
        ComponentAnnotations<
          WebComponentsRenderer & { args: TArgs & _Args },
          TArgs,
          ArgsStoryFn<TArgs & _Args>,
          Partial<NoInfer<TArgs>>,
          TArgTypes & _Args
        >
    ): WebComponentsMeta<
      TPreview,
      TArgs,
      Renderer<TPreview, TArgs & _Args>,
      MetaInput<TArgs, TInput>
    >;
  },
  <const TInput extends object = {}, TArgTypes extends object = Args<TPreview>>(
    input: Omit<
      TInput,
      'args' | 'argTypes' | 'component' | 'decorators' | 'render'
    > &
      ComponentAnnotations<
        WebComponentsRenderer & { args: NoInfer<Args<TPreview>> & _Args },
        NoInfer<Args<TPreview>>,
        ArgsStoryFn<NoInfer<Args<TPreview>> & _Args>,
        Partial<NoInfer<Args<TPreview>>>,
        TArgTypes & _Args
      >
  ) => WebComponentsMeta<
    TPreview,
    Args<TPreview>,
    Renderer<TPreview, Args<TPreview> & _Args>,
    MetaInput<Args<TPreview>, TInput>
  >
>;
