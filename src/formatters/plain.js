import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return String(data);
};

const plain = (data) => {
  const iter = (node, prevKey = '') => {
    const name = node.keyName;
    const nodeType = node.type;
    const fullName = prevKey ? `${prevKey}.${name}` : `${name}`;
    if (nodeType === 'deleted') {
      return `Property '${fullName}' was removed`;
    }
    if (nodeType === 'added') {
      return `Property '${fullName}' was added with value: ${stringify(node.value2)}`;
    }
    if (nodeType === 'changed') {
      return `Property '${fullName}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    }
    if (nodeType === 'nested') {
      const arr = node.children.flatMap((child) => iter(child, fullName));
      return `${arr.join('\n')}`;
    }
    return [];
  };
  const resultArray = data.flatMap((node) => iter(node));
  const resultString = `${resultArray.join('\n')}`;
  return resultString;
};

export default plain;
