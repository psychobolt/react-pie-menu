// @flow
import * as React from 'react';
import { connectTheme } from 'styled-components-theme-connector';
import rafSchedule from 'raf-schd';

import { type ContextType, Context, ItemContext } from './Slice';

const List = connectTheme('pieMenu.list')('ul');

const Item = connectTheme('pieMenu.item')(({ startAngle, endAngle, skew, active, children, className }) => (
  <ItemContext.Provider value={{ startAngle, endAngle, skew, active }}>
    <li className={className}>{children}</li>
  </ItemContext.Provider>
));

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

function getItemAt(x, y) {
  const elements = document.elementsFromPoint(x, y);
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    if (element.id === 'center') return null;
    if (`${element.id}`.startsWith('slice_')) return element;
  }
  return null;
}

type Props = {
  className: string,
  slices: [{ itemId: string, slice: React.Node[] }],
  startOffsetAngle: number,
  polar: boolean,
  Center: any,
  attrs: {},
  children: React.Node,
} & ContextType;

const PieMenu = ({
  className,
  startOffsetAngle = 0,
  polar,
  Center = PieCenter,
  slices,
  attrs = {},
}: Props) => {
  const { radius, centerRadius, centralAngle } = React.useContext(Context);
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + (centralAngle / 2);
  const isMounted = React.useRef(false);
  const [activeSlice, setActiveSlice] = React.useState(null);
  React.useEffect(() => {
    isMounted.current = true;
    const captureActiveSlice = rafSchedule(e => {
      if (!isMounted.current) return;
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
      if (!isMounted.current) return;
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
      <Center id="center" centerRadius={centerRadius} />
    </div>
  );
};

export default (connectTheme('pieMenu.container')(PieMenu): React.AbstractComponent<Props>);
