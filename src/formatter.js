// import _ from 'lodash';

const getKeyName = (obj) => obj.keyName;
const getKeyType = (obj) => obj.type;
const getKeyValue = (obj, value) => obj[value];

// const stylish = (data) => {
//   const resultArray = data.map((node) => {
//     const name = getKeyName(node);
//     const type = getKeyType(node);
//     if (type === 'deleted') {
//       return `- ${name}: ${stylish(getKeyValue(node, 'value1'))}`;
//     }
//     if (type === 'added') {
//       return `+ ${name}: ${stylish(getKeyValue(node, 'value2'))}`;
//     }
//     if (type === 'unchanged') {
//       return `${name}: ${stylish(getKeyValue(node, 'value'))}`;
//     }
//     if (type === 'changed') {
//       const str1 = `- ${name}: ${stylish(getKeyValue(node, 'value1'))}`;
//       const str2 = `+ ${name}: ${stylish(getKeyValue(node, 'value2'))}`;
//       return `${str1}\n${str2}`;
//     }
//     if (type === 'nested') {
//       return stylish(node.children);
//     }
//     return resultArray;
//   });
//   const resultString = `{\n${resultArray.join('\n')}\n}`;
//   return resultString;
// };

const stylish = (data) => {
  const resultArray = [];
  data.forEach((node) => {
    console.log(node);
    const name = getKeyName(node);
    const type = getKeyType(node);
    switch (type) {
      case 'deleted':
        resultArray.push(`- ${name}: ${stylish(getKeyValue(node, 'value1'))}`);
        break;
      case 'added':
        resultArray.push(`+ ${name}: ${stylish(getKeyValue(node, 'value2'))}`);
        break;
      case 'unchanged':
        resultArray.push(`${name}: ${stylish(getKeyValue(node, 'value'))}`);
        break;
      case 'changed':
        resultArray.push(`- ${name}: ${stylish(getKeyValue(node, 'value1'))}`);
        resultArray.push(`+ ${name}: ${stylish(getKeyValue(node, 'value2'))}`);
        break;
      case 'nested':
        resultArray.push(stylish(node.children));
        break;
      default:
        break;
    }
  });
  const resultString = `{\n${resultArray.join('\n')}\n}`;
  return resultString;
};

export default stylish;
