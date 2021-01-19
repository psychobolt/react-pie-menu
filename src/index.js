import { withDefaultTheme } from 'styled-components-theme-connector';

import PieMenu from './PieMenu.component';
import theme from './PieMenu.theme';

export { default as Slice, background } from './Slice';
export { PieCenter } from './PieMenu.component';
export default withDefaultTheme(theme, ['pieMenu', 'slice'])(PieMenu);
