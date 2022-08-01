const getKeyName = (obj) => obj.keyName;
const getKeyType = (obj) => obj.type;
const getKeyValue = (obj, value) => obj[value];

const spacesCount = 4;

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return `${data}`;
  }
  const strArray = Object.entries(data).map(([key, value]) => `${' '.repeat(spacesCount * depth + 2)}  ${key}: ${stringify(value, depth + 1)}`);
  const finalString = `{\n${strArray.join('\n')}\n${' '.repeat(spacesCount * depth)}}`;
  return finalString;
};

const stylish = (data) => {
  const iter = (node, depth) => {
    const name = getKeyName(node);
    const type = getKeyType(node);
    if (type === 'deleted') {
      return `${' '.repeat(spacesCount * depth - 2)}- ${name}: ${stringify((getKeyValue(node, 'value1')), depth)}`;
    }
    if (type === 'added') {
      return `${' '.repeat(spacesCount * depth - 2)}+ ${name}: ${stringify((getKeyValue(node, 'value2')), depth)}`;
    }
    if (type === 'changed') {
      const str1 = `${' '.repeat(spacesCount * depth - 2)}- ${name}: ${stringify((getKeyValue(node, 'value1')), depth)}`;
      const str2 = `${' '.repeat(spacesCount * depth - 2)}+ ${name}: ${stringify((getKeyValue(node, 'value2')), depth)}`;
      return `${str1}\n${str2}`;
    }
    if (type === 'nested') {
      const arr = node.children.flatMap((child) => iter(child, depth + 1));
      return `${' '.repeat(spacesCount * depth - 2)}  ${getKeyName(node)}: {\n${arr.join('\n')}\n${' '.repeat(spacesCount * depth - 2)}  }`;
    }
    return `${' '.repeat(spacesCount * depth - 2)}  ${name}: ${stringify((getKeyValue(node, 'value')), depth)}`;
  };
  const resultArray = data.flatMap((node) => iter(node, 1));
  const resultString = `{\n${resultArray.join('\n')}\n}`;
  return resultString;
};

export default stylish;
