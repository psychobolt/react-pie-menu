import preview from '.storybook/preview';

import { containerStyles } from 'Circle/Circle.stories';
import styles from './Sector.module.scss';
import { Sector } from './Sector';

const { background, ...noBgStyles } = containerStyles;

const meta = preview.meta({
  title: 'Elements/Sector',
  tags: ['autodocs'],
  render: Sector,
  argTypes: {
    endAngle: {
      type: 'number'
    }
  },
  args: {
    variant: '',
    style: noBgStyles,
    innerRadius: 0.15,
    value: 0.25,
    startAngle: 0,
    endAngle: undefined
  }
});

export default meta;

export const Default = meta.story();

export const Active = meta.story({
  args: {
    variant: styles.active
  }
});
