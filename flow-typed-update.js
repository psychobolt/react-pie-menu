import path from 'path';
import spawn from 'cross-spawn';

import { setup, getProjects, getPackageName } from './workspaces.js';

await (setup());
const projects = await (getProjects());

/* eslint-disable no-console, no-await-in-loop, no-restricted-syntax */
for (const [cwd] of projects) {
  const name = await (getPackageName(cwd));
  console.log(`Installing flow types for [${name}]`);
  spawn.sync(
    'yarn',
    [
      'workspace', name,
      'exec', 'flow-typed', 'update', '-s', '-i', 'dev', '-p', path.resolve(), '--verbose', '--skipFlowRestart',
    ],
    { stdio: 'inherit' },
  );
  console.log();
}
