import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormatter from './json.js';

const formatData = (data, format) => {
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return jsonFormatter(data);
  }
  return stylish(data);
};

export default formatData;
