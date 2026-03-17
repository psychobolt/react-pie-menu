import preview from '.storybook/preview';
import secondaryMeta from 'Button/Secondary.story';
import primaryMeta, {
  Primary,
  stories as getStories
} from './Primary.variants';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.meta({
  ...primaryMeta.input,
  ...secondaryMeta.input,
  argTypes: {
    ...primaryMeta.input.argTypes,
    ...secondaryMeta.input.argTypes
  },
  title: 'Components/Button/Secondary/Pseudo States'
});

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Secondary = Primary.extend({});

export const stories = getStories(Secondary);
