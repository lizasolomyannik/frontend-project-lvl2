import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const parseFile = (filepath) => {
  const fixturePath = getFixturePath(filepath);
  if (path.extname(filepath) === '.json') {
    return JSON.parse(fs.readFileSync(fixturePath));
  }
  if ((path.extname(filepath) === '.yaml') || (path.extname(filepath) === '.yml')) {
    return yaml.load(fs.readFileSync(fixturePath));
  }
  throw Error('Unknown file format!');
};

export default parseFile;
