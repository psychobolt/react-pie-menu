import React from 'react';
import Simon from './Simon.component.js';
import code from './Simon.component.js?raw';

const Story = () => <Simon />;

Story.parameters = {
  docs: {
    source: {
      code,
    },
  },
};

export default Story;
