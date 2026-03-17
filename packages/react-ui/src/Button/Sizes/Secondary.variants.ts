import preview from '.storybook/preview';
import secondaryMeta from 'Button/Secondary.story';
import primaryMeta, { stories as getStories } from './Primary.variants';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.meta({
  ...primaryMeta.input,
  ...secondaryMeta.input,
  title: 'Components/Button/Secondary/Sizes'
});

export default meta;

const Secondary = meta.story();

export const stories = getStories(Secondary.input);
