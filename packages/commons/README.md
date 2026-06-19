# Commons

Local workspace for sharing configs and scripts...

## Setup

```
yarn [workspace workspace-name] add -DE commons
```

### Configs

#### Vite

See [source](vite.config.ts)

/your/project/vite.config.ts

```ts
import { defineConfig, mergeConfig } from 'vite';
import commonConfig from 'commons/esm/vite.config.js';

export default mergeConfig(
  commonConfig,
  defineConfig({
    // your overrides
  })
);
```

#### Vitest

1. Create your own root or workspace config:

   See [source](vitest.config.ts)

   /your/project/vitest.config.ts

   ```ts
   import { mergeConfig } from 'vitest/config';
   import commonConfig from 'commons/esm/vitest.config.js';

   import viteConfig from './vite.config.ts';

   export default mergeConfig(commonConfig, viteConfig);
   ```

   > To organize different test environment configurations, it is recommended to set up within [workspaces](https://vitest.dev/guide/workspace.html#defining-a-workspace).

2. Add scripts to /your/project/package.json

   ```json
   {
     "scripts": {
       "test": "yarn g:vitest run",
       "coverage": "yarn test --coverage"
     }
   }
   ```

#### ESLint

1. Create your own config:

   See [source](eslint.config.ts)

   /your/project/eslint.config.ts

   ```ts
   import { defineConfig } from 'eslint/config';
   import commonConfig from 'commons/esm/eslint.config.js';

   export default defineConfig([
     ...commonConfig
     // your overrides
   ]);
   ```

2. Add scripts to /your/project/package.json

   ```json
   {
     "scripts": {
       "lint": "yarn g:lint"
     }
   }
   ```

#### Prettier

1. Create your own config:

   See [source](prettier.config.ts)

   /your/project/prettier.config.js

   ```js
   import commonConfig from 'commons/esm/prettier.config.js';

   /**
    * @type {import("prettier").Config}
    */
   export default {
     ...commonConfig
     // your overrides
   };
   ```

2. Add scripts to /your/project/package.json

   ```json
   {
     "scripts": {
       "lint": "yarn g:prettier --check .",
       "format": "yarn g:prettier --write ."
     }
   }
   ```

#### Lint Staged

See [source](lint-staged.base.config.ts)

/your/project/lint-staged.config.js

```js
export { default } from 'commons/esm/lint-staged.base.config.js';
```

Or

```js
import commonConfig from 'commons/esm/lint-staged.base.config.js';

/**
 * (optional) yarn [workspace workspace-name] add -DE lint-staged
 * @type {import('lint-staged').Configuration}
 */
export default {
  ...commonConfig
  // your overrides (optional)
};
```

#### Stylelint

Moved to [stylelint-config](../stylelint-config/)

#### TSConfig

See [source](tsconfig.js)

/your/project/tsconfig.json

```json
{
  "extends": "commons/tsconfig.json"
}
```

#### Storybook

##### ESLint

1. Create your own config:

See [source](.storybook/eslint-config.ts)

/your/project/eslint.config.ts

```ts
import { defineConfig } from 'eslint/config';
import storybookConfig from 'commons/esm/.storybook/eslint-config.js';

export default defineConfig(storybookConfig, {
  /* ... */
});
```

##### Vite

1. Create your own config:

   See [source](.storybook/vite-main.ts)

   /your/project/.storybook/main.ts

   ```ts
   import commonConfig, {
     configureSort
   } from 'commons/esm/.storybook/vite-main.js';

   import { defineConfig } from '@storybook/your-framework/node';

   /* 
      Opt in to sort all your story groupings in Alphabetical order.
      See configuration details: https://www.npmjs.com/package/storybook-multilevel-sort
   */
   configureSort(/* ... */);

   export default defineConfig({
     ...commonConfig
     // your overrides
   });
   ```

2. Add scripts to /your/project/package.json

   ```json
   {
     "scripts": {
       "dev": "yarn g:storybook dev",
       "build-storybook": "yarn g:storybook build"
     }
   }
   ```

##### Preview

See [source](.storybook/preview.ts)

###### With Defaults

/your/project/.storybook/preview.ts

```ts
import { definePreview } from '@storybook/web-components';
import { withDefaults } from 'commons/esm/.storybook/preview.js';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

const parameters = {
  options: {
    // @ts-expect-error See issue: https://github.com/storybookjs/storybook/issues/30429
    storySort: (a, b) => globalThis['storybook-multilevel-sort:storySort'](a, b)
  }
};

export default {
  parameters,
  ...withDefaults((defaults) =>
    definePreview(
      mergeConfig(defaults, {
        parameters
        // ...
      })
    )
  )
};
```

/your/project/src/MyComponent/Primary.story.ts

```ts
import preview from '.storybook/preview';
import { MyComponent } from './MyComponent';

const meta = preview.meta({
  title: 'Components/MyComponent/Primary',
  component: MyComponent
  // ...
});

export const Default = meta.story({
  // ...
});
```

###### Meta Proxy / Proxy Provider

By defaults enhances [type()](https://storybook.js.org/docs/api/csf/csf-next#previewtypemeta) and [extend()](https://storybook.js.org/docs/api/csf/csf-next#storyextend) for meta. (Optional) You can extend the meta with your own properties:

/your/project/.storybook/meta.ts

```ts
import { MetaProxy as _MetaProxy } from 'commons/esm/.storybook/meta.js';

export class MetaProxy<
  TMeta extends object,
  TInput extends object
> extends _MetaProxy<TMeta, TInput> {
  /*
  constructor(meta, input) {
    super(meta, input);
    // this.register('method', this.method);
  }

  method() {
   // ...
  }

  // ...
  */
}
```

/your/project/.storybook/preview.ts

```ts
import {
  type WebComponentsPreview,
  definePreview
} from '@storybook/web-components';
import { withDefaults, ProxyProvider } from 'commons/esm/.storybook/preview.js';
import { mergeConfig } from 'commons/esm/.storybook/utils/functions.js';

// Optionally extend with your own implementation:
import { MetaProxy } from './meta.ts';

class WebComponentsProxyProvider<
  TPreview extends PreviewApi
> extends ProxyProvider<TPreview, WebComponentsPreview<TPreview>> {
  /*
  constructor(meta, input) {
    super(meta, input);
    // this.register('method', this.method);
  }

  protected override meta<TInput>(input: TInput) {
    return new MetaProxy(this.preview.meta(input), input);
  }

  method() {
   // ...
  }

  // ...
  */
}

export default {
  ...withDefaults((defaults) => {
    const preview = definePreview(
      mergeConfig(defaults, {
        // ...
      })
    );
    return WebComponentsProxyProvider(preview).instance;
  })
};
```

/your/project/src/MyComponent/Secondary.story.ts

```ts
import preview from '.storybook/preview';
import type { Props } from './MyComponent';
import primaryMeta from './Primary.story';

const meta = preview.type<{ args: Props }>().meta({
  ...primaryMeta.extend({
    // ...overrides
  }),
  title: 'Component/MyComponent/Secondary'
});

interface Args extends Props {
  // overrides
}

export const Default = meta.type<{ args: Args }>;
story({
  // ...
});
```

##### [Addons](.storybook/addons/README.md)

##### Test Runner

1. Create your own config:

   See [source](.storybook/test-runner-jest.config.ts)

   /your/project/.storybook/test-runner-jest.config.ts

   ```ts
   import commonConfig from 'commons/esm/.storybook/test-runner-jest.config.js';

   export default {
     ...commonConfig
     // your overrides
   };
   ```

2. Add scripts to /your/project/package.json

   ```json
   {
     "scripts": {
       "test": "yarn g:test-storybook --index-json"
     }
   }
   ```

##### Vitest

1. Add a [Vitest](#vite-1) root config.

2. Create your own config:

   See [source](.storybook/vitest.config.ts)

   /your/project/.storybook/vitest.config.ts

   ```ts
   import { mergeConfig } from 'vitest/config';
   import commonConfig from 'commons/esm/.storybook/vitest.config.js';

   import viteConfig from './vite.config.ts';
   import vitestConfig from '../vitest.config.ts';

   export default mergeConfig(
     vitestConfig,
     mergeConfig(commonConfig, viteConfig)
   );
   ```

3. Setup workspaces inside your root config:

   /your/project/vitest.config.ts

   ```ts
   import { mergeConfig } from 'vitest/config';
   import commonConfig from 'commons/esm/vitest.config.js';

   import viteConfig from './vite.config.ts';

   export default mergeConfig(mergeConfig(commonConfig, viteConfig), {
     test: {
       workspaces: [
         '.storybook/vitest.config.ts'
         /* 
        {
          extends: true,
          test: {
            // ...
          }
        }
        */
       ]
     }
   });
   ```

### Plugins

#### Sass

##### Node Importers

Add your importers to [node-sass-importers.cts](node-sass-importers.cts) and import the script (e.g. `const sassOptions = { importers: require('common/cjs/node-sass-importers.cjs') };`) as part of your tool config. You also create your own importers. See API [docs](https://sass-lang.com/documentation/js-api/).
