import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import './App.css';

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
    }
    img.src = 'logo.svg';
  }

  onContextMenu(e) {
    e.preventDefault();
  }

  onMouseDown = (e) => {
    if (e.nativeEvent.which === MOUSE_RIGHT_CODE) {
      this.setState({
        mouseX: `${e.pageX}px`,
        mouseY: `${e.pageY}px`,
        showMenu: true
      });
    }
  }

  onMouseUp = (e) => {
    if (e.nativeEvent.which === MOUSE_RIGHT_CODE) {
      this.setState({showMenu: false});
      e.preventDefault();
    }
  }

  render() {
    const { showMenu, mouseX, mouseY } = this.state;
    return (
      <div 
        className="App" 
        onMouseDown={this.onMouseDown} 
        onMouseUp={this.onMouseUp} 
        onContextMenu={this.onContextMenu}
      >
        <p className="App-intro">
          Hold right click on anywhere.
        </p>
        <canvas width="300" height="300" ref={ref => this.canvas = ref} />
        {showMenu && <PieMenu 
          width='250px' 
          height='250px' 
          centerRadius='30px'
          centerX={mouseX}
          centerY={mouseY}
        >
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
        </PieMenu>}
      </div>
    );
  }
}

export default App;
