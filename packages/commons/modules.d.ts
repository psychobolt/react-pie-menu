declare module 'prettier-config-standard';

declare module 'postcss-pseudo-classes' {
  import type { PluginCreator } from 'postcss';

  interface Options {
    // default contains `:root`.
    blacklist?: string[];

    // (optional) create classes for a restricted list of selectors
    // N.B. the colon (:) is optional
    restrictTo?: string[];

    // default is `false`. If `true`, will output CSS
    // with all combinations of pseudo styles/pseudo classes.
    allCombinations?: boolean;

    // default is `true`. If `false`, will generate
    // pseudo classes for `:before` and `:after`
    preserveBeforeAfter?: boolean;
  }

  const postcssPseudoClasses: PluginCreator<Options>;

  export default postcssPseudoClasses;
}
