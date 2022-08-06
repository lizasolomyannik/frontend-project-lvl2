import formatData from './formatters/getFormat.js';
import getDiffTree from './difftree.js';
import parseFile from './parsers/parser.js';

const genDiff = (file1, file2, format) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const result = getDiffTree(data1, data2);
  const formattedResult = formatData(result, format);
  return formattedResult;
};

export default genDiff;
