// @flow
import React from 'react';
import { ThemeProvider } from 'styled-components';

import typeof PieMenu from '../PieMenu.component';
import * as pieMenuStyles from '../PieMenu.style';
import { sliceStyles } from '../Slice';

type Props = {
  children: any,
};

const theme = (custom = {}) => ({
  default: {
    pieMenu: pieMenuStyles,
    slice: sliceStyles,
  },
  custom,
});

export default (Component: PieMenu) => ({ children, ...props }: Props) =>
  <ThemeProvider theme={theme}><Component {...props}>{children}</Component></ThemeProvider>;
