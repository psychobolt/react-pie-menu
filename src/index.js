// @flow
import * as React from 'react';
import { withDefaultTheme } from 'styled-components-theme-connector';

import PieMenuContainer from './PieMenu.container.js';
import type { Props } from './PieMenu.container.js';
import theme from './PieMenu.theme.js';

export * from './Slice/index.js';
export { default as Slice } from './Slice/index.js';
export * from './PieMenu.selectors.js';
export { PieCenter } from './PieMenu.component.js';
export const PieMenu = (withDefaultTheme(theme, ['pieMenu', 'slice'])<Props>(PieMenuContainer): React.ComponentType<Props>);
