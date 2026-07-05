import {
  useRef,
  useEffect,
  Children,
  isValidElement,
  cloneElement
} from 'react';

import { type EventName, useUserEventCallback } from 'utils/hooks';
import { type Props as CircleProps, Circle } from 'Circle';
import { type Props as ContextProps, Context, useAPI } from './Context';
import { Slice } from './Slice';

export interface Props extends CircleProps, Omit<ContextProps, 'count'> {
  /**
   * Delegates pointer events from an external container to the active Slice.
   * The format is `"<selector>:<event>"` where `<selector>` is any valid CSS selector or `document`/`body`,
   * and `<event>` is the pointer event that activates the capture.
   * Once fired, subsequent pointer events are routed to the Slice under the pointer.
   */
  onContainer?: `${string}:${EventName}`;
}

/**
 * The Pie component enhances [Circle](/story/components-circle--docs) component with context aware `Pie.Slice` component.
 */
export function Pie({ onContainer, innerRadius, children, ...props }: Props) {
  const container = useRef<Element>(null);
  let [selector, ...pseudoEvents] = onContainer?.split(':') ?? [];
  const eventName = pseudoEvents.pop() ?? 'pointermove';
  selector = [selector, ...pseudoEvents].join(':');
  useEffect(() => {
    if (!selector) return;
    const el = document.querySelector(selector);
    if (!el) return;
    container.current = el;
    return () => {
      container.current = null;
    };
  }, [selector]);

  useUserEventCallback(container, eventName as EventName, (e: Event) => {
    let el = container.current;
    if (!el || !e.isTrusted) return;

    let pointerEvent;
    if (e instanceof PointerEvent) {
      el.setPointerCapture(e.pointerId);
      pointerEvent = { pointerId: e.pointerId };
    }

    let mouseEvent;
    if (e instanceof MouseEvent) {
      el = document.elementFromPoint(e.clientX, e.clientY);
      mouseEvent = {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }

    if (el) {
      const sliceEl = el.closest<HTMLDivElement>('[data-slice-index]');
      if (sliceEl) {
        if (typeof pointerEvent?.pointerId === 'number') {
          sliceEl.setPointerCapture(pointerEvent.pointerId);
        } else {
          sliceEl.dispatchEvent(
            new Event(eventName, {
              bubbles: true,
              ...mouseEvent,
              ...pointerEvent
            })
          );
        }
      }
    }
  });

  return (
    <Circle {...props}>
      <Context value={useAPI({ innerRadius })}>
        {Children.map(children, (child, i) => {
          if (!isValidElement(child) || typeof child.type === 'string') {
            return child;
          }
          return cloneElement(child, { key: child.key ?? `child_${i + 1}` });
        })}
      </Context>
    </Circle>
  );
}

Pie.Slice = Slice;
