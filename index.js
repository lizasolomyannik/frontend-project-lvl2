import getDiff from './src/index.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';

const genDiff = (filepath1, filepath2, formatter) => {
  if (formatter === 'plain') {
    return plain(getDiff(filepath1, filepath2));
  }
  if (formatter === 'json') {
    return JSON.stringify(getDiff(filepath1, filepath2));
  }
  return stylish(getDiff(filepath1, filepath2));
};

export default genDiff;
