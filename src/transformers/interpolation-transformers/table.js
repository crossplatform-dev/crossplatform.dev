/**
 * Searches for text nodes that match content similar to:
 *
 * * `{{ technologies.{}.platforms }}`
 * * `{{ technologies.electron.releases.[] }}`
 *
 * and replaces the content with a table where the lines
 * are the properties of the left side of `{}` and the
 * columns are the different properties of the right side.
 *
 * With the 1st example above, it would be something like:
 *
 * | Technology | Windows | macOS | Linux | Android | iOS |
 * | --- | --- | --- | --- | --- | --- |
 * | Technology1 | ✅ |   | ⚒ |   |   |   |
 * | Technology2 |   | ✅ | ⚒ |   | ✅ |   |
 *
 */

//@ts-check

const { createTree } = require('../utils/create-tree');

const tableGenerators = [
  require('./comparison-table').generateTable,
  require('./list-table').generateTable,
  require('./properties-table').generateTable
];

/**
 * Matches strings such as the following:
 * * `{{ table technologies.electron.url }}`
 */
const regexp = /{{\s*table\s+(\S+|\.)*?\s*}}/i;

/**
 * Searches for `text` nodes that match the following RegExp
 * `/{{\s*table\s+(\S+|\.)*?\s*}}/i`
 * and creates a table with the right interpolated information.
 *
 * If the node is not a good match, it returns `false`.
 * @param {*} node
 * @param {*} ancestors
 * @param {*} information
 */
const visitor = async (node, ancestors, information) => {
  if (node.type !== 'text') {
    return false;
  }

  const content = node.value;
  const match = regexp.exec(content);

  if (match === null) {
    return false;
  }

  const [, property] = match;

  for (const tableGenerator of tableGenerators) {
    const proposedContent = tableGenerator(property, information);

    if (proposedContent) {
      const table = await createTree(proposedContent);

      const children = ancestors[0].children;
      const index = children.indexOf(ancestors[1]);

      children.splice(index, 1, table);

      return true;
    }
  }
  return false;
};

module.exports = visitor;
