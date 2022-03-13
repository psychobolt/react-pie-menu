import Component from './UserPage.component.js';
import code from './UserPage.component.js?raw'; // eslint-disable-line import/no-unresolved

export const UserPage = Component;

UserPage.parameters = {
  docs: {
    source: {
      code,
    },
  },
};
