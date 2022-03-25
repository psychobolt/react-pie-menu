# React Pie Menu

[![npm](https://img.shields.io/npm/v/react-pie-menu.svg)](https://www.npmjs.com/package/react-pie-menu)
[![Main workflow](https://github.com/psychobolt/react-pie-menu/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/react-pie-menu/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/react-pie-menu/branch/master/graph/badge.svg?flag=react-pie-menu)](https://codecov.io/gh/psychobolt/react-pie-menu/tree/master/src)

![piemenu_clip1](https://user-images.githubusercontent.com/560721/108241603-de648380-7100-11eb-9b26-40fe98b5d148.gif)

A configurable radial menu for React.

> This README is for the next release 0.3.x. Please see [0.2.x](https://github.com/psychobolt/react-pie-menu/tree/0.2.x).

## Install

> Recommended: React and React-DOM 17.x

```sh
npm install --save styled-components react-pie-menu
# or
yarn add styled-components react-pie-menu
```
## Examples

There are several [demos](https://psychobolt.github.io/react-pie-menu/). Also check out their [sources](stories). Here is one to get you started:

```js
import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ x, y }) => (
  <PieMenu 
    radius="125px"
    centerRadius="30px"
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

```js
<div class="container" centerX centerY {...attrs}>
  <ul class="list" radius>
    <li class="item">{slice}</li>
    ...
  </ul>
  <PieCenter centerRadius />
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

```js
import { PieCenter } from 'react-pie-menu';

export default props => (
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
<div class="container" contentHeight _highlight {...attrs}>
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

##### `onMouseEnter?: (e: SyntheticMouseEvent<T>) => void`

Callback when mouse enter event is triggered.

##### `onMouseOver?: (e: SyntheticMouseEvent<T>) => void`

Callback when mouse over event is triggered.

##### `onSelect: (e: SyntehticMouseEvent<T>) => void`

Callback when slice is selected. This event is chained from a mouse up event.

##### `attrs: {}`

You can add custom attributes by specifying in `attrs`. For example, `{ enabled: 'true' }`.

##### `_highlight: boolean `

Provided by PieMenu when a user input/touch hover a Slice. If true, by default the slice will be highlighted.

## Theme Context

PieMenu supplies contextual values for child elements in the theme's context object. e.g.

```js
import React from 'react';
import { ThemeContext } from 'styled-components';

import Content from './Content.component';

export default props => {
  const { context } = React.useContext(ThemeContext);
  /* returns e.g.
    context = {
      radius,
      centerRadius,
      ...      
    };
  */
  return <Content {...props} {...context} />
};
```

### Context Props
  
#### `radius: string`

[PieMenu](#piemenu)'s radius

#### `centerRadius: string`

[PieCenter](#piecenter)'s center radius

#### `centralAngle: number`

Computed angle for every slice (360 / # number of slices). Calculated internally.

#### `polar: boolean`

If true, the library detects that there is at most 2 slices.

#### Item's Context

##### `startAngle: number`

Uniform offset angle for the current [Slice](#slice).

##### `endAngle: number` 

Target location angle for the current [Slice](#slice).

##### `skew: number`

Number to skew the rectangle container for the current [Slice](#slice), which adjusts tip angle of the slice (e.g. 90 - centralAngle). This is a CSS trick. See  [references](#reference), for details.


##### `active: boolean`

If true, the current Slice is active from mouse/touch over.

### Styling

#### Using Custom Theme CSS

Style Pie Menu [Components](#components) with styled-component's ThemeProvder.
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

#### Utils

##### Style Functions

Useful functions for styling.

###### `background`

For coloring a slice's background

```jsx
// ./Slice.style.js
import { background } from 'react-pie-menu';
import { css } from 'styled-components';

export const slice = css`
  ${background('#ff0000')}
  /* or interpolate from colors scale in a theme */
  ${background('red.100')}
  ${background('tomato')}
`;
```

##### Context Selectors

```js
import { endAngle } from 'react-pie-menu';
import { css } from 'styled-components';

export const content = css`
  transform: rotate(-${endAngle}deg);
`;
```

See available selectors:
- [PieMenu](src/PieMenu.selectors.js)
- [Slice](src/Slice/Slice.selectors.js)

#### Using Style Props

You can use props to provide style values. React Pie Menu uses, as well as extends [Styled System](https://styled-system.com/). See below for available props:

##### PieMenu

None

##### Slice

| Category                                                  | Supported Props       | Added Props
|-----------------------------------------------------------|-----------------------|-----------------
| Text [Color](https://styled-system.com/table#color)       | `color`               | `textHighlight`
| Background [Color](https://styled-system.com/table#color) | `backgroundColor, bg` | `highlight`

Usage:

```js
import { Slice } from 'react-pie-menu';

export default props => <Slice {...props} backgroundColor="red" />
```

## Notable Change Notes

- v0.3.0 introduce the ability to use style props, context props, touch device, and React 17 support.
- v0.2.0 deprecated inline css styles in favor of CSS-in-JS.

## Reference

- https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
- https://stackoverflow.com/questions/14184494/segments-in-a-circle-using-css3
- https://jamesrwilliams.ca/posts/css-wheel-of-fortune
