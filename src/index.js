// @flow
import * as React from 'react';
import { withDefaultTheme } from 'styled-components-theme-connector';

import PieMenu from './PieMenu.container.js';
import type { Props } from './PieMenu.container.js';
import theme from './PieMenu.theme.js';

export * from './Slice/index.js';
export { default as Slice } from './Slice/index.js';
export * from './PieMenu.selectors.js';
export { PieCenter } from './PieMenu.component.js';
export default (withDefaultTheme(theme, ['pieMenu', 'slice'])<Props>(PieMenu): React.ComponentType<Props>);
