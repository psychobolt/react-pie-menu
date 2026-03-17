# Utils

## [Story Generators](story-generators.ts)

These utilities are ideally used with the [Variant addon](../addons/README.md#variants) and the open standard: [Component Story Format](https://github.com/ComponentDriven/csf).

### Stories By Enum

`generateStoriesByEnum(templates, arg, enumerator);`

The default export utility to create stories targeting a single `arg` type from the list of Story `templates` and `enumerators`.

### Pseudo State Stories

`generatePseudoStateStories(template, { showDefault?, pseudoClasses? = DefaultPseudoClsEnum, stateAttributes? = DefaultStateAttrEnum });`

The utility will take a single story template and decorate its `args` with additional pseudo-states. Unlike [generateStoriesByEnum](#stories-by-enum), it expects the predefined `args` ( `storyPseudo`, `storyAttr`) to be generated based on `pseudoClasses` and `stateAttributes` enums.

#### Options

- `showDefault` Displays the default Story template if set to `true` or a `Story`
- `pseudoClasses` Enumerator for [psuedo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). Defaults: `hover`, `active`
- `stateAttributes` Emumerator for [attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes). Default: `disabled`

#### Usage Example

```ts
// my-component.ts
import { spread } from '@open-wc/lit-helpers';
import { html } from 'lit';
import type { StoryPseudoStateProps } from 'commons/esm/.storybook/utils/story-generators.js';

interface Props extends StoryPseudoStateProps {}

export const MyComponent = ({ storyPseudo, storyAttr, ...props }: Props) =>
  html`<div class=${storyPseudo} ${spread(storyAttr)}></div>`;
```

##### CSF3

```ts
// my-component.story.ts
import type { Meta } from '@storybook/web-components-vite';
import type { VariantStoryObj } from 'commons/esm/.storybook/utils/story-generators.js';

import { type Props, MyComponent } from './my-component';
import type {
  MyPseudoClsEnum,
  MyStateAttrEnum
} from './my-component-story.types';

const meta = {
  title: 'Components/My Component',
  render: MyComponent
  // ...
} satisfies Meta<Props>;

export default meta;

type Story = VariantStoryObj<Props>;

const Template: Story = {};

export const stories = (template: Story = Template) =>
  generatePseudoStateStories(template, {
    pseudoClasses: MyPseudoClsEnum,
    stateAttributes: MyStateAttrEnum
  });
```

#### CSF4 (Experimental)

```ts
// my-component.story.ts
import preview from '.storybook/preivew';

import { MyComponent } from './my-component';

const meta = preview.meta({
  title: 'Components/My Component',
  render: MyComponent
});

const Template = meta.story();

export const stories = (template: {} = Template) =>
  generatePseudoStateStories(template, {
    pseudoClasses: MyPseudoClsEnum,
    stateAttributes: MyStateAttrEnum
  });
```

## [Functions](functions.ts)

General utilities for Storybook.

### Get Pseudo State Arg Types

Ideally used with [generatePseudoStateStories](#default-pseudo-state-stories).

`getPseudoStateArgTypes({ pseudoClasses?, stateAttributes?, argStateAttrMapper? })`

#### Options

- `pseudoClasses` Similar to `generatePseudoStateStories`, if you decided to override the defaults, you will need to override them here as well.
- `stateAttributes` Ditto
- `argStateAttrMapper` (Default: `(attributes) => attributes`) By default, the Story input type for `stateAttributes` will be [mapped](https://storybook.js.org/docs/api/arg-types#mapping) and passed to the Story's `render` or `component` as a list of `props`. You can use this option to augment the respective key or value for each available attribute.

#### Basic Usage

##### CSF3

```ts
// my-component.story.ts
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { type StoryPseudoStateArgs } from 'commons/esm/.storybook/utils/story-generators.js';
import { getPseudoStateArgTypes } from 'commons/esm/.storybook/utils/functions.js';

import type { Props } from './my-component';

const meta = {
  // ...
  argTypes: {
    // ...
    ...getPseudoStateArgTypes(/* options */)
  }
} satisfies Meta<Props>;

export default meta;

type Story = StoryObj<
  Omit<Props, 'storyPseudo' | 'storyAttr'> & StoryPseudoStateArgs
>;

export const Default: Story = {
  args: {
    storyAttr: 'none',
    storyPseudo: 'none'
  }
};
```

##### CSF4 (Experimental)

```ts
// my-component.story.ts
import preview from '.storybook/preview';
import { getPseudoStateArgTypes } from 'commons/esm/.storybook/utils/functions.js';

import type { Props } from './my-component';

const meta = preview.meta({
  // ...
  argTypes: {
    // ...
    ...getPseudoStateArgTypes(/* options */)
  }
});

export default meta;

type Args = Omit<Props, 'storyPseudo' | 'storyAttr'> & StoryPseudoStateArgs;

export const Default = meta.type<{ args: Args }>().story({
  args: {
    storyAttr: 'none',
    storyPseudo: 'none'
  }
});
```
