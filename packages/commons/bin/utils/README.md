# Utils

## Functions

`functions.ts` ([Source](functionts.ts))

### General Exit Codes

The following are constants that can be imported to script files. It is best in practice to be consistent with exit codes throughout scripts.

- `EXIT_SUCCESS` - The script has no errors
- `EXIT_INVALID_USAGE` - For general or usage errors
- `EXIT_INVALID_ARGUMENTS` - For specific errors with passed arguments

### `$`

```ts
const { error, stdout, stderr } = await $(command, options);
```

Analogous to running a sub process, denoted similarly as [shell substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html) e.g. `$(command)`. By default, command `stdio` will be piped to the main process.

### `hash`

```ts
const string = hash(algorihtm, data, options);
```

Generate a hashed string using built-in crypto library available in Node v20.12.0+. Refer to [docs](https://nodejs.org/api/crypto.html#cryptohashalgorithm-data-options) for usage.

## Runners

runners.ts ([Source](runners.ts))

### `eslint`

```ts
const results = await eslint(files, [...formatters]);
```

Lint files that are associated with [nearest config](https://eslint.org/docs/v9.x/use/configure/configuration-files#experimental-configuration-file-resolution). The `'default'` formatter will fallback to [stylish](https://eslint.org/docs/latest/use/formatters/#stylish).

### `stylelint`

```ts
const results = await stylelint(files, [...formatters]);
```

Accepts a list of CSS files and a set of formatters. The `'default'` formatter will fallback to your `formatter` option in [config](https://stylelint.io/user-guide/configure#formatter).

## Reporters

`reporters.ts` ([Source](reporters.ts))

### `ErrorReporter`

```ts
const reporter = new ErrorReporter();
try {
  await reporter.process(results);
} catch (e) {
  process.exitCode = 1;
}
```

Throw a error which can be handled when there exist any errors from runners.

### `Bitbucket`

```ts
const reporter = new Bitbucket();
await reporter.process(results);
await reporter.publish();
```

Outputs a `bitbucket-report.json` and `bitbucket-annotations.json` file that can be used for [Bitbucket Code Insights](https://support.atlassian.com/bitbucket-cloud/docs/code-insights/).
