import { css } from 'styled-components';

export const container = css`
  width: 200%;
  height: 200%;
  transform-origin: 50% 50%;
  border-radius: 50%;
  transform: ${({ skew, polar, centralAngle }) => `skew(${-skew}deg) rotate(${((polar ? 90 : centralAngle) / 2) - 90}deg)`};
  color: black;
  background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, rgba(109, 109, 109, 0.925) ${centerRadius}`});
  outline: none;

  &:hover {
    color: white;
    background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #424242 ${centerRadius}`});
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
`;
