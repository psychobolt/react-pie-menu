import { useContext } from 'react';
import { Context, Pie } from '@psychobolt/circle-ui-react/Pie';

export const Slice: typeof Pie.Slice = ({ children, value, ...props }) => {
  const api = useContext(Context);
  if (!api) throw new Error('Slice must be used within a Pie.');
  return (
    <Pie.Slice {...props} value={value ?? 360 / ((api.count ?? 0) || 1)}>
      {children}
    </Pie.Slice>
  );
};
