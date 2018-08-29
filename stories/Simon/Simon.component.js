import React from 'react';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import PieMenu, { PieCenter, Slice } from 'src';

import * as styles from './Simon.style';

const theme = {
  pieMenu: {
    container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.button,
  },
};

const Button = Slice;

const Center = props => (
  <Route
    path="/ding"
    render={() => (
      <PieCenter {...props}>
        <div>
          {'Ding!'}
        </div>
      </PieCenter>
    )}
  />
);

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <PieMenu Center={Center} startOffsetAngle={45}>
        <Link to="/ding">
          <Button backgroundColor="red" />
        </Link>
        <Link to="/ding">
          <Button backgroundColor="blue" />
        </Link>
        <Link to="/ding">
          <Button backgroundColor="yellow" />
        </Link>
        <Link to="/ding">
          <Button backgroundColor="green" />
        </Link>
      </PieMenu>
    </ThemeProvider>
  </Router>
);
