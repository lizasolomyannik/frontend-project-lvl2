import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', filename);

const parseFile = (filepath) => {
  const finalPath = getPath(filepath);
  if (path.extname(filepath) === '.json') {
    return JSON.parse(fs.readFileSync(finalPath));
  }
  if ((path.extname(filepath) === '.yaml') || (path.extname(filepath) === '.yml')) {
    return yaml.load(fs.readFileSync(finalPath));
  }
  throw Error('Unknown file format!');
};

export default parseFile;
