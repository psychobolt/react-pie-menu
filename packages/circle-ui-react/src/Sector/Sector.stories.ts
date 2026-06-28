import preview from '.storybook/preview';

import { containerStyles } from 'Circle/Circle.stories';
import { Sector } from './Sector';

const { background, ...noBgStyles } = containerStyles;

const meta = preview.meta({
  title: 'Components/Sector',
  tags: ['autodocs'],
  component: Sector,
  args: {
    style: noBgStyles,
    innerRadius: 45,
    value: 90
  }
});

export default meta;

export const Default = meta.story();
