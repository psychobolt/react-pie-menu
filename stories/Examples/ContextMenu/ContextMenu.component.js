import React from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRss, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGithub,
  faPinterest,
} from '@fortawesome/free-brands-svg-icons';
import { action } from '@storybook/addon-actions';

import './style.css';
import logo from './logo.svg';

const EVENT_CODES = [0, 1];

export default class extends React.Component {
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
      ctx.drawImage(img, -50, 0, 400, 300);
    };
    img.src = logo;
  }

  captureStartPosition = e => {
    if (EVENT_CODES.includes(e.nativeEvent.which)) {
      this.setState({
        x: `${e.pageX || e.touches && e.touches[0].clientX}px`,
        y: `${e.pageY || e.touches && e.touches[0].clientY}px`,
        showMenu: true,
      });
    }
  };

  clearPositions = e => {
    if (EVENT_CODES.includes(e.nativeEvent.which)) {
      this.setState({ showMenu: false });
    }
  };

  render() {
    const { showMenu, x, y } = this.state;
    return (
      <div
        role="presentation"
        className="App"
        onTouchStart={this.captureStartPosition}
        onTouchEnd={this.clearPositions}
        onMouseDown={this.captureStartPosition}
        onMouseUp={this.clearPositions}
      >
        <p className="App-intro">
          Touch and hold anywhere.
        </p>
        <canvas width="300" height="300" ref={ref => { this.canvas = ref; }} />
        {showMenu && (
          <PieMenu
            radius="125px"
            centerRadius="30px"
            centerX={x}
            centerY={y}
          >
            <Slice onSelect={action('Home selected')}>
              <FontAwesomeIcon icon={faHome} size="2x" />
            </Slice>
            <Slice onSelect={action('Facebook selected')}>
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </Slice>
            <Slice onSelect={action('Twitter selected')}>
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Slice>
            <Slice onSelect={action('LinkedIn selected')}>
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </Slice>
            <Slice onSelect={action('GitHub selected')}>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Slice>
            <Slice onSelect={action('RSS selected')}>
              <FontAwesomeIcon icon={faRss} size="2x" />
            </Slice>
            <Slice onSelect={action('Pinterest selected')}>
              <FontAwesomeIcon icon={faPinterest} size="2x" />
            </Slice>
            <Slice onSelect={action('Asterisk selected')}>
              <FontAwesomeIcon icon={faAsterisk} size="2x" />
            </Slice>
          </PieMenu>
        )}
      </div>
    );
  }
}
