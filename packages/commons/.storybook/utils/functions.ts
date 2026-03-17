import type { ArgTypes } from 'storybook/internal/types';
import { $enum } from 'ts-enum-util';

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
