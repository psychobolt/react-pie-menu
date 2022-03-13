import React from 'react';
import enzyme from 'enzyme';

import Messenger from '../Messenger.component.js';

const { shallow } = enzyme;

test('component <Messenger /> should render correctly', () => {
  shallow(<Messenger />);
});
