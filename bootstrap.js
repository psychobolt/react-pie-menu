/* eslint-disable no-console */
import { execa } from 'execa';

console.log('Installing main project dependencies....');
await execa('yarn', ['install'], { stdio: 'inherit' });
console.log();

console.log('Installing workspaces dependencies....');
await execa('yarn', ['workspaces', 'focus', '-A'], { stdio: 'inherit' });
console.log();
