// @flow
import React from 'react';
import { compose, getContext } from 'recompose';
import PropTypes from 'prop-types';

import { connectTheme } from 'styled-components-theme-connector';

type Callback = (event: SyntheticEvent<*>) => any;

export type Context = {
  radius: string,
  centerRadius: string,
  centralAngle: number,
  polar: boolean, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  className: string,
  endAngle: number,
  contentHeight: string,
  onMouseOver: Callback,
  onMouseOut: Callback,
  onSelect: Callback,
  onFocus: Callback,
  onBlur: Callback,
  attrs: {},
  children: any,
} & Context;

export const propTypes = {
  radius: PropTypes.string,
  centerRadius: PropTypes.string,
  centralAngle: PropTypes.number,
  polar: PropTypes.bool,
};

export const itemTypes = {
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  skew: PropTypes.number,
};

const ContentContainer = connectTheme('slice.contentContainer')('div');

const Content = connectTheme('slice.content')('div');

const Slice = ({
  className,
  radius,
  centerRadius,
  contentHeight = '2em',
  centralAngle,
  endAngle,
  onMouseOver,
  onMouseOut,
  onSelect,
  onFocus,
  onBlur,
  children,
  attrs = {},
}: Props) => (
  <div
    role="button"
    className={className}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onMouseUp={onSelect}
    onFocus={onFocus}
    onBlur={onBlur}
    tabIndex={-1}
    {...attrs}
  >
    <ContentContainer
      radius={radius}
      centralAngle={centralAngle}
      centerRadius={centerRadius}
      contentHeight={contentHeight}
    >
      <Content angle={endAngle}>
        {children}
      </Content>
    </ContentContainer>
  </div>
);

export default compose(
  getContext({ ...propTypes, ...itemTypes }),
  connectTheme('slice.container'),
)(Slice);
