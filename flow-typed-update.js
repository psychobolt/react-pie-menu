import path from 'path';
import spawn from 'cross-spawn';

spawn.sync('lerna', ['exec', '--parallel', '--', 'flow-typed', 'update', '-s', '-i', 'peer', 'dev', '-p', path.resolve(), '--verbose'], { stdio: 'inherit' });
