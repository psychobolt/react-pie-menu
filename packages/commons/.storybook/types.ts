import type {
  Meta as _Meta,
  Preview as _Preview,
  Renderer,
  ComponentAnnotations,
  Args
} from 'storybook/internal/csf';

export type Input<TRenderer extends Renderer, TArgs> = ComponentAnnotations<
  TRenderer & { args: TArgs },
  TRenderer['args'] & TArgs
>;

export interface MetaBase<
  TArgs extends Args,
  TRenderer extends Renderer,
  TInput extends Input<TRenderer, TArgs>
> extends _Meta<TRenderer & { args: TArgs }, TInput> {}

export interface Meta<
  TArgs extends Args,
  TRenderer extends Renderer,
  TInput extends Input<TRenderer, TArgs>
> extends MetaBase<TArgs, TRenderer, TInput> {
  type<
    T extends Pick<TRenderer, 'args'>,
    UArgs extends Omit<TArgs, keyof T['args']> & T['args'] = Omit<
      TArgs,
      keyof T['args']
    > &
      T['args'],
    UInput extends Input<TRenderer & T, UArgs> = Input<TRenderer & T, UArgs>
  >(): Meta<UArgs, TRenderer & T, Omit<TInput, 'args'> & UInput>;
}

export interface PreviewBase<TRenderer extends Renderer> extends Omit<
  _Preview<TRenderer>,
  'meta'
> {
  meta<TArgs extends Args, TInput extends Input<TRenderer, TArgs>>(
    input: TInput &
      Pick<ComponentAnnotations<TRenderer, TArgs>, 'render' | 'component'>
  ): MetaBase<TArgs, TRenderer, TInput>;
}

export interface Preview<
  TRenderer extends Renderer
> extends PreviewBase<TRenderer> {
  meta<TArgs extends Args, TInput extends Input<TRenderer, TArgs>>(
    input: TInput &
      Pick<ComponentAnnotations<TRenderer, TArgs>, 'render' | 'component'>
  ): Meta<TArgs, TRenderer, TInput>;
}
