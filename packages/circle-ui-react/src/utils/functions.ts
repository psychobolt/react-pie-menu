import type { ComponentClass, ComponentType } from 'react';

export const isClassComponent = <P>(
  component: ComponentType<P>
): component is ComponentClass<P> =>
  typeof component === 'function' &&
  Boolean(component.prototype?.isReactComponent);
