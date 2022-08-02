import path from 'path';
import * as fs from 'fs';
import { expect, test } from '@jest/globals';
import getDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readTextFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishExpectedResult = readTextFile('stylishExpectedResult');
const plainExpectedResult = readTextFile('plainExpectedResult').trim();
console.log(plainExpectedResult);

test('stylish compare JSON files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const stylishResult = stylish(getDiff(path1, path2));
  expect(stylishResult).toBe(stylishExpectedResult);
});

test('stylish compare YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yaml';
  const result = stylish(getDiff(path1, path2));
  expect(result).toBe(stylishExpectedResult);
});

test('plain compare JSON files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const plainResult = plain(getDiff(path1, path2));
  console.log(plainResult);
  expect(plainResult).toBe(plainExpectedResult);
});

test('plain compare YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yaml';
  const plainResult = plain(getDiff(path1, path2));
  expect(plainResult).toBe(plainExpectedResult);
});

test('unknown file formats', () => {
  expect(() => {
    parseFile('example.jpg');
  }).toThrow('Unknown file format!');
});
