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
  cursor: pointer;
  color: grey;
  background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, white ${centerRadius}`});

  &[filled=true] {
    color: black;
  }

  &:hover,
  &[active=true],
  &[_highlight=true] {
    color: black;
    background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #eee3ef ${centerRadius}`});
  }
`;
