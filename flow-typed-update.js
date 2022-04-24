/* eslint-disable no-console */
import path from 'path';
import { execa } from 'execa';
import { createRequire } from 'module';

// TODO use project resolver
import { setup, getProjects, getPackageName } from './workspaces.js';
import { rootResolve, dirname } from './shared/utils.js';

const importMetaUrl = import/*:: ("") */.meta.url;
const require = createRequire(importMetaUrl);

const ROOT_RESOLVE = rootResolve();
const SHARED_RESOLVE = path.resolve(ROOT_RESOLVE, 'shared');
const FLOW_DEPS_RESOLVE = path.resolve(SHARED_RESOLVE, 'flow-deps');
const FLOW_DEPS_LINK_RESOLVE = path.resolve(ROOT_RESOLVE, 'flow-deps-modules');

const libdefDir = path.relative(dirname(importMetaUrl), path.resolve(SHARED_RESOLVE, 'flow-typed'));

const command = async (args, cwd) => execa('yarn', args, { stdio: 'inherit', cwd }); // TODO handle stderr
const flowTypedCmd = ['node', require.resolve('flow-typed'), 'update', '--libdefDir', libdefDir, '-s', '--skipFlowRestart', '-i', 'dev'];

console.log('Linking Flow Dependencies...');
command(['install'], FLOW_DEPS_RESOLVE);
command(['symlink-dir', path.resolve(ROOT_RESOLVE, FLOW_DEPS_RESOLVE, 'node_modules'), FLOW_DEPS_LINK_RESOLVE]);

console.log('\nChecking flow types for shared/flow-deps');
command([...flowTypedCmd, '-p', ROOT_RESOLVE], FLOW_DEPS_RESOLVE);

await (setup());
const projects = await (getProjects());

/* eslint-disable no-await-in-loop, no-restricted-syntax */
for (const [cwd] of projects) {
  const name = await (getPackageName(cwd));
  console.log(`\nChecking flow types for [${name}]`);
  command(['workspace', name, 'exec', ...flowTypedCmd, '-p', ROOT_RESOLVE]);
}
