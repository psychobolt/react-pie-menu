// @flow
import * as React from 'react';
import { isFragment, isElement } from 'react-is';
import { compose, withProps, withContext, getContext } from 'recompose';
import { connectTheme } from 'styled-components-theme-connector';
import rafSchedule from 'raf-schd';
import Hashids from 'hashids';

import { itemTypes, propTypes, type Context } from './Slice';

const hashids = new Hashids();

const List = connectTheme('pieMenu.list')('ul');

const Item = compose(
  withContext(
    itemTypes,
    ({ startAngle, endAngle, skew, active }) => ({ startAngle, endAngle, skew, active }),
  ),
  connectTheme('pieMenu.item'),
)('li');

export const PieCenter: any = connectTheme('pieMenu.center')('div');

const getSlices = (child, index) => {
  let slices = [];
  if (isFragment(child)) {
    React.Children.forEach(child.props.children, (slice, i) => {
      slices = [...slices, ...getSlices(slice, index + i)];
    });
  } else if (isElement(child)) {
    return [{
      itemId: `slice_${hashids.encode(new Date().getTime() + index)}`,
      slice: child,
    }];
  }
  return slices;
};

const computeSlices = compose(
  withProps(({ children }) => {
    let slices = [];
    let index = 0;
    React.Children.forEach(children, (child, i) => {
      slices = [
        ...slices,
        ...getSlices(child, index + i),
      ];
      index = Math.max(0, slices.length - 1);
    });
    return { slices };
  }),
  withContext(propTypes, ({
    slices,
    radius = '150px',
    centerRadius = '50px',
  }: { slices: any[] } & Context) => {
    const centralAngle = 360 / slices.length || 360;
    const polar = centralAngle % 180 === 0;
    return { radius, centerRadius, centralAngle, polar };
  }),
  getContext(propTypes),
);

const inputMoveEvents = ['touchmove', 'mousemove'];
const selectEvents = ['mouseup', 'touchend'];

type EventType = MouseEventTypes & TouchEventTypes;
type EventListener = MouseEventListener | TouchEventListener;

const bindEvents = (events, listener) => events
  .forEach(event => document
    // $FlowFixMe
    .addEventListener(event, listener, { pasive: false, cancelable: true, capture: true }));

const unbindEvents = (events, listener) => events
  // $FlowFixMe
  .forEach(event => document.removeEventListener(event, listener));

type Props = {
  className: string,
  slices: [{ itemId: string, slice: React.Node[] }],
  startOffsetAngle: number,
  Center: any,
  attrs: {},
  children: React.Node,
} & Context;

const PieMenu = ({
  className,
  radius,
  centerRadius,
  centralAngle,
  startOffsetAngle = 0,
  polar,
  Center = PieCenter,
  slices,
  attrs = {},
}: Props) => {
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  const isMounted = React.useRef(false);
  const [activeSlice, setActiveSlice] = React.useState(null);
  React.useEffect(() => {
    isMounted.current = true;
    const captureActiveSlice = rafSchedule(e => {
      if (!isMounted.current) return;
      const x = e.pageX || (e: TouchEvent).touches && e.touches[0].clientX;
      const y = e.pageY || (e: TouchEvent).touches && e.touches[0].clientY;
      if (x > -1 && y > -1) {
        const slice = document.elementFromPoint(x, y);
        const item = slice && slice.closest('li');
        if (item && item.id) {
          setActiveSlice(item.id);
          return;
        }
        setActiveSlice(null);
      }
    });
    const selectActiveSlice = (e: MouseEvent) => {
      if (!isMounted.current) return;
      setActiveSlice(id => {
        if (!id) return null;
        const item = document.getElementById(id);
        if (item && item.childNodes.length) (item.childNodes[0]: any).click(e);
        return null;
      });
    };
    bindEvents(inputMoveEvents, captureActiveSlice);
    bindEvents(selectEvents, selectActiveSlice);
    return () => {
      isMounted.current = false;
      unbindEvents(inputMoveEvents, captureActiveSlice);
      unbindEvents(selectEvents, selectActiveSlice);
    };
  }, []);
  return (
    <div {...attrs} className={className}>
      <List radius={radius}>
        {slices.map(({ itemId, slice }, i) => (
          <Item
            id={itemId}
            key={itemId}
            data-id={itemId}
            active={activeSlice === itemId}
            startAngle={startAngle}
            endAngle={centralAngle * i}
            skew={polar ? 0 : deltaAngle}
            centralAngle={centralAngle}
          >
            {slice}
          </Item>
        ))}
      </List>
      <Center centerRadius={centerRadius} />
    </div>
  );
};

export default (compose(
  computeSlices,
  connectTheme('pieMenu.container'),
)(PieMenu): React.AbstractComponent<Props>);
