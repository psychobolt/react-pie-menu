// @flow
import * as React from 'react';
import { isFragment, isElement } from 'react-is';
import { ThemeContextProvider } from 'styled-components-theme-connector';
import toPx from 'to-px';
import Hashids from 'hashids';

import PieMenu from './PieMenu.component.js';

const hashids = new Hashids();

const getSlices = (child, index) => {
  let slices = [];
  if (isFragment(child)) {
    React.Children.forEach(child.props.children, (slice, i) => {
      slices = [...slices, ...getSlices(slice, index + i)];
    });
  } else if (isElement(child)) {
    return [{
      itemId: `slice_${hashids.encode(new Date().getTime() + index)}`,
      slice: child,
    }];
  }
  return slices;
};

export default (({
  radius = '150px',
  centerRadius = '50px',
  children,
  ...props
}) => {
  let slices = [];
  let index = 0;
  React.Children.forEach(children, (child, i) => {
    slices = [
      ...slices,
      ...getSlices(child, index + i),
    ];
    index = Math.max(0, slices.length - 1);
  });
  const centralAngle = 360 / slices.length || 360;
  const polar = centralAngle % 180 === 0;
  const metadata = {
    radiusPx: toPx(radius),
    centerRadiusPx: toPx(centerRadius),
  };
  const context = {
    radius: `${metadata.radiusPx}px`,
    centerRadius: `${metadata.centerRadiusPx}px`,
    centralAngle,
    polar,
  };
  return (
    <ThemeContextProvider {...context}>
      <PieMenu {...props} {...context} {...metadata} slices={slices} />
    </ThemeContextProvider>
  );
}: React.AbstractComponent<any>);
