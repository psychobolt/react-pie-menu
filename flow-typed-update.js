import spawn from 'cross-spawn';

import { setup, getProjects, getPackageName } from './workspaces.js';
import { rootResolve } from './shared/utils.js';

await (setup());
const projects = await (getProjects());

const ROOT_RESOLVE = rootResolve();

const libdefDir = './shared/flow-typed';

/* eslint-disable no-console, no-await-in-loop, no-restricted-syntax */
for (const [cwd] of projects) {
  const name = await (getPackageName(cwd));
  console.log(`Installing flow types for [${name}]`);
  spawn.sync(
    'yarn',
    [
      'workspace', name,
      'exec', 'flow-typed', 'update', '--libdefDir', libdefDir, '-s', '-i', 'dev', '-p', ROOT_RESOLVE, '--verbose', '--skipFlowRestart',
    ],
    { stdio: 'inherit' },
  );
  console.log();
}
