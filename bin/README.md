# Bin

Collection of scripts, executables, and any runtimes for workspace or infrastructure related workflows.

## Bootstrap

`bootstrap.ts` ([Source](bootstrap.ts))

Installs workspaces that do not support `pnp` linker

## List Workspaces

`ls-workspaces.ts` ([Source](ls-workspaces.ts))

```sh
yarn ls-workspaces [options]
```

Returns a list of workspaces in the project. See options below.

### Filters

#### Name

`--name/-n [regExp]`

Returns only workspaces that fullfills the match.

#### Include/Exclude

`--include [globExp]` and/or `--exclude [globExp]`

List workspaces that matches a glob pattern. You may use a combination of filters (e.g. `--include "packages/*" --exclude "packages/*-{ui,config}"`).

#### Node Linker

`--node-linker [type]`

Returns only workspaces that matches the linker type (e.g. `pnpm`). You can specify more than one filters e.g. `--node-linker=pnpm --node-linker=node-modules`

#### Turbo Only

`--turbo-only`

Returns only workspaces that support `turbo`.

#### No Private

`--no-private`

Returns only workspaces that are not set to `private: true`.

#### Since

`--since`

Only include workspaces that have been changed since [changesetBaseRefs](https://yarnpkg.com/configuration/yarnrc#changesetBaseRefs).

### Formatters

```sh
--format [formatter]
```

#### `semver`

Returns the name and semantic version mapping of each workspace.

E.g.

```json
{ "[workspaceName1]": "[semVer1]", "[workspaceName2]": "[semVer2]" }
```

## Apply Versions

`apply-versions.ts` [Source](apply-versions.ts)

```sh
yarn apply-versions [--strategy [type]] [--force]
```

Utility for applying version strategy targets from `.yarn/versions`. Before running, run `git stash` to ensure workspaces are in a clean state. If no strategy `type` is specified, the default strategy used is `build`.

| Type        | SemVer                                 |
| ----------- | -------------------------------------- |
| `build`     | \_.\_.1-build-\<hash\>                 |
| `launch`    | ^X.^x.0                                |
| `stable`    | \_.^x.^x[-rc.^x] <br> \_.\_.\_-rc.^x\* |
| `minor`\*\* | \_.^x.\_                               |
| `patch`\*\* | \_.\_.^x                               |

^ = possible bumps

[ ] = optional tag that is used to prevent version conflicts. For instance, if 1.2.0 is the latest and there is a new a minor version strategy on 1.1.0, bump to preminor instead: 1.2.0-rc.1. \*Additional long releases will only increment prerelease.

\<hash\> = 6 character hash from the package's build task

\*\* Applies all target workspaces and additionally apply bump. It will also bump changed workspaces.

## SWC Node

`swc-node.js` [Source](swc-node.js)

Start a SWC enabled runtime that hooks on loading modules based on Yarn PnP resolvers. Ideally is used by tools that do not invoke the Yarn CLI directly e.g. `vscode-eslint`

```sh
# Example
node bin/swc-node.js [my-script.ts] [options]
```

## Hash

`hash.ts` ([Source](hash.ts))

Returns a hash string based on available algorithms supported by OpenSSL. For more info see Node API [docs](https://nodejs.org/api/crypto.html#cryptohashalgorithm-data-options).

```sh
# Examples
yarn run-script bin/hash.ts sha256 "hello world"
yarn run-script bin/hash.ts hello_world # use default algorithm - 'sha1'
```

## ESM Register

`esm-register.js` ([Source](esm-register.js))

As of Node v20, [hooks](https://nodejs.org/docs/latest-v20.x/api/module.html#customization-hooks) can be utilzed to customize the default resolver for loading JavaScript or TypeScript files. For exmaple, using `--import` flag hook:

```sh
ESM_REGISTER="my-hook.js" node --import bin/esm-register.js
```

By default, the [run-script](../DEVELOPMENT.md#main-project) command is setup with the [SWC register hook](../package.json#L19). Please see [API docs](https://nodejs.org/docs/latest-v22.x/api/module.html#customization-hooks) on defining your own hook.

## List Unmerged

`git-ls-unmerged.sh` ([Source](git-ls-unmerged.sh))

Given a list of SHA (`COMMITS`), export a list of commits (referenced by `REF`) that are not in `BASE_REF`. Can be used by the CI to create a pull request with selective changes from several feature branches.

### Example

We can validate and cherry-pick several commits that are not in `BASE_REF`. The following is executed in git bash:

```sh
COMMITS="f67dda88fe9d0a892c44af923cbbc50bfe454e0e bf7352d6328221cd1c02104c99f57faf5be54c7d" # possible commits
BASE_REF=master                                                                             # if not declared, uses `origin/main`
source ./git-ls-unmerged.sh
echo $REF
echo $COUNT                         # returns number of commits not in BASE_REF
echo $OUTPUT                        # shortened REF, each SHA seperated by '-'
git checkout -b cherry-pick-$OUTPUT # create a PR branch
git cherry-pick $REF -x             # note we should always provide the original SHA in the commit message. The 'x' arg will handle this.
git push
```
