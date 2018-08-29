# React Pie Menu

[![npm](https://img.shields.io/npm/v/react-pie-menu.svg)](https://www.npmjs.com/package/react-pie-menu)
[![Build Status](https://travis-ci.org/psychobolt/react-pie-menu.svg?branch=master)](https://travis-ci.org/psychobolt/react-pie-menu)
[![codecov](https://codecov.io/gh/psychobolt/react-pie-menu/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-pie-menu)

[![Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu.svg)](https://david-dm.org/psychobolt/react-pie-menu)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/dev-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/peer-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=peer)

A configurable radial menu for React.

## Release Notes

- Since the release of version 0.2.x, inline css styles is deprecated in favor of CSS-in-JS. To understand benefits and usage, visit [styled-components](https://www.styled-components.com/)'s documentation.

- For older docs, refer to the [0.1.x](https://github.com/psychobolt/react-pie-menu/tree/0.1.11) tree.

## Install

> Recommended: React and React-DOM 16.x

```sh
npm install --save styled-components react-pie-menu
# or
yarn add styled-components react-pie-menu
```
## Examples

There are several [demos](https://psychobolt.github.io/react-pie-menu/). Also check out their [sources](stories). Here is one to get you started:

```jsx
import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default ({ x, y }) => (
  <PieMenu 
    radius='125px' 
    centerRadius='30px'
    centerX={x}
    centerY={y}
  >
    {/* Contents */}
    <Slice><FontAwesomeIcon icon="home" size="2x" /></Slice>
    <Slice onSelect={() => window.open('https://www.facebook.com', '_blank')}>
      <FontAwesomeIcon icon="facebook-f" size="2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.twitter.com', '_blank')}>
      <FontAwesomeIcon icon="twitter" size="2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.linkedin.com', '_blank')}>
      <FontAwesomeIcon icon="linkedin-in" size="2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://github.com/psychobolt/react-pie-menu', '_blank')}>
      <FontAwesomeIcon icon="github" size="2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://en.wikipedia.org/wiki/RSS', '_blank')}>
      <FontAwesomeIcon icon="rss" size="2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.pinterest.com/', '_blank')}>
      <FontAwesomeIcon icon="pintrest" size="2x" />
    </Slice>
    <Slice><FontAwesomeIcon icon="asterisk" size="2x" /></Slice>
  </PieMenu>
);
```

The code will display a 125 pixel radial menu with 8 slices and a 30 pixel radial center. Each slice is configured to open a url when selected.

## Components

For configuration of Components, see bellow.

### PieMenu

Inner elements:

```jsx
<div class="container" centerX centerY radius {..attrs}>
  <ul class="list" radius>
    <li class="item" startAngle endAngle skew centralAngle></li>
    ...p
  </ul>
  <Center centerRadius={centerRadius} />
</div>
```

#### Props

##### `radius?: string`

Defines pie menu's radius in CSS Unit. For example, `150px`.
`
##### `centerX?: string`

Defines the position of the pie menu in CSS Unit. For example, `0px` will be left-most position of its parent container.

##### `centerY?: string`

Defines the position of the pie menu in CSS Unit. For example, `0px` will be the top-most position of its parent container.

##### `centerRadius?: string`

Defines the center radius. For example, `30px` or `0` (no center). This prop is forwarded to the Center Component.

##### `startOffsetAngle?: number`

Offsets the starting slice. By default, the first slice's tip is facing north position (0 degrees).

##### `Center?: React.ComponentType<T>`

You can provide your own React Component to be the Center (by default [PieCenter](#piecenter)). You may also `import` PieCenter as a Component.

##### `attrs?: {}`

You can add custom attributes by specifying in `attrs`. For example, `{ resize: 'false' }`.

### PieCenter

You can define your own center by importing the Component. For example:

```jsx
import { PieCenter } from 'react-pie-menu';

export default (props) => (
  <PieMenu centerRadius={props.centerRadius || '30px'}>
    { /* my content */}
  </PieMenu>
);
```

#### Props

##### `centerRadius?: string`

Same as Pie Menu. If you define your own center, you can specify your own value instead.

### Slice

Inner elements:

```html
<div class="container" radius centralAngle centralRadius contentHeight {..attrs}>
  <div class="content-container">
    <div class="content">{children}</div>
  </div>
</div>
```

#### Props

##### `contentHeight?: string`

Height of the content in CSS Size. This prop is used to center the content between top and bottom of the slice. For example, `2em`.

##### `onMouseUp?: (e: SyntheticMouseEvent<T>) => void`

Callback when mouse up event is triggered.

##### `onMouseOver?: (e: SyntheticMouseEvent<T>) => void`

Callback when mouse over event is triggerd

##### `onSelect: (e: SyntehticMouseEvent<T>) => void`

Callback when slice is selected. This event is chained from a mouse up event.

##### `attrs: {}`

You can add custom attributes by specifying in `attrs`. For example, `{ enabled: 'true' }`.

### Contexts

PieMenu supplies [context](https://reactjs.org/docs/context.html) props for child elements.

#### propTypes

By default the [Slice](#slice) Component inherits properties from [PieMenu](#piemenu) globally:
  
##### `radius: string`

[PieMenu](#piemenu)'s radius

##### `centerRadius: string`

[PieCenter](#piecenter)'s center radius

##### `centralAngle: number`

Computed angle for every slice (360 / # number of slices). Calculated internally.

##### `polar: boolean`

If true, the library detects that there is at most 2 slices.

#### itemTypes

Additionally, the [Slice](#slice) Component inherits calculated local properties from [PieMenu](#piemenu):

##### `startAngle: number`

Uniform offset angle.

##### `endAngle: number` 

Target location angle

##### `skew: number`

Number to skew the rectangle container which adjusts tip angle of the slice (e.g. 90 - centralAngle). This is a CSS trick. See  [references](#reference), for details.

### Styling

Style Pie Menu [Components](#components) with ThemeProvder component
```jsx
import React from 'react';
import { ThemeProvder, css } from 'styled-components';

import MyCustomPie from './MyCustomPie';

const theme = {
  pieMenu: {
    container: css`
      // style color...
    `,
    list: css`
      // set pie size...
    `,
    item: css`
      // rotate slice...
    `,
    center: css`
      // style color...
    `;
  },
  slice: {
    container: css`
      // style color...
    `,
    contentContainer: css`
      // center content...
    `,
    content: css`
      // rotate content...
    `,
  }
}

export default () => (
  <ThemeProvider theme={theme}>
    <MyCustomPie />
  </ThemeProvider>
);
```

Refer to default styles from source files:
- [PieMenu & PieCenter](src/PieMenu.style.js)
- [Slice](src/Slice/Slice.style.js)

## Reference
https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
https://stackoverflow.com/questions/14184494/segments-in-a-circle-using-css3
