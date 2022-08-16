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

test.each([
  {
    a: JSONpath1, b: JSONpath2, format: 'stylish', result: stylishExpectedResult,
  },
  {
    a: YAMLpath1, b: YAMLpath2, format: 'stylish', result: stylishExpectedResult,
  },
  {
    a: JSONpath1, b: JSONpath2, format: 'plain', result: plainExpectedResult,
  },
  {
    a: YAMLpath1, b: YAMLpath2, format: 'plain', result: plainExpectedResult,
  },
  {
    a: JSONpath1, b: JSONpath2, format: 'json', result: JSONExpectedResult,
  },
  {
    a: YAMLpath1, b: YAMLpath2, format: 'json', result: JSONExpectedResult,
  },
])('gendiff $a $b $format', ({
  a, b, format, result,
}) => {
  expect(genDiff(a, b, format)).toBe(result);
});
