import { within } from 'storybook/test';

import preview from '.storybook/preview';
import { userEventSession } from 'utils/test/functions';
import { Page } from './Page';

const meta = preview.meta({
  title: 'Example/Page',
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  component: Page
});

export default meta;

export const LoggedOut = meta.story();

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn = meta.story({
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', {
      name: /Log in/i
    });
    const user = userEventSession();
    await user.click(loginButton);
  }
});
