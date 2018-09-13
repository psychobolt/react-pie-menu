import { css } from 'styled-components';

export const container = css`
  border: 10px solid black;
  background-color: black;
`;

export const center = css`
  div {
    position: absolute;
    top: 50%;
    width: 100%;
    color: white;
    text-align: center;
  }
`;

export const button = css`
  background: ${({ backgroundColor, centerRadius }) => `radial-gradient(transparent ${centerRadius}, ${backgroundColor} ${centerRadius})`}; /* e.g. background: radial-gradient(transparent 50px, red 50px); */
`;
