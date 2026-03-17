import { vi, beforeEach, afterEach } from 'vitest';

// TODO: remove this when vitest supports PointerEvent.
// See https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/integrations/env/jsdom-keys.ts
class PointerEvent extends MouseEvent {
  readonly width: number;
  readonly height: number;

  constructor(type: string, eventInitDict: PointerEventInit) {
    super(type, eventInitDict);
    this.width = eventInitDict.width ?? 1;
    this.height = eventInitDict.height ?? 1;
  }
}

beforeEach(() => {
  vi.stubGlobal('PointerEvent', PointerEvent);

  vi.stubGlobal('jest', {
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi)
  });

  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
