import preview from '.storybook/preview';
import SecondaryMeta from 'Button/Secondary.story';
import primaryMeta from './Primary.variants';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.meta({
  ...primaryMeta.input,
  ...SecondaryMeta.input,
  title: 'Components/Button/Secondary/Sizes'
  // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
});

export default meta;

export * from './Primary.variants';
