import {
  type Renderer,
  type InferTypes,
  type ProjectAnnotations,
  type PreviewAddon,
  definePreview
} from 'storybook/internal/csf';
import addonDocs from '@storybook/addon-docs';

import type { Preview, PreviewBase } from './types.ts';

const addons = [addonDocs()];

type Addons = typeof addons;

type DefaultRenderer = InferTypes<Addons>;

export const input = {
  addons,
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      codePanel: true,
      source: {
        excludeDecorators: true
      }
    }
  }
} satisfies ProjectAnnotations<DefaultRenderer & Renderer> & {
  addons: Addons;
};

export function withDefaults<
  TRenderer extends Renderer,
  TAddons extends PreviewAddon<never>[] = Addons,
  TPreviewBase extends PreviewBase<
    DefaultRenderer & TRenderer & InferTypes<TAddons>
  > = PreviewBase<TRenderer & DefaultRenderer & InferTypes<TAddons>>,
  TPreview extends Preview<DefaultRenderer & TRenderer & InferTypes<TAddons>> =
    Preview<TRenderer & DefaultRenderer & InferTypes<TAddons>>
>(preview: (defaults: typeof input) => TPreviewBase) {
  const _preview = preview(input);
  const { meta, ...rest } = _preview;

  const metaToExtend: typeof meta = (input) => {
    return {
      ..._preview.meta(input),
      type() {
        return this;
      }
    };
  };

  return {
    ...rest,
    meta: metaToExtend
  } as unknown as TPreview;
}

export default withDefaults((defaults) => definePreview(defaults));
