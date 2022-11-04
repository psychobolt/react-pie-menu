// @flow
type ThemeContextSelector<T> = ({ theme: { context: { [string]: T } } }) => T;

const context = (key: string) => (({ theme }) => theme.context[key]: ThemeContextSelector<any>);

export const radius = (context('radius'): ThemeContextSelector<number>);
export const centerRadius = (context('centerRadius'): ThemeContextSelector<number>);
export const centralAngle = (context('centralAngle'): ThemeContextSelector<number>);
export const polar = (context('polar'): ThemeContextSelector<boolean>);
export const ifObtuse = (value: any, _default: any): any => props => (context('centralAngle')(props) > 90
  ? value : _default);
