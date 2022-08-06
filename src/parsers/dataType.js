import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const getFileType = (filename) => path.extname(filename);

const readFile = (file, type) => {
  if (type === '.json') {
    return JSON.parse(fs.readFileSync(file));
  }
  if (type === '.yaml' || type === '.yml') {
    return yaml.load(fs.readFileSync(file));
  }
  throw Error('Unknown file format!');
};

export { getFileType, readFile };
