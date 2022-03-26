import React from 'react';
import PreferenceSelector from './PreferenceSelector.component.js';
import code from './PreferenceSelector.component.js?raw';

const Story = () => <PreferenceSelector />;

Story.parameters = {
  docs: {
    source: {
      code,
    },
  },
};

export default Story;
