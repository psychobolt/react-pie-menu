import { css } from 'styled-components';
import { system } from '@styled-system/core';
import { color } from '@styled-system/color';
import { themeGet } from '@styled-system/theme-get';

const getCenterRadius = ({ centerRadius }) => centerRadius;

const getColor = value => themeGet(`colors.${value}`, value);

export const getBackground = background => (background ? css`background: radial-gradient(transparent ${getCenterRadius}, ${getColor(background)} ${getCenterRadius});` : '');

const background = props => getBackground(props.bg || props.backgroundColor);

const textHighlight = system({
  textHighlight: {
    property: 'color',
    scale: 'colors',
  },
});

const highlight = props => getBackground(props.highlight);

export const container = css`
  width: 200%;
  height: 200%;
  transform-origin: 50% 50%;
  border-radius: 50%;
  transform: ${({ skew, polar, centralAngle }) => `skew(${-skew}deg) rotate(${((polar ? 90 : centralAngle) / 2) - 90}deg)`};

  color: black;
  ${color}

  ${getBackground('rgba(109, 109, 109, 0.925)')}; /* css fallback */
  ${background};

  outline: none;

  &:hover,
  &[_highlight=true] {
    color: white;
    ${textHighlight}
    
    ${getBackground('#424242')};
    ${highlight};
  }
`;

export const contentContainer = css`
  position: absolute;
  width: 100%;
  text-align: center;
  top: ${({ radius, centralAngle, centerRadius, contentHeight }) => `calc((${centralAngle > 90 ? '50% + ' : ''}${radius} - ${centerRadius}) / 2 - ${contentHeight} / 2)`};
`;

export const content = css`
  display: inline-block;
  transform: rotate(${({ angle }) => -angle}deg);
  user-select: none;
`;
