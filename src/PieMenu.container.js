// @flow
import * as React from 'react';
import { isFragment, isElement } from 'react-is';
import { ThemeContextProvider } from 'styled-components-theme-connector';
import toPx from 'to-px';

import PieMenu from './PieMenu.component.js';
import type { Props as BaseProps } from './PieMenu.component.js';

const getSlices = (containerId, child, index) => {
  let slices = [];
  if (isFragment(child)) {
    React.Children.forEach(child.props.children, (slice, i) => {
      slices = [...slices, ...getSlices(containerId, slice, index + i)];
    });
  } else if (isElement(child)) {
    return [{
      itemId: `${containerId}_slice_${index}`,
      slice: child,
    }];
  }
  return slices;
};

export type Props = {
  children?: React.Node,
} & BaseProps;

export default (({
  radius = '150px',
  centerRadius = '50px',
  children,
  ...props
}: Props) => {
  const id = React.useId();
  let slices = [];
  let index = 0;
  React.Children.forEach(children, (child, i) => {
    slices = [
      ...slices,
      ...getSlices(id, child, index + i),
    ];
    index = Math.max(0, slices.length - 1);
  });
  const centralAngle = 360 / slices.length || 360;
  const polar = centralAngle % 180 === 0;
  const metadata = {
    radiusPx: toPx(radius) || 0,
    centerRadiusPx: toPx(centerRadius) || 0,
  };
  const context = {
    radius: `${metadata.radiusPx}px`,
    centerRadius: `${metadata.centerRadiusPx}px`,
    centralAngle,
    polar,
  };
  return (
    <ThemeContextProvider {...context}>
      <PieMenu {...props} {...context} {...metadata} containerId={id} slices={slices} />
    </ThemeContextProvider>
  );
}: React.ComponentType<Props>);
