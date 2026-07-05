import { html } from 'lit';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';
import classNames from 'classnames';

import { type Sector as SectorProps, computeSectorPath } from 'utils/functions';
import { StoryIdGenerator } from 'stories/utils/functions';
import styles from './Sector.module.scss';

const generatePathId = StoryIdGenerator('sector_path');

export interface Props extends SectorProps {
  variant?: string;
  style?: StyleInfo;
}

export function Sector({ variant, style, ...rest }: Props) {
  const pathId = generatePathId();
  return html`
    <svg width="0" height="0" styles="position: absolute;">
      <clippath id=${pathId} clipPathUnits="objectBoundingBox">
        <path d=${computeSectorPath(rest)} />
      </clippath>
    </svg>
    <div
      class=${classNames(styles.sector, variant)}
      style=${styleMap({
        clipPath: `url(#${pathId})`,
        ...style
      })}
    ></div>
  `;
}
