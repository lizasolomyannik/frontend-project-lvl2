import _ from 'lodash';
import parseFile from './parsers.js';

const getDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const merged = { ...file1, ...file2 };
  let result = {};
  const allKeys = _.sortBy(Object.keys(merged));
  allKeys.forEach((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        result[key] = file1[key];
      } else {
        result[`- ${key}`] = file1[key];
        result[`+ ${key}`] = file2[key];
      }
    } else if (_.has(file1, key) && (_.has(file2, key)) === false) {
      result[`- ${key}`] = file1[key];
    } else {
      result[`+ ${key}`] = file2[key];
    }
  });
  result = JSON.stringify(result, undefined, ' ');
  return result.replace(/["']/g, '');
};

export default getDiff;
