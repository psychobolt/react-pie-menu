export const UNKOWN_CSS_SELECTOR = '[unknown-css-selector]';

export default new Proxy(
  {},
  {
    get() {
      return UNKOWN_CSS_SELECTOR;
    }
  }
);
