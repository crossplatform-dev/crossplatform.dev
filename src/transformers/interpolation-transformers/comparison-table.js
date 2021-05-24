//@ts-check
const prettify = require('../utils/prettify');

/**
 * Matches that there is a `.{}.` surrounded by characters
 * E.g.:
 * ```
 * {{ table folder1.{}.property1 }}
 * ```
 */
const regexp = /\w\.{}\./i;

/**
 *
 * @param {string} propertyKey
 * @param {any} propertyValue
 * @param {string[]} accessors
 * @returns
 */
const generateTableHeader = (propertyKey, propertyValue, accessors) => {
  let header = `| ${prettify.header(propertyKey)} |`;
  let separator = `| --- |`;
  const columnsNameSource = propertyValue;

  const keys = Object.keys(columnsNameSource);
  const source = propertyValue[keys[0]];

  // TODO: take into account if subproperty is like `property1.property2`
  // right now it assumes it's just a direct descendant
  const columns = Object.keys(source[accessors[0]]);

  for (const column of columns) {
    header += ` ${prettify.header(column)} |`;
    separator += ` --- |`;
  }

  return [header, separator];
};

/**
 *
 * @param {any} data
 * @param {string[]} accessors
 * @returns
 */
const generateTableContent = (data, accessors) => {
  // TODO: There's probably some check needed here
  let line = `| ${data.name} | `;
  // TODO: take into account if subproperty is like `property1.property2`
  // right now it assumes it's just a direct descendant
  const property = accessors[0];
  let columns = Object.keys(data[property]);
  let information = data[property];

  for (const column of columns) {
    line += ` ${prettify.dateFormat(information[column])} |`;
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
    if (accessors[0] === '{}') {
      accessors.shift();
      const header = generateTableHeader(accessor, data, accessors);

      lines.push(...header);
      break;
    } else {
      accessor = accessors.shift();

      data = data[accessor];
    }
  }

  const entries = Object.keys(data);

  for (const entry of entries) {
    const information = data[entry] || data;
    lines.push(generateTableContent(information, accessors));
  }

  const newContent = lines.join('\n');

  return newContent;
};

module.exports = {
  generateTable,
};
