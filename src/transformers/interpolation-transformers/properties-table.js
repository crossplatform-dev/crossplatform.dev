//@ts-check
const prettify = require('../utils/prettify');

/**
 * Matches that there is a `.{}.` surrounded by characters
 * E.g.:
 * ```
 * {{ table folder1.{}.property1 }}
 * ```
 */
const regexp = /\w\.{}$/i;

/**
 *
 * @param {string} property
 */
const isCorretTableFormat = (property) => {
  const match = regexp.exec(property);

  return match !== null;
};

/**
 *
 * @param {string[]} columns
 * @returns
 */
const generateTableHeader = (columns) => {
  let header = `| `;
  let separator = `| `;

  for (const column of columns) {
    header += ` ${prettify.header(column)} |`;
    separator += ` :---: |`;
  }

  return [header, separator];
};

/**
 *
 * @param {any} data
 * @returns
 */
const generateTableContent = (data) => {
  const columns = Object.keys(data);
  let line = '| ';

  for (const column of columns) {
    line += `${prettify.dateFormat(data[column])} |`;
  }

  return line;
};

/**
 * @param {string} property
 * @param {any} information
 */
const generateTable = (property, information) => {
  if (!isCorretTableFormat(property)) {
    return;
  }

  const accessors = property.split('.');

  let data = information;
  const lines = [];

  let accessor;
  let entries;

  while (accessors.length > 0) {
    if (accessors[0] === '{}') {
      accessors.shift();
      entries = Object.keys(data);

      const header = generateTableHeader(entries);
      lines.push(...header);

      break;
    } else {
      accessor = accessors.shift();

      data = data[accessor];
    }
  }

  lines.push(generateTableContent(data));

  const newContent = lines.join('\n');

  return newContent;
};

module.exports = {
  generateTable,
};
