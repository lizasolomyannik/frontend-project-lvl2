import { getDataType, readData } from './dataType.js';

const parseData = (data) => {
  const type = getDataType(data);
  return readData(data, type);
};

export default parseData;
