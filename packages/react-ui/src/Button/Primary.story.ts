import { fn } from 'storybook/test';

import preview from '.storybook/preview';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction#default-export
const meta = preview.meta({
  title: 'Components/Button/Primary',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' }
    }
  },
  // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args#component-args
  args: {
    label: 'Button',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn()
  },
  component: Button
});

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = meta.story({});
