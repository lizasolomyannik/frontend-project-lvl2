import path from 'path';
import * as fs from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readTextFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const JSONpath1 = 'file1.json';
const JSONpath2 = 'file2.json';
const YAMLpath1 = 'file1.yaml';
const YAMLpath2 = 'file2.yaml';

const stylishExpectedResult = readTextFile('stylishExpectedResult');
const plainExpectedResult = readTextFile('plainExpectedResult').trim();
const JSONExpectedResult = readTextFile('jsonExpectedResult');

test('stylish compare JSON files', () => {
  const stylishResult = genDiff(JSONpath1, JSONpath2, 'stylish');
  expect(stylishResult).toBe(stylishExpectedResult);
});

test('stylish compare YAML files', () => {
  const stylishResult = genDiff(YAMLpath1, YAMLpath2, 'stylish');
  expect(stylishResult).toBe(stylishExpectedResult);
});

test('plain compare JSON files', () => {
  const plainResult = genDiff(JSONpath1, JSONpath2, 'plain');
  expect(plainResult).toBe(plainExpectedResult);
});

test('plain compare YAML files', () => {
  const plainResult = genDiff(YAMLpath1, YAMLpath2, 'plain');
  expect(plainResult).toBe(plainExpectedResult);
});

test('json compare JSON files', () => {
  const JSONResult = genDiff(JSONpath1, JSONpath2, 'json');
  expect(JSONResult).toBe(JSONExpectedResult);
});

test('json compare YAML files', () => {
  const JSONResult = genDiff(YAMLpath1, YAMLpath2, 'json');
  expect(JSONResult).toBe(JSONExpectedResult);
});

test('unknown file formats', () => {
  expect(() => {
    parseFile('example.jpg');
  }).toThrow('Unknown file format!');
});
