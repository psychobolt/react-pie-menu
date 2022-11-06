// @flow
export type ThemeContextSelector<T> = ({ theme: { context: { [string]: T } } }) => T;

const context: (string => ThemeContextSelector<any>) = key => ({ theme }) => theme.context[key];

export const radius: ThemeContextSelector<number> = context('radius');
export const centerRadius: ThemeContextSelector<number> = context('centerRadius');
export const centralAngle: ThemeContextSelector<number> = context('centralAngle');
export const polar: ThemeContextSelector<boolean> = context('polar');
export const ifObtuse: ((any, any) => any) = (value, _default) => props => (context('centralAngle')(props) > 90
  ? value : _default);
