import React from 'react';
import { render, screen } from '@testing-library/react';

import HelloWorld from '../HelloWorld.component.js';

describe('component <HelloWorld />', () => {
  it('should render correctly', async () => {
    render(<HelloWorld />);
    await (screen.findByText('src/HelloWorld/HelloWorld.component.js'));
  });
});
