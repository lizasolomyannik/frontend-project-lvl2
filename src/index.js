import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

import formatData from './formatters/getFormat.js';
import getDiffTree from './difftree.js';

const getDataType = (data) => path.extname(data);

const readData = (data, type) => {
  if (type === '.json') {
    return JSON.parse(fs.readFileSync(data));
  }
  if (type === '.yaml' || type === '.yml') {
    return yaml.load(fs.readFileSync(data));
  }
  throw Error('Unknown format!');
};

const parseData = (data) => {
  const type = getDataType(data);
  return readData(data, type);
};

const genDiff = (data1, data2, format) => {
  const firstData = parseData(data1);
  const secondData = parseData(data2);
  const result = getDiffTree(firstData, secondData);
  const formattedResult = formatData(result, format);
  return formattedResult;
};

export default genDiff;
