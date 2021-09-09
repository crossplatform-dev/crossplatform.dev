//@ts-check
const { createTree } = require('../utils/create-tree');
const prettify = require('../utils/prettify');

/**
 * Matches that there is a `.[]` at the end
 * E.g.:
 * ```
 * {{ table folder1.property1.[] }}
 * ```
 */
const regexp = /\.\[\]\.?/i;

/**
 *
 * @param {any[]} data
 * @param {string[]} accessors
 * @returns
 */
const generateTableHeader = (data, accessors) => {
  let columns;

  if (accessors.length === 0) {
    const columnsNameSource = data[0];
    columns = Object.keys(columnsNameSource);
  } else {
    //TODO: this assumes accessors has only one property
    columns = [accessors[0]];
  }

  let header = `|`;
  let separator = `|`;

  for (const column of columns) {
    header += ` ${prettify.header(column)} |`;
    separator += ` :---: |`;
  }

  return [header, separator];
};

/**
 *
 * @param {any[]} entry
 * @param {any[]} accessors
 * @returns
 */
const generateTableContent = (entry, accessors) => {
  let line = '';
  let columns;

  if (accessors.length === 0) {
    columns = Object.keys(entry);
  } else {
    //TODO: this assumes accessors has only one property
    columns = [accessors[0]];
  }

  for (const column of columns) {
    line += ` ${prettify.dateFormat(entry[column])} |`;
  }

  return line;
};

/**
 * @param {string} property
 * @param {any} information
 */
const generateTable = (property, information) => {
  const match = regexp.exec(property);

  if (match === null) {
    return false;
  }

  const accessors = property.split('.');

  let data = information;
  const lines = [];

  let accessor;

  while (accessors.length > 0) {
    if (accessors[0] === '[]') {
      accessors.shift();
      if (Array.isArray(data)) {
        const header = generateTableHeader(data, accessors);
        lines.push(...header);
        break;
      } else {
        console.error(`Bad interpolation: "${property}"`);
      }
    } else {
      accessor = accessors.shift();

      data = data[accessor];
    }
  }

  for (const entry of data) {
    lines.push(generateTableContent(entry, accessors));
  }

  const newContent = lines.join('\n');

  return newContent;
};

module.exports = {
  generateTable,
};
