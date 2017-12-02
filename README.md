# React Pie Menu

[![npm](https://img.shields.io/npm/v/react-pie-menu.svg)](https://www.npmjs.com/package/react-pie-menu)
[![Build Status](https://travis-ci.org/psychobolt/react-pie-menu.svg?branch=master)](https://travis-ci.org/psychobolt/react-pie-menu)
[![codecov](https://codecov.io/gh/psychobolt/react-pie-menu/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-pie-menu)

[![Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu.svg)](https://david-dm.org/psychobolt/react-pie-menu)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/dev-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu/peer-status.svg)](https://david-dm.org/psychobolt/react-pie-menu?type=peer)

A configurable radial menu for React.

## Install

```sh
npm install --save react-pie-menu
# or
yarn add react-pie-menu
```
## Example

[DEMOS](https://psychobolt.github.io/react-pie-menu/)

```jsx
import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';

export default ({ mouseX, mouseY }) => (
  <PieMenu 
    radius='125px' 
    centerRadius='30px'
    centerX={mouseX}
    centerY={mouseY}
  >
    {/* Contents */}
    <Slice><i className="fa fa-home fa-2x" /></Slice>
    <Slice onSelect={() => window.open('https://www.facebook.com', '_blank')}>
      <i className="fa fa-facebook fa-2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.twitter.com', '_blank')}>
      <i className="fa fa-twitter fa-2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.linkedin.com', '_blank')}>
      <i className="fa fa-linkedin fa-2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://github.com/psychobolt/react-pie-menu', '_blank')}>
      <i className="fa fa-github fa-2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://en.wikipedia.org/wiki/RSS', '_blank')}>
      <i className="fa fa-rss fa-2x" />
    </Slice>
    <Slice onSelect={() => window.open('https://www.pinterest.com/', '_blank')}>
      <i className="fa fa-pinterest fa-2x" />
    </Slice>
    <Slice><i className="fa fa-asterisk fa-2x" /></Slice>
  </PieMenu>
);
```

## Props

### PieMenu

- radius: ```'150px'```
- centerX: ```'100px'```
- centerY: ```'100px'```
- centerRadius: ```'30px'```
- centerStyle: ```{ background: '#00ff00 url("smiley.gif") no-repeat fixed center'  }```
- contentHeight: ```'2em'```

### Slice

- containerStyle: ```{ background: 'radial-gradient(transparent 30px, rgba(109, 109, 109, 0.925) 30px)' }```
- focusStyle: ```{ color: 'white', background: 'radial-gradient(transparent 30px, #424242 60px)' }```
- contentContainerStyle: ```{ top: '45px' }```
- contentStyle: ```{ color: 'back' }```
- contentHeight: ```'2em'```
- onSelect: ```() => {}```
- onMouseUp: ```() => {}```
- onMouseOver: ```() => {}```


## Reference

https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
https://stackoverflow.com/questions/14184494/segments-in-a-circle-using-css3
