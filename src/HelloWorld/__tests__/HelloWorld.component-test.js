import React from 'react';
import { render } from '@testing-library/react';

import HelloWorld from '../HelloWorld.component.js';

describe('component <HelloWorld />', () => {
  it('should render correctly', () => {
    render(<HelloWorld />);
  });
});
