import preview from '.storybook/preview';
import { Markdown } from './Markdown';

const meta = preview.meta({
  title: 'Add Ons/Blocks/Markdown',
  tags: ['autodocs'],
  component: Markdown
});

export default meta;

export const Badge = meta.story({
  args: {
    children:
      '[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://github.com/storybookjs/storybook?tab=readme-ov-file#badges--presentation-materials)'
  }
});
