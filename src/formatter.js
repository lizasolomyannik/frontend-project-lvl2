// import _ from 'lodash';

const getKeyName = (obj) => obj.keyName;
const getKeyType = (obj) => obj.type;
const getKeyValue = (obj, value) => obj[value];

const stringify = (data) => {
  const iter = (node, depth) => {
    if (typeof node !== 'object' || node === null) {
      return `${node}`;
    }
    const strArray = Object.entries(node).map(([key, value]) => `${key}: ${iter(value, depth + 1)}`);
    const finalString = strArray.join('');
    return finalString;
  };
  return iter(data, 1);
};

const stylish = (data) => {
  const spacesCount = 4;
  const iter = (node, depth) => {
    const name = getKeyName(node);
    const type = getKeyType(node);
    if (type === 'deleted') {
      return `${' '.repeat(spacesCount * depth - 2)}- ${name}: ${stringify(getKeyValue(node, 'value1'))}`;
    }
    if (type === 'added') {
      return `${' '.repeat(spacesCount * depth - 2)}+ ${name}: ${stringify(getKeyValue(node, 'value2'))}`;
    }
    if (type === 'changed') {
      const str1 = `${' '.repeat(spacesCount * depth - 2)}- ${name}: ${stringify(getKeyValue(node, 'value1'))}`;
      const str2 = `${' '.repeat(spacesCount * depth - 2)}+ ${name}: ${stringify(getKeyValue(node, 'value2'))}`;
      return `${str1}\n${str2}`;
    }
    if (type === 'nested') {
      return node.children.flatMap((child) => `${iter(child, depth + 1)}`);
    }
    return `${' '.repeat(spacesCount * depth - 2)}  ${name}: ${getKeyValue(node, 'value')}`;
  };
  const resultArray = data.flatMap((node) => iter(node, 1));
  const resultString = `{\n${resultArray.join('\n')}\n}`;
  return resultString;
};

// const stylish = (data) => {
//   const resultArray = data.map((node) => {
//     const name = getKeyName(node);
//     const type = getKeyType(node);
//     if (type === 'deleted') {
//       return `  - ${name}: ${getKeyValue(node, 'value1')}`;
//     }
//     if (type === 'added') {
//       return `  + ${name}: ${getKeyValue(node, 'value2')}`;
//     }
//     if (type === 'unchanged') {
//       return `    ${name}: ${getKeyValue(node, 'value')}`;
//     }
//     if (type === 'changed') {
//       const str1 = `  - ${name}: ${getKeyValue(node, 'value1')}`;
//       const str2 = `  + ${name}: ${getKeyValue(node, 'value2')}`;
//       return `${str1}\n${str2}`;
//     }
//     if (type === 'nested') {
//       return `    ${name}: ${stylish(node.children)}`;
//     }
//     return resultArray;
//   });
//   const resultString = `{\n${resultArray.join('\n')}\n}`;
//   return resultString;
// };

export default stylish;
