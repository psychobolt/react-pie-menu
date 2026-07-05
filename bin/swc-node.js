#!/usr/bin/env node

import { execSync, spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default function run(args) {
  const _dirname = dirname(fileURLToPath(import.meta.url));

  if (!process.env.NPM_SCRIPT) {
    process.chdir(_dirname);
  }

  const nodeOptions = execSync('yarn node -p process.env.NODE_OPTIONS')
    .toString()
    .slice(0, -1)
    .replace('--experimental-loader', '--loader');

  const swcRegisterPath = execSync('yarn g:swc-register-path')
    .toString()
    .slice(0, -1);

  // IPC is blocked for `yarn node`, see https://github.com/yarnpkg/berry/issues/1696
  const child = spawn('node', args, {
    env: {
      ...process.env,
      NODE_OPTIONS: `${nodeOptions} -r ${swcRegisterPath}`
    },
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  }).on('message', (data) => {
    if (process.send !== undefined) {
      process.send(data);
    }
  });

  process.on('message', (data) => {
    child.send(data);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run(process.argv.slice(2));
}
