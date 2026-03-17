import type { ProcessOptions, AcceptedPlugin } from 'postcss';
import pseudoClasses from 'postcss-pseudo-classes';

type Config = ProcessOptions & { plugins?: AcceptedPlugin[] };

const config: Config = {
  plugins: [
    pseudoClasses({
      restrictTo: ['focus', 'hover', 'active']
    })
  ]
};

export default config;
