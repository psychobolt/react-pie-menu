import { definePreview } from 'storybook/internal/csf';

const { meta, ...preview } = definePreview({});

export default {
  ...preview,
  meta: (input: any) => ({
    ...meta(input),
    type() {
      return this;
    }
  })
};
