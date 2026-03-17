import preview from '.storybook/preview';
import {
  type StoryPseudoStateProps,
  generatePseudoStateStories
} from 'commons/esm/.storybook/utils/story-generators.js';
import { getPseudoStateArgTypes } from 'commons/esm/.storybook/utils/functions.js';

import { type Props, Button } from 'Button';
import primaryMeta from 'Button/Primary.story';

type Args = Props & StoryPseudoStateProps;

const styles = { padding: '3px' };

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.type<{ args: Args }>().meta({
  ...primaryMeta.input,
  title: 'Components/Button/Primary/Pseudo States',
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ...primaryMeta.input.argTypes,
    ...getPseudoStateArgTypes()
  },
  decorators: [
    (Story) => (
      <div style={styles}>
        <Story />
      </div>
    )
  ],
  render: ({ storyPseudo, storyAttr, ...props }) => (
    <Button {...props} {...storyAttr} className={storyPseudo} />
  )
});

export default meta;

export const stories = generatePseudoStateStories({}, { showDefault: false });
