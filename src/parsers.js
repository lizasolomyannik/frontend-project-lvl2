import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const parseFile = (filepath) => {
  if (path.extname(filepath) === '.json') {
    return JSON.parse(fs.readFileSync(filepath));
  }
  if ((path.extname(filepath) === '.yaml') || (path.extname(filepath) === '.yml')) {
    return yaml.load(fs.readFileSync(filepath));
  }
  throw Error('Unknown file format!');
};

export default parseFile;
