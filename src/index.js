import * as fs from 'fs';
import * as path from 'path';

import parseData from './parser.js';
import formatData from './formatters/getFormat.js';
import getDiffTree from './difftree.js';

const getDataType = (data) => path.extname(data).slice(1);

const readData = (data) => fs.readFileSync(data);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const type1 = getDataType(filepath1);
  const type2 = getDataType(filepath2);
  const data1 = readData(filepath1);
  const data2 = readData(filepath2);
  const firstData = parseData(data1, type1);
  const secondData = parseData(data2, type2);
  const result = getDiffTree(firstData, secondData);
  const formattedResult = formatData(result, format);
  return formattedResult;
};

export default genDiff;
