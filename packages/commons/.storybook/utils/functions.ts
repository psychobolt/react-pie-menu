import mergeWith from 'lodash/mergeWith.js';
import type { ArgTypes } from 'storybook/internal/types';
import { $enum } from 'ts-enum-util';
import type { MergeDeep } from 'type-fest';

import {
  type EnumLike,
  type PseudoStateOptions,
  type StoryPseudoStateArgs,
  DefaultPseudoClsEnum,
  DefaultStateAttrEnum
} from './story-generators.js';

type StateAttributes = Record<string, string | boolean>;
export type ArgStateAttrMapper = (
  attributes: StateAttributes
) => StateAttributes;

export interface PseudoStateArgTypeOptions<
  P extends EnumLike<P>,
  A extends EnumLike<A>
> extends PseudoStateOptions<P, A> {
  argStateAttrMapper?: ArgStateAttrMapper;
}

export const getPseudoStateArgTypes = <
  P extends EnumLike<P> = typeof DefaultPseudoClsEnum,
  A extends EnumLike<A> = typeof DefaultStateAttrEnum
>({
  pseudoClasses,
  stateAttributes,
  argStateAttrMapper = (attributes) => attributes
}: PseudoStateArgTypeOptions<P, A> = {}): ArgTypes<StoryPseudoStateArgs> => {
  const pseudoClsOptions = $enum(
    pseudoClasses || DefaultPseudoClsEnum
  ).getKeys();
  const stateAttrOptions = $enum(
    stateAttributes || DefaultStateAttrEnum
  ).getKeys();
  const defaultStateAttributes = argStateAttrMapper(
    Object.fromEntries(stateAttrOptions.map((attr) => [attr, false]))
  );
  return {
    storyPseudo: {
      control: 'select',
      options: ['none', ...pseudoClsOptions],
      mapping: {
        none: undefined,
        ...DefaultPseudoClsEnum
      },
      description: 'Render story with a pseudo class e.g. `:hover`'
    },
    storyAttr: {
      control: 'select',
      options: ['none', ...stateAttrOptions],
      mapping: {
        none: defaultStateAttributes,
        ...Object.fromEntries(
          $enum(stateAttributes || DefaultStateAttrEnum)
            .getEntries()
            .map(([key, value]) => {
              let newValue;
              if (
                typeof value === 'string' &&
                value.startsWith('{') &&
                value.endsWith('}')
              ) {
                try {
                  newValue = JSON.parse(value);
                } catch (e) {}
              } else if (typeof value === 'number') {
                newValue = { [key]: true };
              }
              return [
                key,
                {
                  ...defaultStateAttributes,
                  ...argStateAttrMapper(newValue ?? { [key]: value })
                }
              ];
            })
        )
      },
      description: 'Render story with a attribute e.g. `&[disabled]`'
    }
  };
};

type MergeConfig<D, O> = MergeDeep<
  D,
  O,
  {
    arrayMergeMode: 'spread';
  }
>;

export function mergeConfig<D extends object, const O extends object>(
  defaults: D,
  overrides: O
): MergeConfig<D, O>;

export function mergeConfig<D extends object, const O extends object>(
  defaults: D,
  overrides: O,
  opts: {
    typings: 'intersection';
  }
): D & O;

export function mergeConfig<D extends object, const O extends object>(
  defaults: D,
  overrides: O,
  _opts?: {
    typings: 'intersection';
  }
) {
  return mergeWith({}, defaults, overrides, (a, b) =>
    Array.isArray(a) && Array.isArray(b) ? [...a, ...b] : undefined
  );
}
