import path from 'path';
import * as fs from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/formatters/index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readTextFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishExpectedResult = readTextFile('stylishExpectedResult');
const plainExpectedResult = readTextFile('plainExpectedResult').trim();

test('stylish compare JSON files', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';
  const stylishResult = genDiff(path1, path2, 'stylish');
  expect(stylishResult).toBe(stylishExpectedResult);
});

test('stylish compare YAML files', () => {
  const path1 = 'file1.yaml';
  const path2 = 'file2.yaml';
  const stylishResult = genDiff(path1, path2, 'stylish');
  expect(stylishResult).toBe(stylishExpectedResult);
});

test('plain compare JSON files', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';
  const plainResult = genDiff(path1, path2, 'plain');
  expect(plainResult).toBe(plainExpectedResult);
});

test('plain compare YAML files', () => {
  const path1 = 'file1.yaml';
  const path2 = 'file2.yaml';
  const plainResult = genDiff(path1, path2, 'plain');
  expect(plainResult).toBe(plainExpectedResult);
});

test('unknown file formats', () => {
  expect(() => {
    parseFile('example.jpg');
  }).toThrow('Unknown file format!');
});
