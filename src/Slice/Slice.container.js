import React from 'react';
import Slice, { Context, ItemContext } from './Slice.component';

export default props => {
  const context = React.useContext(Context);
  const itemContext = React.useContext(ItemContext);
  return <Slice {...props} {...context} {...itemContext} />;
};
