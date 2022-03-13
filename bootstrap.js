/* eslint-disable no-console */
import spawn from 'cross-spawn';

console.log('Installing main project dependencies....');
spawn.sync('yarn', ['install'], { stdio: 'inherit' });
console.log();

console.log('Installing workspaces dependencies....');
spawn.sync('yarn', ['workspaces', 'focus', '-A'], { stdio: 'inherit' });
console.log();
