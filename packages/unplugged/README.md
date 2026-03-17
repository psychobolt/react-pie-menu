# Unplugged

Workspace for hoisting any non-PnP configurations or dependencies into their "unplugged" state. 

## Configuration

```sh
yarn workspace unplugged add -[D]E library-name
```

## Q & A

__Q:__ What's the difference between `yarn unplug library-name` and _this_ workspace?

__A:__ Use `yarn unplug` for tools that cannot completely use Yarn's resolver or linker (e.g. pnpm, PnP loader). If they can be resolved only by CLI tool and not elsewhere (e.g. 3rd party extensions), then it is preferred to mirror the packages so that can be resolved in this workspace as a _fallback_ e.g.

```ts
// Tool config
import { createRequire } from 'node:module';
import path from 'node:path')

const require = createRequire(
  process.env.INIT_CWD
    ? import.meta.url
    : path.join(process.cwd(), 'packages/unplugged/node_modules')
);

// require.resolve('package-for-3rd-party-tool');
```
