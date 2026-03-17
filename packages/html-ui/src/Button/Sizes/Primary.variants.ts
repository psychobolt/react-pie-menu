import {
  type VariantStoryObj,
  generateStoriesByEnum
} from 'commons/esm/.storybook/utils/story-generators.js';

import preview from '.storybook/preview';
import type { Props } from 'Button';
import primaryMeta from 'Button/Primary.story';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories/introduction
const meta = preview.meta({
  ...primaryMeta.input,
  title: 'Components/Button/Primary/Sizes',
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ...primaryMeta.input.argTypes,
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
});

export default meta;

export enum SizeEnum {
  small,
  medium,
  large
}

export const stories = (template: VariantStoryObj<Props> = {}) =>
  generateStoriesByEnum([template], 'size', SizeEnum);
