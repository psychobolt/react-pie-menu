// @flow
import * as React from 'react';

import { connectTheme } from 'styled-components-theme-connector';

export type ContextType = {
  radius: string,
  centerRadius: string,
  centralAngle: number,
};

export const Context: React.Context<ContextType> = React.createContext<ContextType>({});

type ItemContextType = {
  startAngle: number,
  endAngle: number,
  skew: number,
  active: boolean,
};

export const ItemContext: React.Context<ItemContextType> = React.createContext<ItemContextType>({});

const ContentContainer = connectTheme('slice.contentContainer')('div');

const Content = connectTheme('slice.content')('div');

type Callback = (event: SyntheticEvent<*>) => any;

type Props = {
  className: string,
  contentHeight: string,
  onMouseOver: Callback,
  onMouseOut: Callback,
  onSelect: Callback,
  onKeyDown: Callback,
  onFocus: Callback,
  onBlur: Callback,
  attrs: {},
  children: any,
} & ContextType & ItemContextType;

const Slice = ({
  className,
  contentHeight = '2em',
  centralAngle,
  endAngle,
  radius,
  centerRadius,
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

export default (connectTheme('slice.container')(Slice): React.AbstractComponent<Props>);
