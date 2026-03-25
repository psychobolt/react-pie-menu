# Bin

Commons scripts, executables, and any runtimes for workspace or infrastructure related workflows.

## Lint

`lint.ts` ([Source](lint.ts))

A suite that executes and outputs the results from supported runners ([ESLint](utils/README.md#eslint), [Stylelint](utils/README.md#eslint)).

```sh
# For integrated workspace
yarn g:run-script $PROJECT_CWD/bin/lint.ts [options]
# Or
yarn lint [options]
# Or
npm lint [options]
```

### Options

#### Runner

```sh
--runner [runner]
```

Pass one or more runner to be executed and return results.

#### Formatter

```sh
--formatter [formatter | reporter] # shorthand (-f)
```

Pass one or more formatter or reporter flags.

## TSC Paths

`tsc-paths.ts` ([Source](./tsc-paths.ts))

Remove alias and restore relative path for project modules in `*.d.ts` emitted files.

```sh
# For integrated workspace
yarn tsc --project ./tsconfig.dts.json && yarn g:run-script $PROJECT_CWD/bin/lint.ts [options]
# Or
yarn tsc --project ./tsconfig.dts.json && tsc-paths [options]
# Or
npm tsc --project ./tsconfig.dts.json && tsc-paths [options]
```

### Options

#### Project (Required)

```sh
--project /path/to/tsconfig.json # shorthand (-p)
```
