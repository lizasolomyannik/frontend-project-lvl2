import path from 'path';
import * as fs from 'fs';
import { expect, test } from '@jest/globals';
import getDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readTextFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResult = readTextFile('expectedResult');

test('compare JSON files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const result = getDiff(path1, path2);
  expect(result).toBe(expectedResult);
});

test('compare YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yaml';
  const result = getDiff(path1, path2);
  expect(result).toBe(expectedResult);
});

test('unknown file formats', () => {
  expect(() => {
    parseFile('example.jpg');
  }).toThrow('Unknown file format!');
});
