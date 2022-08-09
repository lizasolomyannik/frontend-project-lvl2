import * as fs from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const JSONpath1 = '__fixtures__/file1.json';
const JSONpath2 = '__fixtures__/file2.json';
const YAMLpath1 = '__fixtures__/file1.yaml';
const YAMLpath2 = '__fixtures__/file2.yaml';

const stylishExpectedResult = fs.readFileSync('__fixtures__/stylishExpectedResult', 'utf-8');
const plainExpectedResult = fs.readFileSync('__fixtures__/plainExpectedResult', 'utf-8');
const JSONExpectedResult = fs.readFileSync('__fixtures__/jsonExpectedResult', 'utf-8');

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
