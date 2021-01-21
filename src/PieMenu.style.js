import { css } from 'styled-components';

const position = ({ radius, centerX, centerY }) => css`
  position: ${centerX || centerY ? 'absolute' : 'relative'};
  ${centerX ? `left: calc(${centerX} - ${radius})` : ''};
  ${centerY ? `top: calc(${centerY} - ${radius})` : ''};
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
  width: calc(2 * ${({ radius }) => radius});
  height: calc(2 * ${({ radius }) => radius});
`;

export const item = css`
  width: ${({ centralAngle }) => (centralAngle > 90 ? '100%' : '50%')};
  height: ${({ centralAngle }) => (centralAngle > 90 ? '100%' : '50%')};
  bottom: ${({ centralAngle }) => (centralAngle > 90 ? '50%' : 'initial')};
  right: ${({ centralAngle }) => (centralAngle > 90 ? '50%' : 'initial')};
  position: absolute;
  transform: rotate(${({ startAngle, endAngle }) => startAngle + endAngle}deg) skew(${({ skew }) => skew}deg);
  transform-origin: bottom right;
  overflow: hidden;
`;

export const center = css`
  position: absolute;
  border-radius: 50%;
  background: transparent;
  top: calc(50% - ${({ centerRadius }) => centerRadius});
  left: calc(50% - ${({ centerRadius }) => centerRadius});
  width: calc(2 * ${({ centerRadius }) => centerRadius});
  height: calc(2 * ${({ centerRadius }) => centerRadius});
`;
