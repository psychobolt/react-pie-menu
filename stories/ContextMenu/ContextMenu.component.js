import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';

import PieMenu, { Slice } from 'src';
import './style.css';
import logo from './logo.svg';

const MOUSE_RIGHT_CODE = 3;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = logo;
  }

  onContextMenu = (e) => {
    e.preventDefault();
  }

  onMouseDown = (e) => {
    if (e.nativeEvent.which === MOUSE_RIGHT_CODE) {
      this.setState({
        mouseX: `${e.pageX}px`,
        mouseY: `${e.pageY}px`,
        showMenu: true,
      });
    }
  }

  onMouseUp = (e) => {
    if (e.nativeEvent.which === MOUSE_RIGHT_CODE) {
      this.setState({ showMenu: false });
      e.preventDefault();
    }
  }

  render() {
    const { showMenu, mouseX, mouseY } = this.state;
    return (
      <div
        role="presentation"
        className="App"
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onContextMenu={this.onContextMenu}
      >
        <p className="App-intro">
          Hold right click on anywhere.
        </p>
        <canvas width="300" height="300" ref={ref => { this.canvas = ref; }} />
        {showMenu &&
          <PieMenu
            radius="125px"
            centerRadius="30px"
            centerX={mouseX}
            centerY={mouseY}
          >
            <Slice onSelect={action('Home selected')}>
              <i className="fa fa-home fa-2x" />
            </Slice>
            <Slice onSelect={action('Facebook selected')}>
              <i className="fa fa-facebook fa-2x" />
            </Slice>
            <Slice onSelect={action('Twitter selected')}>
              <i className="fa fa-twitter fa-2x" />
            </Slice>
            <Slice onSelect={action('LinkedIn selected')}>
              <i className="fa fa-linkedin fa-2x" />
            </Slice>
            <Slice onSelect={action('GitHub selected')}>
              <i className="fa fa-github fa-2x" />
            </Slice>
            <Slice onSelect={action('RSS selected')}>
              <i className="fa fa-rss fa-2x" />
            </Slice>
            <Slice onSelect={action('Pinterest selected')}>
              <i className="fa fa-pinterest fa-2x" />
            </Slice>
            <Slice onSelect={action('Asterisk selected')}>
              <i className="fa fa-asterisk fa-2x" />
            </Slice>
          </PieMenu>
        }
      </div>
    );
  }
}

export default App;
