import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index.js';

it('default <Component /> renders without crashing', () => {
  shallow(<Component />);
});
