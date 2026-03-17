import preview from '.storybook/preview';

import secondaryMeta from 'Button/Secondary.story';
import primaryMeta from './Primary.variants';

const meta = preview.meta({
  ...primaryMeta.input,
  ...secondaryMeta.input,
  title: 'Components/Button/Secondary/Pseudo States',
  argTypes: {
    ...primaryMeta.input.argTypes,
    ...secondaryMeta.input.argTypes
  }
});

export default meta;

export * from './Primary.variants';
