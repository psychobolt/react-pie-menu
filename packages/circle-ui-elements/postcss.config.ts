import type { ProcessOptions, AcceptedPlugin } from 'postcss';
import assignLayer from 'postcss-assign-layer';

type Config = ProcessOptions & { plugins?: AcceptedPlugin[] };

const config: Config = {
  plugins: [
    assignLayer([
      {
        include: 'src/*/**/*.module.scss',
        layerName: 'elements'
      }
    ])
  ]
};

export default config;
