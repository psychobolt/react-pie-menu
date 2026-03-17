import fs from 'node:fs';
import { join } from 'node:path';
import { type ExecOptions, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { $ } from 'commons/esm/bin/utils/functions.js';

import getWorkspaces from './ls-workspaces.ts';

const EXIT_UNKNOWN_ERROR = 3;

const { appendFile } = fs.promises;

const install = (options?: ExecOptions) => $('yarn install', options);

async function* getWorkspacesByLinker() {
  const linkers: NodeLinker[] = ['pnpm', 'node-modules'];
  for (const linker of linkers) {
    const result: [NodeLinker, Workspace[]] = [
      linker,
      await getWorkspaces({
        nodeLinker: [linker]
      })
    ];
    yield result;
  }
}

for await (const [linker, workspaces] of getWorkspacesByLinker()) {
  if (!workspaces.length) continue;

  console.log(`Verify workspaces using ${linker} linker...`);

  for (const workspace of workspaces) {
    const options = { cwd: workspace.location };
    const run = () => {
      console.log(`Verifying ${workspace.name}...`);
      return install(options);
    };
    try {
      await run();
    } catch (error) {
      if (error instanceof Error && error.message.includes("code: 'EXDEV'")) {
        console.log(
          'Failed to link to global index. Attempting to migrate global cache to local project...'
        );
        const root = join(import.meta.dirname, '..');
        const temp = join(root, '.temp');
        const sharedFolder = join(temp, '.yarn/berry');
        const sharedCacheFolder = join(sharedFolder, 'cache');
        if (!fs.existsSync(sharedCacheFolder)) {
          console.log('Copying global cache...');
          const cacheFolder = fileURLToPath(
            `file://${process.env.YARN_GLOBAL_FOLDER}/cache`
          );
          if (
            execSync(
              'yarn config get enableGlobalCache',
              options
            ).toString() === 'false'
          ) {
            fs.renameSync(cacheFolder, sharedCacheFolder);
          } else {
            fs.cpSync(cacheFolder, sharedCacheFolder, {
              recursive: true
            });
          }
        }
        process.env.YARN_GLOBAL_FOLDER = sharedFolder;
        await appendFile(
          join(root, '.env'),
          `\n#Overrides Yarn's global folder path\nYARN_GLOBAL_FOLDER=${sharedFolder}\n`
        );
        console.log('Cleaning node_modules...');
        fs.rmSync(join(workspace.location, 'node_modules'), {
          recursive: true
        });
        try {
          await run();
        } catch (error) {
          process.exit(EXIT_UNKNOWN_ERROR);
        }
      } else {
        process.exit(EXIT_UNKNOWN_ERROR);
      }
    }
  }
}
