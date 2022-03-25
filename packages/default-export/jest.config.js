import { pathToFileURL } from 'url';
import appPath from 'app-root-path';

appPath.import = async path => import(pathToFileURL(appPath.resolve(path)));

const { default: config } = await (appPath.import('/shared/jest.config.js'));
const { dirname } = await (appPath.import('/shared/utils.js'));
const { getPackageName, setup } = await (appPath.import('/workspaces.js'));

await (setup());

export default {
  ...config,
  displayName: await (getPackageName(dirname(import/*:: ("") */.meta.url))),
};
