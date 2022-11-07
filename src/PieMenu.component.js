// @flow
import * as React from 'react';
import { connectTheme, ThemeContextProvider } from 'styled-components-theme-connector';
import rafSchedule from 'raf-schd';

import { type Context } from './Slice/Slice.component.js';

const List = connectTheme('pieMenu.list')('ul');

const Item = connectTheme('pieMenu.item')('li');

export const PieCenter = (connectTheme('pieMenu.center')('div'): React.ComponentType<any>);

const inputMoveEvents = ['touchmove', 'mousemove'];
const selectEvents = ['mouseup', 'touchend'];

const bindEvents = (events: string[], listener: any) => events
  .forEach(event => document
    .addEventListener(event, listener, { pasive: false, cancelable: true, capture: true }));

const unbindEvents = (events: string[], listener: any) => events
  .forEach(event => document.removeEventListener(event, listener));

type Metadata = {
  className?: string,
  radiusPx: number,
  centerRadiusPx: number,
};

export type Props = {
  containerId: string,
  slices: { itemId: string, slice: React.Element<any> }[],
  startOffsetAngle?: number,
  polar: boolean,
  Center?: React.ComponentType<any>,
  attrs?: {},
} & Context & Metadata;

const PieMenu = ({
  containerId,
  className,
  startOffsetAngle = 0,
  radius,
  centerRadius,
  centralAngle,
  polar,
  Center,
  radiusPx,
  centerRadiusPx,
  slices,
  attrs,
}: Props) => {
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  const ref = React.useRef(null);
  const [activeSlice, setActiveSlice] = React.useState(null);
  const centerArea = centerRadiusPx ** 2;
  const pieArea = radiusPx ** 2;

  const isInsidePie = (x, y) => {
    if (!ref.current) return false;
    const { pageXOffset, pageYOffset } = window;
    const { left: pieX, top: pieY } = ref.current.getBoundingClientRect();
    const distance = (x + pageXOffset - (pieX + pageXOffset) - radiusPx) ** 2
      + (y + pageYOffset - (pieY + pageYOffset) - radiusPx) ** 2;
    return centerArea <= distance && distance <= pieArea;
  };

  const getItemAt = (x: number, y: number) => {
    if (!isInsidePie(x, y)) return null;
    const elements = document.elementsFromPoint(x, y);
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (element.id === 'center') return null;
      if (`${element.id}`.startsWith(`${containerId}_slice_`)) return element;
    }
    return null;
  };

  React.useEffect(() => {
    const captureActiveSlice = rafSchedule((e: MouseEvent & TouchEvent) => {
      if (!ref.current) return;
      const x = (e.pageX !== undefined ? e.pageX : e.touches[0].clientX)
        - window.pageXOffset;
      const y = (e.pageY !== undefined ? e.pageY : e.touches[0].clientY)
        - window.pageYOffset;
      if (x > -1 && y > -1) {
        const item = getItemAt(x, y);
        if (item && item.id) {
          setActiveSlice(item.id);
          return;
        }
        setActiveSlice(null);
      }
    });
    const selectActiveSlice = (e: MouseEvent & TouchEvent) => {
      if (!ref.current) return;
      const x = e.pageX || e.changedTouches[0].clientX;
      const y = e.pageY || e.changedTouches[0].clientY;
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
      {Center ? <Center id="center" centerRadius={centerRadius} /> : null}
    </div>
  );
};

PieMenu.defaultProps = {
  startOffsetAngle: 0,
  Center: PieCenter,
  attrs: {},
};

export default (connectTheme('pieMenu.container')(PieMenu): React.ComponentType<Props>);
