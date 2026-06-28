import {
  type ComponentProps,
  useState,
  useRef,
  useLayoutEffect,
  useId,
  useMemo
} from 'react';
import classNames from 'classnames';
import {
  type Sector as SectorProps,
  computeSectorPath,
  getEndAngle,
  getMidpoint
} from '@psychobolt/circle-ui-elements/utils/functions.js';

import { useControllableState } from 'utils/hooks';
import styles from './Sector.module.scss';

export interface Props extends SectorProps, ComponentProps<'div'> {
  /**
   * A `className` to apply when the Sector is `active`
   * @default active
   */
  activeClassName?: string;
  active?: boolean;
}

const { active } = styles;

/**
 * Renders a [Sector](https://next--69a65f257a10176f943035ff.chromatic.com/?path=/docs/elements-sector--docs) element. All other props are forwarded.
 */
export function Sector({
  innerRadius = 0,
  value = 90,
  startAngle = 0,
  endAngle,
  ref,
  className,
  activeClassName = active,
  style,
  active: activeProp,
  onPointerEnter,
  onPointerLeave,
  children,
  ...props
}: Props) {
  const internalRef = useRef<HTMLDivElement>(null);
  const [active, setActiveState] = useControllableState(false, activeProp);
  const [scale, setScale] = useState(0);

  innerRadius = scale * innerRadius;

  useLayoutEffect(() => {
    if (!internalRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(1 / entry.contentRect.width);
    });
    observer.observe(internalRef.current);
    return () => observer.disconnect();
  }, []);

  const internalId = useId();
  const id = props.id ?? internalId;
  const pathId = `${id}__path`;
  const path = useMemo(
    () => computeSectorPath({ innerRadius, value, startAngle }),
    [innerRadius, value, startAngle]
  );
  const [midX, midY] = useMemo(
    () =>
      getMidpoint({
        innerRadius,
        startAngle,
        endAngle: endAngle ?? getEndAngle(startAngle, value)
      }),
    [innerRadius, startAngle, endAngle, value]
  );

  return (
    <>
      <svg width='0' height='0' style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={pathId} clipPathUnits='objectBoundingBox'>
            <path d={path} />
          </clipPath>
        </defs>
      </svg>
      <div
        {...props}
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(el);
            } else {
              ref.current = el;
            }
          }
          internalRef.current = el;
        }}
        id={id}
        className={classNames(
          styles.sector,
          className,
          active && activeClassName
        )}
        style={{
          ['--slice-offset-left' as any]: `${midX * 100}%`,
          ['--slice-offset-top' as any]: `${midY * 100}%`,
          clipPath: `url(#${pathId})`,
          ...style
        }}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          setActiveState(activeProp ?? true);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setActiveState(activeProp ?? false);
        }}
      >
        {children}
      </div>
    </>
  );
}
