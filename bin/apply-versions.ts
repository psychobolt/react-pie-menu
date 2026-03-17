import arg from 'arg';
import semver from 'semver';

import {
  $,
  EXIT_SUCCESS,
  EXIT_INVALID_USAGE
} from 'commons/esm/bin/utils/functions.js';
import getWorkspaces from './ls-workspaces.ts';

enum Strategy {
  build,
  launch,
  stable,
  minor,
  patch
}

const args = arg({
  '--strategy': String,
  '--force': Boolean
});

const type = args['--strategy'] || Strategy[Strategy.build];
const force = args['--force'] === true;
const execOptions = { silent: true };

switch (type) {
  case Strategy[Strategy.minor]:
  // fall through
  case Strategy[Strategy.patch]:
    await $(
      `yarn workspaces foreach --since --no-private version ${type} --deferred`,
      execOptions
    );
    break;
}

async function* getTagAnnotation() {
  await $('git fetch --tags --force', execOptions);
  const tags = await $('git tag', execOptions);
  for await (const tag of tags.split('\n')) {
    const stdout = await $(
      `git tag -l --format="%(contents:subject)" ${tag}`,
      execOptions
    );
    yield stdout;
  }
}

type SemVer = Record<string, undefined | string>;

const buildTag = 'build';
const latest: SemVer = {};

for await (const annotation of getTagAnnotation()) {
  let versions: SemVer;
  try {
    versions = JSON.parse(annotation);
  } catch (e) {
    continue;
  }

  for (const pkg in versions) {
    const target = versions[pkg] ?? '0.0.0';
    if (target.includes(`-${buildTag}-`)) continue;
    const highest = latest[pkg] ?? '0.0.0';
    if (semver.gt(target, highest)) {
      latest[pkg] = target;
    }
  }
}

async function getVersions(options?: Options) {
  const result = await getWorkspaces<SemVer>({
    format: ['semver'],
    noPrivate: true,
    ...options
  });
  return Array.isArray(result) ? {} : result;
}

let current = await getVersions({
  since:
    !force &&
    [Strategy.launch, Strategy.patch, Strategy.minor].find(
      (index) => Strategy[index] === type
    )
});
const prev = { ...current };
const changed: string[] = [];

async function applyAll(immediate = false) {
  const stdout = (
    await $('yarn version apply --all --json', execOptions)
  ).trim();
  if (stdout === '') {
    if (immediate) {
      console.log('{}');
      process.exit(EXIT_SUCCESS);
    }
    return;
  }
  for (const line of stdout.split('\n')) {
    try {
      const { ident, newVersion }: Record<string, string> = JSON.parse(line);
      current[ident] = newVersion;
      if (!changed.includes(ident)) {
        changed.push(ident);
      }
    } catch (e) {
      continue;
    }
  }
}

await applyAll(true);

interface TaskInfo {
  task: string;
  package: string;
  hash: string;
}

interface BuildInfo {
  tasks: TaskInfo[];
}

interface PackageInfo {
  children: {
    Dependents: string[];
  };
}

const hashIds: Record<string, string> = {};
switch (type) {
  case Strategy[Strategy.minor]:
  // falls through
  case Strategy[Strategy.patch]:
    for (const packageName of [...changed]) {
      const stdout = await $(
        `yarn info ${packageName} -A --dependents --json`,
        execOptions
      );
      if (stdout) {
        const {
          children: { Dependents = [] }
        }: PackageInfo = JSON.parse(stdout);
        for (const dependency of Dependents) {
          const [, packageName] = dependency.match(/^(.+)@/) ?? [];
          if (packageName in current) {
            await $(
              `yarn workspace ${packageName} version ${type} --deferred`,
              execOptions
            );
            // TODO implement recusive versioning for updated packages
          }
        }
      }
    }
    await applyAll();
    break;
  case Strategy[Strategy.build]: {
    const stdout = await $('yarn turbo run build --dry-run=json', execOptions);
    const { tasks = [] }: BuildInfo = JSON.parse(stdout);
    for (const { task, package: name, hash } of tasks) {
      if (task === 'build') {
        hashIds[name] = hash;
      }
    }
    // fall through
  }
  default:
    for (const name in current) {
      const highest = latest[name] ?? '0.0.0';
      const oldVersion = prev[name] ?? '0.0.0';
      const version = current[name] ?? '0.0.0';
      let bump = null;

      if (!force && version === oldVersion) continue;

      switch (type) {
        case Strategy[Strategy.build]: {
          const hashId = hashIds[name];
          if (!hashId) {
            console.error(
              `Build task was not found for workspace "${name}". Did you configure it in turbo config?`
            );
            process.exit(EXIT_INVALID_USAGE);
          }
          bump = `${semver.major(version)}.${semver.minor(
            version
          )}.${semver.patch(version)}-${buildTag}-${hashId.substring(0, 7)}`;
          break;
        }
        case Strategy[Strategy.launch]:
          if (semver.lt(version, '1.0.0')) {
            bump = 'major';
          } else if (semver.lte(version, highest)) {
            bump = 'minor';
          }
          break;
        case Strategy[Strategy.stable]: {
          if (
            oldVersion === highest ||
            !(semver.lt(oldVersion, highest) && semver.lte(version, highest))
          ) {
            break;
          }
          const prerelease = semver.prerelease(oldVersion);
          let release;
          if (prerelease != null) {
            release = 'prerelease';
          } else {
            const diff: string = semver.diff(version, oldVersion) ?? 'prepatch';
            release = diff.startsWith('pre') ? diff : `pre${diff}`;
          }
          bump = semver.inc(
            oldVersion,
            release as semver.ReleaseType,
            'rc',
            '1'
          );
        }
      }

      const prerelease = bump == null ? null : semver.prerelease(bump);

      if (bump) {
        for (
          let i = 0;
          i < (prerelease == null ? 1 : 2);
          i += 1 // https://github.com/yarnpkg/berry/issues/3868
        ) {
          await $(`yarn workspace ${name} version ${bump}`, {
            ...execOptions,
            env: {
              ...process.env,
              CHANGE_SET_IGNORE_PATTERNS: '.yarn/versions/**'
            }
          });
        }
      }
    }
}

current = await getVersions();
console.log(JSON.stringify(current));
