import _ from 'lodash';
import * as fs from 'fs';

const getDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1));
  const file2 = JSON.parse(fs.readFileSync(filepath2));
  const merged = { ...file1, ...file2 };
  const result = {};
  const allKeys = Object.keys(merged);
  allKeys.forEach((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        result[key] = file1[key];
      } else {
        result[`- ${key}`] = file1[key];
        result[`+ ${key}`] = file2[key];
      }
    } else if (_.has(file1, key) && (_.has(file2, key)) === false) {
      result[`- ${key}`] = file1[key];
    } else {
      result[`+ ${key}`] = file2[key];
    }
  });
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, undefined, ' '));
};

export default getDiff;
