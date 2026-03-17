import { Story, isStory } from 'storybook/internal/csf';
import type {
  Args,
  Renderer,
  StoryAnnotations
} from 'storybook/internal/types';
import type { StringKeyOf } from 'ts-enum-util/dist/types/types.js';
import { $enum } from 'ts-enum-util';
import _ from 'lodash';

import type { VariantStory } from '../addons/addon-variants.js';

export type TemplateStoryObj<
  TArgs,
  TRenderer extends Renderer = Renderer & { args: TArgs }
> =
  | VariantStoryObj<TArgs, TRenderer>
  | Story<
      TRenderer & { args: TArgs },
      VariantStoryObj<TRenderer['args'] & TArgs, TRenderer & { args: TArgs }>
    >;

export type VariantStoryObj<
  TArgs,
  TRenderer extends Renderer = Renderer & { args: TArgs }
> = StoryAnnotations<TRenderer, TArgs> & {
  exportName?: string;
};

function generateStory<TRenderer extends Renderer, TArgs>(
  Template: TemplateStoryObj<TArgs, TRenderer>,
  input: StoryAnnotations<TRenderer & { args: TArgs }, TArgs>
) {
  return isStory<TRenderer & { args: TArgs }>(Template)
    ? { ...Template.extend(input).input, _template: Template }
    : {
        ...Template,
        ...input,
        args: { ...Template.args, ...input.args },
        _template: Template
      };
}

export type EnumLike<E> = Record<StringKeyOf<E>, string | number>;

export function generateStoriesByEnum<
  E extends EnumLike<E> = {},
  TArgs extends Args = Args,
  TRenderer extends Renderer & { args: TArgs } = Renderer & { args: TArgs }
>(
  templates: Array<TemplateStoryObj<TArgs, TRenderer>>,
  arg: string,
  enumerator: E
) {
  return templates.reduce<Array<VariantStory<TRenderer, TArgs>>>(
    (variants, story) => [
      ...variants,
      ...Array.from($enum(enumerator).getKeys()).map<
        VariantStory<TRenderer, TArgs>
      >((key) => {
        const storyName = isStory<TRenderer>(story)
          ? story.input.name
          : story.name;
        return {
          ...generateStory(story, {
            name: `${storyName ? storyName + ' - ' : ''}${_.startCase(key)}`,
            args: {
              [arg]: key
            } as TArgs
          }),
          exportName: _.snakeCase(storyName ? `${storyName}_${key}` : key)
        };
      })
    ],
    []
  );
}

export enum DefaultPseudoClsEnum {
  focus = ':focus',
  active = ':active',
  hover = ':hover'
}

export enum DefaultStateAttrEnum {
  disabled = '{"disabled": true}'
}

export interface PseudoStateOptions<
  P extends EnumLike<P>,
  A extends EnumLike<A>
> {
  pseudoClasses?: P;
  stateAttributes?: A;
}

interface PseudoStateStoryOptions<
  P extends EnumLike<P>,
  A extends EnumLike<A>,
  T
> extends PseudoStateOptions<P, A> {
  showDefault?: boolean | T;
}
export interface StoryPseudoStateArgs<
  P extends EnumLike<P> = typeof DefaultPseudoClsEnum,
  A extends EnumLike<A> = typeof DefaultStateAttrEnum
> extends Args {
  storyPseudo: 'none' | StringKeyOf<P>;
  storyAttr: 'none' | StringKeyOf<A>;
}

const pseudoStateArgs: StoryPseudoStateArgs = {
  storyPseudo: 'none',
  storyAttr: 'none'
};

export const generatePseudoStateStories = <
  P extends EnumLike<P> = typeof DefaultPseudoClsEnum,
  A extends EnumLike<A> = typeof DefaultStateAttrEnum,
  TArgs extends StoryPseudoStateArgs<P, A> = StoryPseudoStateArgs<P, A>,
  TRenderer extends Renderer & { args: TArgs } = Renderer & { args: TArgs }
>(
  Template: TemplateStoryObj<TArgs, TRenderer>,
  {
    showDefault,
    pseudoClasses,
    stateAttributes
  }: PseudoStateStoryOptions<P, A, typeof Template> = {}
) => [
  ...(showDefault !== false
    ? [
        {
          name: 'Default',
          exportName: 'Default',
          ...generateStory(
            typeof showDefault === 'object' ? showDefault : Template,
            {
              args: pseudoStateArgs as unknown as TArgs
            }
          )
        }
      ]
    : []),
  ...generateStoriesByEnum(
    [Template],
    'storyPseudo',
    pseudoClasses || DefaultPseudoClsEnum
  ),
  ...generateStoriesByEnum(
    [Template],
    'storyAttr',
    stateAttributes || DefaultStateAttrEnum
  )
];

export interface StoryPseudoStateProps {
  storyPseudo?: string;
  storyAttr?: Record<string, string | boolean>;
}
