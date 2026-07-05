/** @type {import('stylelint').Config} */
export default {
  extends: ['../stylelint-config/esm/stylelint-scss.config'],
  rules: {
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }]
  }
};
