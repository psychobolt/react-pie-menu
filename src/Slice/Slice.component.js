// @flow
import React from 'react';

import styles from './Slice.style';

export type Callback = () => void;

type Props = {
  children: any,
  containerStyle: {},
  focusStyle: {},
  contentContainerStyle: {},
  contentStyle: {},
  onSelect: Callback,
  onMouseUp: Callback,
  onMouseOver: Callback
};

type State = {
  focused: boolean
};

export default class Slice extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  onMouseOver = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseOver } = this.props;
    if (onMouseOver) {
      onMouseOver();
    }
    this.setState({ focused: true });
    event.stopPropagation();
  }

  onMouseOut = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseUp } = this.props;
    if (onMouseUp) {
      onMouseUp();
    }
    this.setState({ focused: false });
    event.stopPropagation();
  }

  render() {
    const { children, onSelect, containerStyle, focusStyle, contentContainerStyle, contentStyle } = this.props;
    const { focused } = this.state;
    const { background, ...rest } = Object.assign({}, styles.focus, focusStyle);
    const focusedBgStyle = { background };
    const focusedStyle = rest;
    return (
      <div
        role="button"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onMouseUp={onSelect}
        onFocus={() => {}}
        onBlur={() => {}}
        tabIndex={-1}
        style={Object.assign({}, styles.container, containerStyle)}
      >
        <div style={focused ? Object.assign({}, styles.focus, focusedBgStyle) : {}}>
          <div style={Object.assign({}, styles.contentContainer, contentContainerStyle)}>
            <div style={Object.assign(
                {},
                styles.content,
                contentStyle,
                focused ? focusedStyle : {},
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
