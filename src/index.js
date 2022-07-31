import _ from 'lodash';
import parseFile from './parsers.js';
import stylish from './formatter.js';

const nestedDiff = (obj1, obj2) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);
  const resultArray = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { keyName: key, type: 'added', value2: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { keyName: key, type: 'deleted', value1: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { keyName: key, type: 'nested', children: nestedDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        keyName: key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }
    return { keyName: key, type: 'unchanged', value: obj1[key] };
  });
  return resultArray;
};

const getDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const result = nestedDiff(file1, file2);
  // return result;
  return stylish(result);
};

console.log(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

export default getDiff;
