# Workflows

## Integration

This project contains several default configurations to help you setup CI testing and deployment. Before you begin, make sure to configure some essential environments.

### Turbo

Follow one of the [CI guides](https://turbo.build/repo/docs/ci) on setting up environment variables for your CI

### Chromatic

1. Follow [instructions](https://www.chromatic.com/docs/setup) on creating a Chromatic project
2. Create a `.env` file if not exist in `packages/your-package`
3. Add `CHROMATIC_PROJECT_TOKEN=your-project-token` to `packages/your-package/.env`

### Vercel

Follow [Vercel's guide](https://vercel.com/docs/getting-started-with-vercel) on setting up your deployments to Vercel's dashboard.

## Syncing With Original Fork

Occasionally it may be good to keep up to date with the latest enhancements of `vite-storybook-boilerplate`. You can add new remote to merge with:

```sh
git remote add base https://github.com/psychobolt/vite-storybook-boilerplate.git
```

Anytime there are new updates, run:

```sh
git fetch base
git merge base/main [--squash]
git add .                                # after resolving any conflicts
git commit -m "upgrading infrastructure" # your comment
git push
```
