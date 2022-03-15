import path from 'path';
import yargs from 'yargs';
import glob from 'glob';
import micromatch from 'micromatch';
import appRoot from 'app-root-path';
import slash from 'slash';
import { Configuration, Project } from '@yarnpkg/core';

const { argv } = yargs(process.argv.slice(2));

let PACKAGES;
const EXCLUDES = new Set();
const INCLUDES = new Set();
let PROJECTS;
let MAIN_PROJECT;

const normalizePath = cwd => slash(path.resolve(`${cwd}`));

// defined private in typescript, not sure how to add workspace without it
// TODO extend class Project, can we use workspace cache from MAIN_PROJECT?
const addWorkspace = async (project, cwd) => project.addWorkspace(normalizePath(cwd));

export const getExcludes = () => [...EXCLUDES];

export const getIncludes = () => [...INCLUDES];

export async function setup() {
  if (MAIN_PROJECT) return;

  PACKAGES = (process.env.PACKAGES || '*').trim();
  EXCLUDES.clear();
  INCLUDES.clear();

  if (PACKAGES) {
    PACKAGES.split(/\s*(?:,|\n|\s)+\s*/).forEach(pattern => {
      if (pattern.startsWith('!')) {
        EXCLUDES.add(pattern.substring(1));
      } else {
        INCLUDES.add(pattern);
      }
    });
  }

  const configuration = await Configuration.find(normalizePath(appRoot), null);
  const { projectCwd } = configuration;
  const project = new Project(projectCwd, { configuration });
  await addWorkspace(project, projectCwd);
  MAIN_PROJECT = project;
}

async function fetchWorkspaces() {
  if (!MAIN_PROJECT) return;

  const children = new Set();

  /* eslint-disable no-restricted-syntax */
  async function recursive(pending) {
    if (!pending.length) return;
    const tasks = [];
    // TODO: refactor
    for (const { cwd, manifest: { workspaceDefinitions } } of pending) {
      for (const { pattern } of workspaceDefinitions) {
        for (const workspaceCwd of glob.sync(path.resolve(cwd, pattern))) {
          tasks.push(addWorkspace(MAIN_PROJECT, workspaceCwd)
            .then(workspace => children.add(workspace)));
        }
      }
    }
    await Promise.all(tasks);
    await recursive(children);
  }
  /* eslint-enable no-restricted-syntax */

  await recursive(MAIN_PROJECT.workspaces);
}

export async function getProjects() {
  if (PROJECTS) return PROJECTS;

  await fetchWorkspaces();

  const tasks = [];
  const includes = getIncludes();
  const excludes = getExcludes();
  PROJECTS = new Map();

  MAIN_PROJECT.workspaces.forEach(workspace => {
    const { cwd, manifest } = workspace;
    const { name: { name } } = manifest;
    if (manifest.private) {
      return;
    }
    const strings = [name, cwd.replace(`${appRoot}/`, '')];
    if (micromatch.some(strings, includes) && !micromatch.some(strings, excludes)) {
      let project;
      if (MAIN_PROJECT.cwd === cwd) {
        PROJECTS.set(cwd, MAIN_PROJECT);
      } else {
        tasks.push(new Promise(resolve => {
          Configuration.find(cwd, null).then(configuration => {
            project = new Project(cwd, { configuration });
            addWorkspace(project, cwd).then(resolve);
            PROJECTS.set(cwd, project);
          });
        }));
      }
    }
  });

  await Promise.all(tasks);

  return PROJECTS;
}

export async function getPackageName(cwd) {
  const projects = await getProjects();
  const project = projects.get(cwd);
  if (project) {
    const { manifest: { name: { name, scope } } } = project.workspacesByCwd.get(cwd);
    return scope ? `@${scope}/${name}` : name;
  }
  return null;
}

if (argv.lsPublic) {
  await (setup());
  await (getProjects());

  const paths = [];
  PROJECTS.forEach((project, cwd) => paths.push(cwd));
  console.log(JSON.stringify(paths)); // eslint-disable-line no-console
}
