import React from 'react';
import PieMenu, { PieCenter, Slice } from 'react-pie-menu';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './Simon.theme';

const Button = props => (
  <Link to="/ding">
    <Slice {...props} />
  </Link>
);

const Center = props => (
  <Route
    path="/ding"
    render={() => (
      <PieCenter {...props}>
        <div>Ding!</div>
      </PieCenter>
    )}
  />
);

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <PieMenu Center={Center} startOffsetAngle={45}>
        <Button backgroundColor="red" />
        <Button backgroundColor="blue" />
        <Button backgroundColor="yellow" />
        <Button backgroundColor="green" />
      </PieMenu>
    </ThemeProvider>
  </Router>
);
