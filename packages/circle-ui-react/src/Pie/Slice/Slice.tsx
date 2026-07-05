import { useContext, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { getEndAngle } from '@psychobolt/circle-ui-elements/utils/functions.js';

import { type Props as SectorProps, Sector as Base } from 'Sector';
import styles from 'Sector/Sector.module.scss';
import { Context } from 'Pie/Context';
import { isNumber } from '../functions';

export type Props = Omit<SectorProps, 'innerRadius' | 'outerRadius'>;

export function Slice({ value = 90, ...props }: Props) {
  const api = useContext(Context);

  if (!api) throw new Error('Slice must be used within a Pie.');

  const { useIndex, batchUpdate } = api;
  const i = useIndex();
  const contextAngle = api.startAngle[i];
  const startAngle = useMemo(
    () => ({
      ...(i === 0 ? { [i]: props.startAngle ?? 0 } : {}),
      [i + 1]: getEndAngle(props.startAngle ?? contextAngle ?? 0, value)
    }),
    [i, props.startAngle, contextAngle, value]
  );

  useEffect(() => {
    batchUpdate({ startAngle });
  }, [batchUpdate, startAngle]);

  if (!isNumber(contextAngle)) return;

  return (
    <Base
      {...props}
      className={classNames(styles.top, styles.objectFill, props.className)}
      innerRadius={api.innerRadius}
      value={value}
      startAngle={props.startAngle ?? contextAngle}
      data-slice-index={i}
    />
  );
}
