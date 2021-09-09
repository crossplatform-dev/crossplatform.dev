// Initial code from https://github.com/unlight/remark-sources/blob/8b4ca174d276c2b66ae98c817f87f9ab3fc1b3a5/index.js
// Licensed under MIT

const fs = require('fs').promises;
const { resolve } = require('path');

const visitChildren = require('unist-util-visit-children');

const regExp = new RegExp(/^[^\(]*\(([^\)]+)\)$/);

const replace = async (node, filePath) => {
  try {
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    if (content !== undefined) {
      node.value = content.trim();

      return true;
    }
  } catch (e) {
    node.value = `Failed to read file: ${filePath}`;

    return false;
  }
};

/**
 * Replaces all the codeblock instances on a markdown document that point
 * to a file with the contents of that file.
 */
const attacher = () => {
  const transformer = async (tree, file) => {
    const replacements = [];

    const visitor = visitChildren((node) => {
      if (node && node.type === 'code' && node.meta) {
        const filePath = (regExp.exec(node.meta) || [])[1];

        // Regular codeblock with no information between parenthesis
        if (!filePath) {
          return;
        }

        const absPath = resolve(file.dirname, filePath);

        replacements.push(replace(node, absPath));
      }
    });

    visitor(tree);

    await Promise.all(replacements);
  };

  return transformer;
};

module.exports = attacher;
