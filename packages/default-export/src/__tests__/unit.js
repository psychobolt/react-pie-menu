import React from 'react';
import { render } from '@testing-library/react';

import Component from '../index.js';

it('default <Component /> renders without crashing', () => {
  render(<Component />);
});
