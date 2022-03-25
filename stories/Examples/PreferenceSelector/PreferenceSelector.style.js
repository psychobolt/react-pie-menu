import { background } from 'react-pie-menu';
import { css } from 'styled-components';

export const container = css`
  border: 20px solid #ecd3ee;
`;

export const center = css`
  background: #eee3ef;

  &:not(:empty):hover {
    cursor: pointer;
  }

  > svg {
    position: relative;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
  }
`;

export const slice = css`
  color: grey;
  ${background('white')};

  &[filled="true"] {
    color: black;
  }

  &[active="true"],
  &[_highlight="true"] {
    color: black;
    ${background('#eee3ef')}
    cursor: pointer;
  }
`;
