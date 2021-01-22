// @flow
import * as React from 'react';
import { compose, getContext } from 'recompose';
import PropTypes from 'prop-types';

import { connectTheme } from 'styled-components-theme-connector';

export const itemTypes = {
  active: PropTypes.bool,
  endAngle: PropTypes.number,
  skew: PropTypes.number,
};

export type ContextType = {
  radius: string,
  centerRadius: string,
  centralAngle: number,
};

export const Context: React.Context<ContextType> = React.createContext<ContextType>({});

const ContentContainer = connectTheme('slice.contentContainer')('div');

const Content = connectTheme('slice.content')('div');

type Callback = (event: SyntheticEvent<*>) => any;

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
} & ContextType;

const Slice = ({
  className,
  contentHeight = '2em',
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
}: Props) => {
  const { radius, centerRadius, centralAngle } = React.useContext(Context);
  return (
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
};

export default (compose(
  getContext(itemTypes),
  connectTheme('slice.container'),
)(Slice): React.AbstractComponent<Props>);
