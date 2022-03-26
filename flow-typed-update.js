/* eslint-disable no-console */
import path from 'path';
import spawn from 'cross-spawn';

// TODO use project resolver
import { setup, getProjects, getPackageName } from './workspaces.js';
import { rootResolve, dirname } from './shared/utils.js';

const ROOT_RESOLVE = rootResolve();
const SHARED_RESOLVE = path.resolve(ROOT_RESOLVE, 'shared');
const FLOW_DEPS_RESOLVE = path.resolve(SHARED_RESOLVE, 'flow-deps');
const FLOW_DEPS_LINK_RESOLVE = path.resolve(ROOT_RESOLVE, 'flow-deps-modules');

const command = (args, cwd) => spawn.sync('yarn', args, { stdio: 'inherit', cwd });

console.log('Linking Flow Dependencies...');
command(['install'], FLOW_DEPS_RESOLVE);
command(['symlink-dir', path.resolve(ROOT_RESOLVE, FLOW_DEPS_RESOLVE, 'node_modules'), FLOW_DEPS_LINK_RESOLVE]);

await (setup());
const projects = await (getProjects());

const libdefDir = path.relative(dirname(import/*:: ("") */.meta.url), path.resolve(SHARED_RESOLVE, 'flow-typed'));

/* eslint-disable no-await-in-loop, no-restricted-syntax */
for (const [cwd] of projects) {
  const name = await (getPackageName(cwd));
  console.log(`Checking flow types for [${name}]`);
  command([
    'workspace', name,
    'exec', 'flow-typed', 'update', '--libdefDir', libdefDir, '-s', '--skipFlowRestart', '-i', 'dev', '-p', ROOT_RESOLVE,
  ]);
  console.log();
}
