import type { ComponentProps } from 'react';
import classNames from 'classnames';

import styles from './Circle.module.scss';

export type Props = ComponentProps<'div'>;

/**
 * Renders a [Circle](https://next--69a65f257a10176f943035ff.chromatic.com/?path=/docs/elements-circle--docs) element. All props are forwarded.
 */
export const Circle = ({ className, children, ...props }: Props) => {
  return (
    <div {...props} className={classNames(styles.circle, className)}>
      {children}
    </div>
  );
};
