# Development

## Getting Started

### Local environment setup

1. Install the latest v22 (Jod) node (https://nodejs.org/en/download) from a package manager or installer
2. Setup Yarn (https://yarnpkg.com/getting-started/install)
3. Run command `yarn install && yarn bootstrap` in the your project directory to bootstrap your workspace
4. Download and install [Visual Studio Code](https://code.visualstudio.com/)
5. Open your project in VSCode with latest v22 (Jod) node (e.g. `nvm use 22 && code ./vite-storybook-boilerplate`)
6. Check notifications (bottom right of VSCode status bar) and install all recommended extensions
7. Follow Yarn's [Editor SDKs guide](https://yarnpkg.com/getting-started/editor-sdks#vscode) (step 3) to set VSCode's TypeScript version to workspace's
8. Copy `.vscode/settings.default.json` to `.vscode/settings.json` and replace `${workspaceFolder}` with the absolute path of your current directory.
9. Restart VSCode and reopen the project as in step 5.

#### Troubleshooting

Overriding Yarn's default global folder (e.g. `YARN_GLOBAL_FOLDER=${HOME}/.yarn/berry` or `YARN_GLOBAL_FOLDER=${LOCALAPPDATA}/Yarn/berry`) in your local `.env` file may help resolve issues during bootstrapping.

### Setup Remote Cache (Optional)

#### Local Development

1. Create and login to a Vercel account: https://vercel.com/
2. Login to the default remote cache provider: `yarn turbo login`
3. Follow any prompt instructions
4. Run `yarn turbo link`

### Commands

```sh
# Some examples
yarn my-bin-script # Execute a binary script
yarn my-task-name  # Run a task
yarn run [-B] my-bin-or-task-name
yarn exec my-bin-or-script
```

See [information](https://yarnpkg.com/cli) on commands for Yarn.

> Each project level has their own set of scripts. Please see documentation in workspace directories (`apps/*` or `packages/*`).

#### Main Project

```sh
yarn node ./path/to/script.js       # Run a js script file
yarn run-script ./path/to/script.ts # Run a ts script file
yarn up package-name [--exact]      # Upgrade all instances of package to latest release
yarn lint
yarn format # This is automatically called on git commit

# Global tasks that can be hoisted to any workspace scope
yarn g:run-script ./path/to/script.ts # Reusable scripts that can be included in a workspace script e.g. "lint": "yarn g:run-script ./path/to/script.ts"
yarn g:lint --runner eslint           # Lint js files with eslint
yarn g:lint --runner stylelint        # Lint [s]css files with stylelint
yarn g:prettier [options]             # Runs prettier format tool
```

##### Additional Scripts

See [bin/](bin/)

#### Workspace Scope

```sh
#cd (packages|apps)/workspace-name # optional if not using yarn workspace command, otherwise you'll run task on all workspaces
yarn [workspace workspace-name] turbo task-name [--force] [-- --some-option] # Run a turbo enabled task
# or by using path directly. By default the `workspace` sub-command will search all workspace paths
yarn [(packages|apps)/workspace-name] turbo run task-name
yarn [workspace workspace-name] turbo run start # Serve production build
yarn [workspace workspace-name] turbo run dev # Start up dev server, Storybook, watch, etc...
yann [workspace workspace-name] turbo run build # Build for production
yarn [workspace workspace-name] turbo run watch # Recompile sources when a file changes (package workspaces)
yarn [workspace workspace-name] turbo run build-storybook # Build for production
yarn [workspace workspace-name] turbo run lint
yarn [workspace workspace-name] turbo run format # This is automatically called on git commit.
yarn [workspace workspace-name] turbo run chromatic # Requires Chromatic Setup
yarn [workspace workspace-name] turbo run test
yarn [workspace workspace-name] turbo run coverage # Collect code coverage (also may run tests)
```

You can also run multiple workspaces with Turbo's filter option. e.g. `yarn turbo run format --filter=react-ui --filter=html-ui --filter=apps/**`.

You can also pass in specific arguments into the task e.g. `yarn workspace commons turbo run format -- vite.config.ts turbo.json # formats specific files`

See Turbo's docs for more [usages](https://turbo.build/repo/docs/reference/command-line-reference).

## Managing Dependencies

This project supports continious upgrades with [Renovate Bot](https://docs.renovatebot.com/) and provides a default [global and repository config](https://docs.renovatebot.com/config-overview/). See [renovate.config.cjs](renovate.config.cjs) and [renovate.json](renovate.json) respectively. It is recommended to setup and allow permissions based on your repository [platform](https://docs.renovatebot.com/modules/platform/).

### Adding Dependencies

```sh
yarn [workspace workspace-name] add -[D]E library-or-workspace-name
```

> Note: All packages are installed using the [PnP strategy](https://yarnpkg.com/features/pnp) by default. To see advantages, visit the [official Yarn docs](https://yarnpkg.com/features/pnp). Some tools or library APIs, however, are not compatible with the PnP resolution strategy. In order to circumvent you can opt out by setting up a non PnP workspace. For example, see the ["unplugged" Workspace](packages/unplugged/).

## Envrionment Variables

### Using environment files

```sh
yarn [workspace workspace-name] g:dotenv help                    # Print usage
yarn [workspace workspace-name] g:dotenv-get MY_VARIABLE         # Print a environment variable value
yarn [workspace workspace-name] g:dotenv-run -- my-script-or-bin # Loads envronment variables with your script or bin
```

See [documentation](https://dotenvx.com/docs) for usage.

### Best Practices

- Keep personal secrets or local overrides in a `.env` file.
- Keep shared secrets in a `.env.*` file.
- Before committing shared secrets, utilize `dotenvx` to [encrypt](https://dotenvx.com/docs/quickstart#add-encryption) values e.g. (`yarn [workspace workspace-name] g:dotenv set <VARIABLE> <my-private-key> -f .env.<environment>`). Make sure to provide private encryption keys (prefixed by `DOTENV_PRIVATE_KEY_`) with your team or CI workflow after committing respective environment files.

## [Workflows](WORKFLOWS.md)

Additional development guides and best practices
