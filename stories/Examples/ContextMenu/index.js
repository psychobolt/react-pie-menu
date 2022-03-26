import React from 'react';
import ContextMenu from './ContextMenu.component.js';
import code from './ContextMenu.component.js?raw';

const Story = () => <ContextMenu />;

Story.parameters = {
  docs: {
    source: {
      code,
      language: 'javascript',
    },
  },
};

export default Story;
