import { getFileType, readFile } from './dataType.js';

const parseFile = (file) => {
  const type = getFileType(file);
  return readFile(file, type);
};

export default parseFile;
