import React from 'react';
import Slice, { Context } from './Slice.component';

export default props => {
  const { centerRadius, centralAngle, polar } = React.useContext(Context);
  return <Slice {...props} centerRadius={centerRadius} centralAngle={centralAngle} polar={polar} />;
};
