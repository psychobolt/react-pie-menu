# React Pie Menu

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/react-pie-menu)
[![Build Status](https://travis-ci.org/psychobolt/react-pie-menu.svg?branch=master)](https://travis-ci.org/psychobolt/react-pie-menu)
[![Dependencies Status](https://david-dm.org/psychobolt/react-pie-menu.svg)](https://david-dm.org/psychobolt/react-pie-menu)
[![codecov](https://codecov.io/gh/psychobolt/react-pie-menu/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-pie-menu)

A configurable radial context menu for React.

## Install

```sh
npm install --save react-pie-menu
# or
yarn add react-pie-menu
```
## Example

[DEMO](https://psychobolt.github.io/react-pie-menu/)

```jsx
import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';

export class PieMenuContainer extends React.Component {
  render() {
    const { mouseX, mouseY } = this.props;
    return (
      <PieMenu 
        width='250px' 
        height='250px' 
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
  }
}
```

## Props

### PieMenu

- width: ```'300px'```
- height: ```'300px'```
- centerX: ```'100px'```
- centerY: ```'100px'```
- centerRadius: ```'60px'```
- centerStyle: ```{ background: '#00ff00 url("smiley.gif") no-repeat fixed center'  }```

### Slice

- containerStyle
- focusStyle
- contentStyle
- onSelect
- onMouseUp
- onMouseOver


## Reference

https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
https://stackoverflow.com/questions/14184494/segments-in-a-circle-using-css3
