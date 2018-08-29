// @flow
import React from 'react';
import { isFragment, isElement } from 'react-is';
import { compose, withProps, withContext, getContext } from 'recompose';
import { connectTheme } from 'styled-components-theme-connector';

import type Slice from './Slice';
import { itemTypes, propTypes, type Context } from './Slice';

/* eslint-disable no-use-before-define */
type Props = {
  className: string,
  slices: Slice[],
  Center: typeof PieCenter,
  attrs: {}
} & Context;
/* eslint-enable no-use-before-define */

const List = connectTheme('pieMenu.list')('ul');

const Item = compose(
  withContext(
    itemTypes,
    ({ startAngle, endAngle, skew }) => ({ startAngle, endAngle, skew }),
  ),
  connectTheme('pieMenu.item'),
)('li');

export const PieCenter = connectTheme('pieMenu.center')('div');

const getSlices = (child, index) => {
  let slices = [];
  if (isFragment(child)) {
    React.Children.forEach(child.props.children, (slice, i) => {
      slices = [...slices, ...getSlices(slice, index + i)];
    });
  } else if (isElement(child)) {
    return [child];
  }
  return slices;
};

const computeSlices = compose(
  withProps(({ children }) => {
    let slices = [];
    let index = 0;
    React.Children.forEach(children, (child, i) => {
      slices = [
        ...slices,
        ...getSlices(child, index + i),
      ];
      index = Math.max(0, slices.length - 1);
    });
    return { slices };
  }),
  withContext(propTypes, ({
    slices,
    radius = '150px',
    centerRadius = '50px',
  }: Context) => {
    const centralAngle = 360 / slices.length || 360;
    const polar = centralAngle % 180 === 0;
    return { radius, centerRadius, centralAngle, polar };
  }),
  getContext(propTypes),
);

const PieMenu = ({
  className,
  radius,
  centerRadius,
  centralAngle,
  startOffsetAngle = 0,
  polar,
  Center = PieCenter,
  slices,
  attrs = {},
}: Props) => {
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  return (
    <div className={className} {...attrs}>
      <List radius={radius}>
        {slices.map((slice, i) => (
          <Item
            key={i.toString()}
            startAngle={startAngle}
            endAngle={centralAngle * i}
            skew={polar ? 0 : deltaAngle}
            centralAngle={centralAngle}
          >
            {slice}
          </Item>
        ))}
      </List>
      <Center centerRadius={centerRadius} />
    </div>
  );
};

export default compose(
  computeSlices,
  connectTheme('pieMenu.container'),
)(PieMenu);
