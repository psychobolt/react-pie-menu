const center = {
  position: 'absolute',
  borderRadius: '50%',
  background: 'transparent',
};

export default {
  container: {
    display: 'inline-block',
  },
  nav: {
    position: 'relative',
    display: 'inline-block',
  },
  ul: {
    position: 'relative',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  li: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    transformOrigin: 'bottom right',
    overflow: 'hidden',
  },
  center,
};
