# React Pie Menu

[![npm](https://img.shields.io/npm/v/react-pie-menu.svg)](https://www.npmjs.com/package/react-pie-menu)
[![Build Status](https://travis-ci.org/psychobolt/react-pie-menu.svg?branch=master)](https://travis-ci.org/psychobolt/react-pie-menu)
[![codecov](https://codecov.io/gh/psychobolt/react-pie-menu/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-pie-menu)

[![Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu.svg)](https://david-dm.org/psychobolt/react-pie-menu)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/dev-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/peer-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=peer)

A configurable radial menu for React.

## Notes

- Since the release of version 0.2.0, inline css styles is deprecated in favor of CSS-in-JS. To understand benefits and usage, visit [styled-components](https://www.styled-components.com/)'s documentation.

- For older docs, refer to [0.1.x](https://github.com/psychobolt/react-pie-menu/tree/0.1.11) tree.

## Install

> Recommended: React and React-DOM 16.x

```sh
npm install --save styled-components react-pie-menu
# or
yarn add styled-components react-pie-menu
```
## Example

[DEMOS](https://psychobolt.github.io/react-pie-menu/)

### Basic Usage

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

## Components

### PieMenu

```jsx
<div class="container" centerX centerY radius {..attrs}>
  <ul class="list" radius>
    <li class="item" startAngle endAngle skew centralAngle></li>
    ...
  </ul>
  <Center centerRadius={centerRadius} />
</div>
```

- Props
  - radius: ```'150px'```
  - centerX: ```'100px'```
  - centerY: ```'100px'```
  - centerRadius: ```'30px'```
  - Center: [PieCenter](#PieCenter)
  - attrs: {} - Custom attributes added to the container DOM element
- Styles
  - [container](src/PieMenu.style.js)
  - [list](src/PieMenu.style.js)
  - [item](src/PieMenu.style.js)
  - [center](#PieCenter)

#### PieCenter

- Props
  - centerRadius
- [Style](src/PieMenu.style.js)

### Slice

```html
<div class="container" radius centralAngle centralRadius contentHeight {..attrs}>
  <div class="content-container">
    <div class="content">{children}</div>
  </div>
</div>
```

- Props
  - contentHeight: ```'2em'```
  - onMouseUp: ```() => {}```
  - onMouseOver: ```() => {}```
  - onSelect: ```() => {}```
  - attrs: {} - Custom attributes added to the container DOM element
- Styles
  - [container](src/Slice/Slice.style.js)
  - [contentContainer](src/Slice/Slice.style.js)
  - [content](src/Slice/Slice.style.js)

### Contexts

By default the [Slice](#Slice) component inherits properties from [PieMenu](#PieMenu) globally:

#### propTypes
  - ```radius: string``` - [PieMenu](#PieMenu)'s radius
  - ```centerRadius: string``` - [PieCenter](PieCenter)'s center radius
  - ```centralAngle: number``` - Angle for every slice or 360 / (number of slices)
  - ```polar: boolean``` - If true, the library detects that there is at most 2 slices

Additionally, the [Slice](#Slice) component inherits calculated local properties from [PieMenu](#PieMenu):

#### itemTypes
  - ```startAngle: number``` - A uniform offset angle
  - ```endAngle: number``` - Target location angle
  - ```skew: number``` - Number to skew the rectangle container which adjusts tip angle of the slice (e.g. 90 - centralAngle). This is a CSS trick. See [references](#Reference), for details.

### Styling

Style Pie Menu [components](#Components) with ThemeProvder component
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

Also check out demos for [examples](stories).

## Reference
https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
https://stackoverflow.com/questions/14184494/segments-in-a-circle-using-css3
