import type { Merge, Use } from './types.d.ts';
import Proxy from './utils/proxy.js';
import { mergeConfig } from './utils/functions.js';

export type Meta<TMeta extends object, TInput extends object> = TMeta &
  Use<TInput>;

export class MetaProxy<
  TMeta extends object,
  TInput extends object
> extends Proxy<TMeta, Meta<TMeta, TInput>> {
  constructor(
    meta: TMeta,
    protected readonly input: TInput
  ) {
    super(meta);
    this.register('extend', this.extend);
    this.register('type', this.type);
  }

  protected extend<TOverride extends object>(overrides?: TOverride) {
    return (
      overrides ? mergeConfig(this.input, overrides) : this.input
    ) as Merge<TInput, TOverride>;
  }

  protected type<T extends object>() {
    return this.value as Meta<TMeta, TInput> & Use<T>;
  }
}
