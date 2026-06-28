import {
  type RefObject,
  type Dispatch,
  type SetStateAction,
  useRef,
  useLayoutEffect,
  useEffect,
  useState
} from 'react';

export type EventName = keyof EventHandlers extends `on${infer Suffix}`
  ? Suffix
  : never;

type EventHandlers = Pick<
  GlobalEventHandlers,
  `on${string}` & keyof GlobalEventHandlers
>;

export type NativeEventHandler<T extends EventName> = OmitThisParameter<
  NonNullable<EventHandlers[`on${T}`]>
>;

export function useUserEventCallback<
  TElement extends Element | Document | null,
  T extends EventName
>(
  ref: RefObject<TElement>,
  type: T,
  eventHandler?: NativeEventHandler<T> | null
) {
  const callback = useRef(eventHandler);
  useLayoutEffect(() => {
    callback.current = eventHandler;
  }, [eventHandler]);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof callback.current !== 'function') return;
    const eventListener: EventListener = (e) =>
      (callback.current as EventListener)(e);
    el.addEventListener(type, eventListener);
    return () => el.removeEventListener(type, eventListener);
  }, [ref, type]);
}

export function useControllableState<S>(
  initialState: S | (() => S),
  value?: S
): [S, Dispatch<SetStateAction<S>>] {
  const action = useState<S>(initialState);
  const [state, setState] = action;
  const controlled = value !== undefined;

  if (controlled && state !== initialState) {
    setState(initialState);
  }

  if (controlled) {
    return [value, () => {}];
  }

  return action;
}
