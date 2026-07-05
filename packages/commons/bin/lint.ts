import type { Spec, Result } from 'arg';
import arg from 'arg';

import { Bitbucket, ErrorReporter } from './utils/reporters.js';
import { eslint, stylelint } from './utils/runners.js';

const spec: Spec = {
  '--runner': [String],
  '--formatter': [String],
  '-f': '--formatter'
};

const args: Result<typeof spec> = arg(spec);

try {
  const runners = new Set(args['--runner'] ?? ['eslint']);
  const formatters = new Set(
    (args['--formatter'] ?? ['default']).map((name) => {
      if (name === 'bitbucket') {
        return new Bitbucket();
      }
      return name;
    })
  );

  formatters.add('default');

  const results = {
    eslint: runners.has('eslint') ? await eslint(['.'], formatters) : [],
    stylelint: runners.has('stylelint')
      ? await stylelint(['**/*.{sc,c}ss'], formatters)
      : []
  };

  for (const formatter of formatters) {
    if (typeof formatter === 'object') {
      await formatter.publish();
    }
  }

  try {
    const errorReporter = new ErrorReporter();
    await errorReporter.process(results);
  } catch (e) {
    process.exitCode = 1;
  }
} catch (e) {
  process.exitCode = 1;
  console.error(e);
}
