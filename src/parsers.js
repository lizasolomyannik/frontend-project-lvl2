import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const parseFile = (filepath) => {
  let file;
  if (path.extname(filepath) === '.json') {
    file = JSON.parse(fs.readFileSync(filepath));
  } else if ((path.extname(filepath) === '.yaml') || (path.extname(filepath) === '.yml')) {
    file = yaml.load(fs.readFileSync(filepath));
  }
  return file;
};

export default parseFile;
