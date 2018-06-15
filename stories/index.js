import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';

import Readme from '../README.md';
import ContextMenu from './ContextMenu';
import PreferenceSelector from './PreferenceSelector';

storiesOf('PieMenu', module)
  .add('Readme', doc(Readme))
  .add('as Context Menu', () => <ContextMenu />)
  .add('with Submenus', () => <PreferenceSelector />);
