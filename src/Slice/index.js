// @flow
import {
  container,
  contentContainer,
  content,
  getBackground as background,
} from './Slice.style';

const sliceStyles = { container, contentContainer, content };

export { sliceStyles, background };
export * from './Slice.component';
export { default } from './Slice.container';
