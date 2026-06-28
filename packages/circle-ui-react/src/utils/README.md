# Utils

## [Functions](functions.ts)

### Is Class Component

```tsx
const Component = () => <></>;

const result = isClassComponent(Component); // returns false
```

Returns `true` if the component extends React.Component class.

## [Hooks](hooks.ts)

### useUserEventCallback

```tsx
function MyComponent() {
  const el = useRef<HTMLDivElement>(null);
  useUserEventCallback(el, 'pointerdown', handler ?? console.log);

  const div = <div ref={el} />;
  // ...
}
```

Attach native event listeners on a element.

### useControllableState

```tsx
function MyComponent(props: Props) {
  const [active, setActive] = useControllableState(false, props.active);
  // ...
}
```

Alternative to `useState` that supports controlled and uncontrolled usage.

When a controlled value is provided, local state is reset and the controlled value is returned instead. Subsequent state updates are ignored.
