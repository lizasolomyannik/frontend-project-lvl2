import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);
  const resultArray = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { keyName: key, type: 'added', value2: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { keyName: key, type: 'deleted', value1: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { keyName: key, type: 'nested', children: getDiffTree(obj1[key], obj2[key]) };
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

export default getDiffTree;
