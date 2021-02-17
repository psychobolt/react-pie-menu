const context = key => ({ theme }) => theme.context?.[key];

export const radius = context('radius');
export const centerRadius = context('centerRadius');
export const centralAngle = context('centralAngle');
export const polar = context('polar');
export const ifObtuse = (value, _default) => props => (context('centralAngle')(props) > 90
  ? value : _default);
