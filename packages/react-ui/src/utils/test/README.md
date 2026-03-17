# Utils

Utilities used for Storybook and tests.

> **Do not include shared API for library.** Instead, hoist to `../src/utils`.

## [Functions](functions.ts)

### userEventSession

`const user = userEventSession(options);`

Exposes a API wrapper for triggering user events in the browser. See [docs](https://testing-library.com/docs/user-event/intro) for more info. Refer to official implementation for available [options](https://testing-library.com/docs/user-event/options) and functions.

> Note this only works with Storybook `play` tests. For anything else, use `userEvent.setup` from `@testing-libary/user-event`.
