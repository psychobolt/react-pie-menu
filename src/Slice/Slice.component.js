// @flow
import * as React from 'react';
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
  active: boolean,
  contentHeight: string,
  onMouseOver: Callback,
  onMouseOut: Callback,
  onSelect: Callback,
  onKeyDown: Callback,
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
  active: PropTypes.bool,
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
  active,
  onMouseOver,
  onMouseOut,
  onSelect,
  onKeyDown,
  onFocus,
  onBlur,
  children,
  attrs = {},
}: Props) => (
  <div
    {...attrs}
    role="button"
    className={className}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onClick={onSelect}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    _highlight={active ? active.toString() : undefined}
    tabIndex={-1}
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

export default (compose(
  getContext({ ...propTypes, ...itemTypes }),
  connectTheme('slice.container'),
)(Slice): React.AbstractComponent<Props>);
