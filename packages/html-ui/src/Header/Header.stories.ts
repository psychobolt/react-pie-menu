import { fn } from 'storybook/test';

import preview from '.storybook/preview';
import { Header } from './Header';

const meta = preview.meta({
  title: 'Components/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args#component-args
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn()
  },
  render: Header
});

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LoggedIn = meta.story({
  args: {
    user: {
      name: 'Jane Doe'
    }
  }
});

export const LoggedOut = meta.story();
