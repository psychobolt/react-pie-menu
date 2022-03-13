const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const isClass = require('is-class');
const slash = require('slash');

const isTreeLike = input => input && !_.isFunction(input) && !_.isString(input) && !isClass(input);

function flatten(tree, dir = __dirname) {
  if (_.isArray(tree)) return tree.map(pattern => flatten(pattern, path.resolve(dir, pattern)));
  if (isTreeLike(tree)) {
    return Object.entries(tree).reduce((paths, [current, patterns]) => {
      const directory = current === 'default' ? dir : path.resolve(dir, current);
      return paths.concat(isTreeLike(patterns) ? flatten(patterns, directory) : directory);
    }, []);
  }
  return slash(dir);
}

const indexRE = /\/index\.cjs$/;

module.exports.getStories = (patterns, dir = __dirname) => patterns.reduce((result, pattern) => {
  let paths = [];
  glob.sync(path.resolve(dir, pattern)).forEach(storyPath => {
    let cwd;
    let m = null;
    if (storyPath.match(indexRE)) {
      m = require(storyPath); // eslint-disable-line global-require,import/no-dynamic-require
      cwd = storyPath.replace(indexRE, '');
    } else {
      cwd = storyPath;
    }
    paths = paths.concat(flatten(m, cwd));
  });
  return result.concat(paths);
}, []);
