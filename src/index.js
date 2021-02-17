import { withDefaultTheme } from 'styled-components-theme-connector';

import PieMenu from './PieMenu.container';
import theme from './PieMenu.theme';

export * from './Slice';
export { default as Slice } from './Slice';
export * from './PieMenu.selectors';
export { PieCenter } from './PieMenu.component';
export default withDefaultTheme(theme, ['pieMenu', 'slice'])(PieMenu);
