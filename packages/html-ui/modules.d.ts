declare module 'commons/esm/.storybook/utils/story-generators.js' {
  import type { StoryPseudoStateProps as DefaultStoryPseudoStateProps } from 'commons/esm/.storybook/utils/story-generators.d.ts';

  export * from 'commons/esm/.storybook/utils/story-generators.d.ts';

  export interface DirectiveResult {
    values: Array<{ [key: string]: string }>;
  }

  export interface StoryPseudoStateProps extends DefaultStoryPseudoStateProps {
    storyAttr?: DirectiveResult;
  }
}
