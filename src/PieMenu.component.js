// @flow
import * as React from 'react';
import { connectTheme, ThemeContextProvider } from 'styled-components-theme-connector';
import rafSchedule from 'raf-schd';

import { type Context } from './Slice/Slice.component';

const List = connectTheme('pieMenu.list')('ul');

const Item = connectTheme('pieMenu.item')('li');

export const PieCenter: any = connectTheme('pieMenu.center')('div');

const inputMoveEvents = ['touchmove', 'mousemove'];
const selectEvents = ['mouseup', 'touchend'];

const bindEvents = (events, listener) => events
  // $FlowFixMe
  .forEach(event => document
    // $FlowFixMe
    .addEventListener(event, listener, { pasive: false, cancelable: true, capture: true }));

const unbindEvents = (events, listener) => events
  // $FlowFixMe
  .forEach(event => document.removeEventListener(event, listener));

type Metadata = {
  radiusPx: number,
  centerRadiusPx: number,
  centerX_Px: number,
  centerY_Px: number,
};

type Props = {
  className: string,
  slices: [{ itemId: string, slice: React.Node[] }],
  startOffsetAngle: number,
  polar: boolean,
  Center: any,
  attrs: {},
  children: React.Node,
} & Context & Metadata;

const PieMenu = ({
  className,
  startOffsetAngle = 0,
  radius,
  centerRadius,
  centralAngle,
  polar,
  Center = PieCenter,
  radiusPx,
  centerRadiusPx,
  slices,
  attrs = {},
}: Props) => {
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  const ref = React.useRef(null);
  const [activeSlice, setActiveSlice] = React.useState(null);
  const centerArea = centerRadiusPx ** 2;
  const pieArea = radiusPx ** 2;

  const isInsidePie = (x, y) => {
    if (!ref.current) return false;
    const { left: pieX, top: pieY } = ref.current.getBoundingClientRect();
    const distance = (x - pieX - radiusPx) ** 2 + (y - pieY - radiusPx) ** 2;
    return centerArea <= distance && distance <= pieArea;
  };

  const getItemAt = (x, y) => {
    if (!isInsidePie(x, y)) return null;
    const elements = document.elementsFromPoint(x, y);
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (element.id === 'center') return null;
      if (`${element.id}`.startsWith('slice_')) return element;
    }
    return null;
  };

  React.useEffect(() => {
    const captureActiveSlice = rafSchedule(e => {
      if (!ref.current) return;
      const x = e.pageX !== undefined ? e.pageX : (e: TouchEvent).touches[0].clientX;
      const y = e.pageY !== undefined ? e.pageY : (e: TouchEvent).touches[0].clientY;
      if (x > -1 && y > -1) {
        const item = getItemAt(x, y);
        if (item && item.id) {
          setActiveSlice(item.id);
          return;
        }
        setActiveSlice(null);
      }
    });
    const selectActiveSlice = e => {
      if (!ref.current) return;
      const x = e.pageX || (e: TouchEvent).changedTouches[0].clientX;
      const y = e.pageY || (e: TouchEvent).changedTouches[0].clientY;
      if (x > -1 && y > -1) {
        const item = getItemAt(x, y);
        if (item && item.childNodes.length) {
          e.preventDefault();
          (item.childNodes[0]: any).click();
        }
      }
    };
    bindEvents(inputMoveEvents, captureActiveSlice);
    bindEvents(selectEvents, selectActiveSlice);
    return () => {
      unbindEvents(inputMoveEvents, captureActiveSlice);
      unbindEvents(selectEvents, selectActiveSlice);
    };
  }, []);

  return (
    <div {...attrs} className={className} ref={ref}>
      <List radius={radius}>
        {slices.map(({ itemId, slice }, i) => (
          <ThemeContextProvider
            key={itemId}
            startAngle={startAngle}
            endAngle={centralAngle * i}
            skew={polar ? 0 : deltaAngle}
            active={activeSlice === itemId}
          >
            <Item
              id={itemId}
              data-id={itemId}
            >
              {slice}
            </Item>
          </ThemeContextProvider>
        ))}
      </List>
      <Center id="center" centerRadius={centerRadius} />
    </div>
  );
};

export default (connectTheme('pieMenu.container')(PieMenu): React.AbstractComponent<Props>);
