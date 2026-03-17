import autoprefixer from 'autoprefixer';
import type { ProcessOptions, AcceptedPlugin } from 'postcss';

type Config = ProcessOptions & { plugins?: AcceptedPlugin[] };

const config: Config = {
  plugins: [autoprefixer()]
};

export default config;
