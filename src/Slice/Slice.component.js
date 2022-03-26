// @flow
import * as React from 'react';
import { ThemeContext } from 'styled-components';
import { connectTheme } from 'styled-components-theme-connector';

export type Context = {
  radius: string,
  centerRadius: string,
  centralAngle: number,
  polar: boolean,
};

const ContentContainer = connectTheme('slice.contentContainer')(('div'));

const Content = connectTheme('slice.content')('div');

type Callback = (event: SyntheticEvent<*>) => any;

type Props = {
  as: any,
  className: string,
  contentHeight: string,
  onMouseEnter: Callback,
  onMouseOver: Callback,
  onMouseOut: Callback,
  onSelect: Callback,
  onKeyDown: Callback,
  onFocus: Callback,
  onBlur: Callback,
  attrs: {},
  children: any,
} & Context;

const Slice = ({
  as: Component = 'div',
  className,
  contentHeight = '2em',
  onMouseEnter,
  onMouseOver,
  onMouseOut,
  onSelect,
  onKeyDown,
  onFocus,
  onBlur,
  children,
  attrs = {},
}: Props) => {
  const { context: { active } } = React.useContext(ThemeContext);
  const getCallback = callback => (active ? callback : undefined);
  return (
    <Component
      {...attrs}
      role="button"
      className={className}
      onMouseEnter={getCallback(onMouseEnter)}
      onMouseOver={getCallback(onMouseOver)}
      onMouseOut={getCallback(onMouseOut)}
      onClick={getCallback(onSelect)}
      onKeyDown={getCallback(onKeyDown)}
      onFocus={getCallback(onFocus)}
      onBlur={onBlur}
      _highlight={active ? active.toString() : undefined}
      tabIndex={-1}
    >
      <ContentContainer
        contentHeight={contentHeight}
      >
        <Content>
          {children}
        </Content>
      </ContentContainer>
    </Component>
  );
};

export default (connectTheme('slice.container')(Slice): React.ComponentType<Props>);
