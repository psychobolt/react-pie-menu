import preview from '.storybook/preview';

import { Circle } from './Circle';

export const containerStyles = {
  width: '300px',
  background: 'rgb(109 109 109 / 92.5%)'
};

const meta = preview.meta({
  title: 'Components/Circle',
  tags: ['autodocs'],
  component: Circle,
  argTypes: {
    children: {
      control: false,
      table: {
        type: {
          summary: 'ReactNode'
        }
      }
    }
  },
  args: {
    className: '',
    style: containerStyles
  },
  excludeStories: ['containerStyles']
});

export default meta;

export const Default = meta.story({});
