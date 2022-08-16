import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormatter from './json.js';

const formatData = (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'json':
      return jsonFormatter(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatData;
