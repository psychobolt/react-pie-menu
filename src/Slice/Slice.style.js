import { css } from 'styled-components';
import { system } from '@styled-system/core';
import { color } from '@styled-system/color';
import { themeGet } from '@styled-system/theme-get';

import { skew, endAngle } from './Slice.selectors.js';
import { radius, centerRadius, centralAngle, polar, ifObtuse } from '../PieMenu.selectors.js';

const getColor = value => themeGet(`colors.${value}`, value);

export const getBackground = background => (background ? css`
  background: radial-gradient(transparent ${centerRadius}, ${getColor(background)} ${centerRadius});
` : '');

const background = props => getBackground(props.bg || props.backgroundColor);

const textHighlight = system({
  textHighlight: {
    property: 'color',
    scale: 'colors',
  },
});

const highlight = props => getBackground(props.highlight);

export const container = css`
  display: block;
  width: 200%;
  height: 200%;
  transform-origin: 50% 50%;
  border-radius: 50%;
  transform: skew(${props => -skew(props)}deg) rotate(${props => ((polar(props) ? 90 : centralAngle(props)) / 2) - 90}deg);
  color: black;
  ${color}
  ${getBackground('rgba(109, 109, 109, 0.925)')}; /* css fallback */
  ${background};
  outline: none;

  &[_highlight="true"] {
    color: white;
    ${textHighlight}
    ${getBackground('#424242')};
    ${highlight};
  }
`;

const contentHeight = props => props.contentHeight;

export const contentContainer = css`
  position: absolute;
  width: 100%;
  text-align: center;
  top: calc((${ifObtuse('50%', '0px')} + ${radius} - ${centerRadius}) / 2 - ${contentHeight} / 2);
`;

export const content = css`
  display: inline-block;
  transform: rotate(-${endAngle}deg);
  user-select: none;
`;
