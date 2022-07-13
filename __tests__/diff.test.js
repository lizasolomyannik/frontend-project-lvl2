import getDiff from '../src/index.js';

test('compare flat JSON files', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  const result = getDiff(path1, path2);
  const expectedResult =
  `{
 - follow: false,
 host: hexlet.io,
 - proxy: 123.234.53.22,
 - timeout: 50,
 + timeout: 20,
 + verbose: true
}`;
  expect(result).toBe(expectedResult);
});