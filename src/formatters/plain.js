import _ from 'lodash';

const getKeyName = (obj) => obj.keyName;
const getKeyType = (obj) => obj.type;
const getKeyValue = (obj, value) => obj[value];

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
    const name = getKeyName(node);
    const type = getKeyType(node);
    const fullName = prevKey ? `${prevKey}.${name}` : `${name}`;
    if (type === 'deleted') {
      return `Property '${fullName}' was removed`;
    }
    if (type === 'added') {
      return `Property '${fullName}' was added with value: ${stringify(getKeyValue(node, 'value2'))}`;
    }
    if (type === 'changed') {
      return `Property '${fullName}' was updated. From ${stringify(getKeyValue(node, 'value1'))} to ${stringify(getKeyValue(node, 'value2'))}`;
    }
    if (type === 'nested') {
      const arr = node.children.flatMap((child) => iter(child, fullName));
      return `${arr.join('\n')}`;
    }
    return '';
  };
  const resultArray = data.flatMap((node) => iter(node));
  const resultString = `${resultArray.join('\n')}`;
  return resultString.replace(/(^[ \t]*\n)/gm, '');
};

export default plain;
