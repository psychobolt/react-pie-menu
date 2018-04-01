import React from 'react';
import { storiesOf } from '@storybook/react';

import ContextMenu from './ContextMenu';
import PreferenceSelector from './PreferenceSelector';

storiesOf('PieMenu', module)
  .add('as Context Menu', () => <ContextMenu />)
  .add('with Submenus', () => <PreferenceSelector />);
