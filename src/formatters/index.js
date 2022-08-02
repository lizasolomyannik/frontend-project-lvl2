import getDiff from '../index.js';
import stylish from './stylish.js';
import plain from './plain.js';

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
