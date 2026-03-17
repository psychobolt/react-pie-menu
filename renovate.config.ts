import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  AllConfig,
  RenovateConfig
} from 'renovate/dist/config/types.d.ts';

import getWorkspaces from './bin/ls-workspaces.ts';

const workspaces: Workspace[] = await getWorkspaces({
  nodeLinker: ['node-modules', 'pnpm']
});

type RequiredKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

type PackageRule = NonNullable<RenovateConfig['packageRules']>[number] & {
  minimumGroupSize?: number;
};

type PostUpgradeTask = RequiredKeys<
  NonNullable<RenovateConfig['postUpgradeTasks']>,
  'commands' | 'fileFilters'
>;

type PostUpgradeTaskRule = Omit<
  NonNullable<RenovateConfig['packageRules']>[number],
  'postUpgradeTasks'
> & { postUpgradeTasks: PostUpgradeTask };

type PostPackageTasks = Array<
  RequiredKeys<PostUpgradeTaskRule, 'postUpgradeTasks'>
>;

const bootstrapRule: PostUpgradeTaskRule = {
  matchFileNames: [
    'packages/commons/package.json',
    'packages/stylelint-config/package.json',
    ...workspaces.map(({ location }) => join(location, 'package.json'))
  ],
  postUpgradeTasks: {
    commands: ['yarn bootstrap'],
    fileFilters: ['**/yarn.lock'],
    executionMode: 'branch'
  }
};

const postPackageTasks: PostPackageTasks = [
  {
    matchPackageNames: ['prettier**'],
    postUpgradeTasks: {
      commands: ['yarn turbo run format'],
      fileFilters: ['**/*'],
      executionMode: 'branch'
    }
  }
];

const config: Omit<AllConfig, 'packageRules'> & {
  packageRules: PackageRule[];
  nvm: {};
} = {
  extends: ['config:best-practices', ':prHourlyLimitNone'],
  ignorePresets: ['security:minimumReleaseAgeNpm'],
  nvm: {
    enabled: false
  },
  automerge: true,
  allowedCommands: ['^.+$'],
  baseBranchPatterns: ['main'],
  packageRules: [
    {
      matchPackageNames: ['renovate*'],
      matchBaseBranches: ['main'],
      matchUpdateTypes: ['major'],
      groupName: 'Renovate',
      minimumGroupSize: 2
    },
    bootstrapRule,
    ...postPackageTasks,
    ...postPackageTasks.map(({ postUpgradeTasks, ...rule }) => ({
      ...rule,
      postUpgradeTasks: {
        ...postUpgradeTasks,
        commands: [
          ...bootstrapRule.postUpgradeTasks.commands,
          ...postUpgradeTasks.commands
        ],
        fileFilters: [
          ...bootstrapRule.postUpgradeTasks.fileFilters,
          ...postUpgradeTasks.fileFilters
        ]
      }
    }))
  ]
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(config));
}

export default config;
