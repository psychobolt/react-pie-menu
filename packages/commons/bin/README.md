# Bin

Commons scripts, executables, and any runtimes for workspace or infrastructure related workflows.

## Lint

`lint.ts` ([Source](lint.ts))

```sh
# For integrated workspace, runs type check before linter
yarn g:run-script $PROJECT_CWD/bin/lint.ts [options]
# Or
yarn lint [options]
# Or
npm lint [options]
```

A suite that executes and outputs the results from supported runners ([ESLint](utils/README.md#eslint), [Stylelint](utils/README.md#eslint)).

### Options

### Runner

```sh
--runner [runner]
```

Pass one or more runner to be executed and return results.

### Formatter

```sh
--formatter [formatter | reporter] # shorthand (-f)
```

Pass one or more formatter or reporter flags.
