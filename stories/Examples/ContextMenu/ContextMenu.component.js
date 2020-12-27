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

const MOUSE_RIGHT_CODE = 3;

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

  onContextMenu = e => {
    e.preventDefault();
  }

  onMouseDown = e => {
    if (e.nativeEvent.which === MOUSE_RIGHT_CODE) {
      this.setState({
        mouseX: `${e.pageX}px`,
        mouseY: `${e.pageY}px`,
        showMenu: true,
      });
    }
  }

  onMouseUp = e => {
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
        {showMenu && (
          <PieMenu
            radius="125px"
            centerRadius="30px"
            centerX={mouseX}
            centerY={mouseY}
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
