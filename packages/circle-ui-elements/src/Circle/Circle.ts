import { html } from 'lit';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import styles from './Circle.module.scss';

export interface Props {
  style?: StyleInfo;
}

export const Circle = ({ style = {} }: Props) =>
  html`<div class=${styles.circle} style=${styleMap({ ...style })}></div>`;
