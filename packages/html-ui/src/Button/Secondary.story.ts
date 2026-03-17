import preview from '.storybook/preview';
import styles from 'Button/Button.module.scss';
import primaryMeta from './Primary.story';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.meta({
  ...primaryMeta.input,
  title: 'Components/Button/Secondary',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args#component-args
  args: {
    ...primaryMeta.input.args,
    variant: styles.storybookButtonSecondary
  }
});

export default meta;

export const Default = meta.story();
