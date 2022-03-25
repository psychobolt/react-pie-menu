import path from 'path';
import fs from 'fs';

import config from './shared/jest.config.js';
import { setup, getProjects, getPackageName } from './workspaces.js';
import { dirname } from './shared/utils.js';

await (setup());

const projects = await (getProjects());
const configs = [];

projects.forEach((project, cwd) => {
  const configPath = path.resolve(cwd, 'jest.config.js');
  if (fs.existsSync(configPath)) {
    configs.push(configPath);
  }
});

export default {
  ...config,
  projects: configs,
  // root config
  displayName: await (getPackageName(dirname(import/*:: ("") */.meta.url))),
  testPathIgnorePatterns: [
    '/node_modules/',
    '/packages/',
  ],
};
