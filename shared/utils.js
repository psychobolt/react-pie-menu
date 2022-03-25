import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import slash from 'slash';
import appRoot from 'app-root-path';

export const dirname = url => slash(path.dirname(fileURLToPath(url)));

export const rootResolve = () => slash(`${appRoot}`);

export const requireCJS = (url, modulePath) => createRequire(url)(modulePath);

export const normalizePath = cwd => slash(path.resolve(`${cwd}`));
