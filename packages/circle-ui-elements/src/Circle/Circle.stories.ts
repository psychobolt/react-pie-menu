import preview from '.storybook/preview';

import { Circle } from './Circle';

export const containerStyles = {
  width: '300px',
  background: 'rgb(109 109 109 / 92.5%)'
};

const meta = preview.meta({
  title: 'Elements/Circle',
  tags: ['autodocs'],
  render: Circle,
  args: {
    style: containerStyles
  },
  excludeStories: ['containerStyles']
});

export default meta;

export const Default = meta.story({});
