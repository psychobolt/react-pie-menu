import preview from '.storybook/preview';

import type { Props as SliceProps } from './Slice';
import { type Props, Pie } from './Pie';

const meta = preview.meta({
  title: 'Components/Pie',
  tags: ['autodocs'],
  component: Pie,
  subcomponents: { 'Pie.Slice': Pie.Slice }
});

export default meta;

interface Args extends Props {
  slices: SliceProps[];
}

export const Default = meta.type<{ args: Args }>().story({
  argTypes: {
    slices: {
      table: { category: 'Story' }
    }
  },
  args: {
    style: {
      width: '324px'
    },
    slices: [
      {
        startAngle: -45,
        value: 90,
        style: {
          background: 'orange'
        }
      },
      {
        value: 90,
        style: {
          background: 'pink'
        }
      },
      {
        startAngle: 180,
        value: 0.25,
        style: {
          background: 'blue'
        }
      }
    ]
  },
  render: ({ slices, innerRadius, ...props }) => {
    return (
      <Pie {...props} innerRadius={innerRadius}>
        {slices.map((props, i) => (
          <Pie.Slice key={i} {...props} />
        ))}
      </Pie>
    );
  }
});
