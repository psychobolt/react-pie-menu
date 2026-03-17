import { userEvent } from 'storybook/test';
import type { VitestUtils } from 'vitest';

declare global {
  interface Window {
    jest?: {
      advanceTimersByTime: VitestUtils['advanceTimersByTime'];
    };
  }
}

export const userEventSession = (
  options: Parameters<typeof userEvent.setup>[0] = { delay: 10 }
) =>
  userEvent.setup(
    window.jest?.advanceTimersByTime
      ? { ...options, advanceTimers: window.jest.advanceTimersByTime }
      : options
  );
