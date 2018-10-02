import '@storybook/addon-console';
import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes);

const reqMain = require.context('../stories', true, /\.?stories\.js$/);
const reqLib = require.context('../src', true, /\.?stories\.js$/);

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
  reqMain.keys().forEach(filename => reqMain(filename));
  reqLib.keys().forEach(filename => reqLib(filename));
}

configure(loadStories, module);
