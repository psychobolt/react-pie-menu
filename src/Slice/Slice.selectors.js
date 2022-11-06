// @flow
import type { ThemeContextSelector } from '../PieMenu.selectors.js';

const context: (string => ThemeContextSelector<any>) = key => ({ theme }) => theme.context[key];

export const startAngle: ThemeContextSelector<number> = context('startAngle');
export const endAngle: ThemeContextSelector<number> = context('endAngle');
export const skew: ThemeContextSelector<number> = context('skew');
