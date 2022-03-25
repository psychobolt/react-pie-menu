import { css } from 'styled-components';

import { radius, centerRadius, ifObtuse } from './PieMenu.selectors.js';
import { startAngle, endAngle, skew } from './Slice/Slice.selectors.js';

const position = ({ centerX, centerY, ...props }) => css`
  position: ${centerX || centerY ? 'absolute' : 'relative'};
  ${centerX ? `left: calc(${centerX} - ${radius(props)})` : ''};
  ${centerY ? `top: calc(${centerY} - ${radius(props)})` : ''};
`;

export const container = css`
  display: inline-block;
  ${position}
  border-radius: 50%;
  overflow: hidden;
`;

export const list = css`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  width: calc(2 * ${radius});
  height: calc(2 * ${radius});
`;

export const item = css`
  width: ${ifObtuse('100%', '50%')};
  height: ${ifObtuse('100%', '50%')};
  bottom: ${ifObtuse('50%', 'initial')};
  right: ${ifObtuse('50%', 'initial')};
  position: absolute;
  transform: rotate(${props => startAngle(props) + endAngle(props)}deg) skew(${skew}deg);
  transform-origin: bottom right;
  overflow: hidden;
`;

export const center = css`
  position: absolute;
  border-radius: 50%;
  background: transparent;
  top: calc(50% - ${centerRadius});
  left: calc(50% - ${centerRadius});
  width: calc(2 * ${centerRadius});
  height: calc(2 * ${centerRadius});
`;
