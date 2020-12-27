import React from 'react';

const reqExample = require.context('./', true, /^\.\/[\w-]+\/index\.js$/);
const reqReadme = require.context('./', true, /^\.\/[\w-]+\/README\.mdx?$/);

export default {
  title: 'Examples',
};

reqExample.keys().forEach(folder => {
  const name = folder.match(/^\.\/([\w-]+)\/index\.js$/)[1];
  const { default: Component } = reqExample(folder);
  const readmePath = reqReadme.keys().find(path => path.indexOf(name) > -1);
  module.exports[name] = () => <Component />;
  module.exports[name].parameters = {
    docs: {
      page: readmePath ? reqReadme(readmePath).default : null,
    },
  };
});
