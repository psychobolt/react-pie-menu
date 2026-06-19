import type {
  Args,
  ArgsStoryFn as _ArgsStoryFn,
  ComponentAnnotations as _ComponentAnnotations,
  DecoratorFunction,
  Renderer as _Renderer,
  StoryAnnotations as _StoryAnnotations
} from 'storybook/internal/csf';
import type { Except } from 'type-fest';

export type Use<T> = T extends unknown ? unknown : never;

export type ConfigFn = (...args: any[]) => object;

export type IfNever<T, TThen, TElse> = [T] extends [never] ? TThen : TElse;

export type InferArgs<
  TConfig,
  TDefault = never,
  TConstraint = Args
> = TConfig extends {
  args: infer TArgs;
}
  ? TArgs extends TConstraint
    ? TArgs
    : TDefault
  : TConfig extends (args: infer TArgs, ...rest: any[]) => any
    ? TArgs extends TConstraint
      ? TArgs
      : TDefault
    : TDefault;

declare const intrinsicKey: unique symbol;

type IntrinsicType = {
  readonly [intrinsicKey]: never;
};

export type SetProperty<
  TInput extends object,
  TKey extends PropertyKey,
  TMode extends 'optional' | 'required' = 'optional',
  T = IntrinsicType
> = Omit<TInput, TKey> &
  (TMode extends 'required'
    ? {
        [Key in TKey]: T extends IntrinsicType
          ? Key extends keyof TInput
            ? TInput[Key]
            : never
          : T;
      }
    : {
        [Key in TKey]?: T extends IntrinsicType
          ? Key extends keyof TInput
            ? TInput[Key]
            : never
          : T;
      });

export type Merge<TInput, TOverride> = Omit<TInput, 'args'> &
  Omit<TOverride, 'args'> &
  (TInput extends { args?: Partial<Args> }
    ? { args?: InferArgs<TInput> & InferArgs<TOverride> }
    : TOverride extends { args?: Partial<Args> }
      ? { args?: InferArgs<TInput> & InferArgs<TOverride> }
      : {});

export type ArgsStoryFn<TArgs extends Args = Args> = (
  args: TArgs,
  ...rest: any[]
) => any;

export type Input<TInput extends object, TOverride extends object> = Omit<
  TInput,
  'args' | 'argTypes' | 'component' | 'decorators' | 'render'
> &
  Omit<TOverride, 'args' | 'argTypes' | 'component' | 'decorators' | 'render'>;

export type ComponentAnnotations<
  TRenderer extends _Renderer,
  TArgs extends Args,
  TDecorator extends DecoratorFunction<TRenderer, TArgs>,
  StoryFn extends ArgsStoryFn<TArgs> = ArgsStoryFn<TArgs>,
  TArgsInput = Partial<NoInfer<TArgs>>,
  TArgTypes extends Args = TArgs,
  TComponent = _ComponentAnnotations<TRenderer, TArgs>['component']
> = {
  component?: TComponent;
  render?: StoryFn;
  args?: TArgsInput;
  argTypes?: _ComponentAnnotations<TRenderer, TArgTypes>['argTypes'];
  decorators?: TDecorator | TDecorator[];
} & Except<
  _ComponentAnnotations<TRenderer, TArgs>,
  'args' | 'argTypes' | 'component' | 'decorators' | 'render'
>;

export type StoryAnnotations<
  TRenderer extends _Renderer,
  TArgs extends Args
> = SetProperty<
  {
    render?: _ArgsStoryFn<TRenderer, TArgs>;
  } & Except<_StoryAnnotations<TRenderer, TArgs>, 'args' | 'render'>,
  'args',
  'optional',
  Partial<TArgs>
>;
