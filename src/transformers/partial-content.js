// Initial code from https://github.com/unlight/remark-sources/blob/8b4ca174d276c2b66ae98c817f87f9ab3fc1b3a5/index.js
// Licensed under MIT

const fs = require('fs').promises;
const { resolve } = require('path');

const unified = require('unified');
const visitChildren = require('unist-util-visit-children');
const toMDAST = require('remark-parse');
const vfile = require('vfile');
const importCode = require('./import-code');

const regExp = /{@import (.*?\.pmd)}/;
const processor = unified().use(toMDAST).use(importCode);

const replace = async (node, filePath) => {
  try {
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    if (content !== undefined) {
      const file = vfile({
        path: filePath,
        contents: content,
      });

      const partialTree = processor.parse(file);
      const doc = await processor.run(partialTree, file);

      node.children = doc.children;
    }
  } catch (e) {
    node.children[0].value = `Failed to read file: ${filePath}`;
  }
};

/**
 * This is a unified plugin that Transforms all the instances
 * of `{@import ./relative/path.pmd}` with the contents of
 * `./relative/path.pmd`, which has to be a regular markdown file.
 *
 * Additionally, it also uses the plugin import-code in this same
 * repository.
 */
const attacher = () => {

  const transformer = async (tree, file) => {
    const replacements = [];

    const visit = visitChildren((node) => {
      if (!node || node.type !== 'paragraph') {
        return;
      }

      if (!node.children[0] || node.children[0].type !== 'text') {
        return;
      }

      const filePath = (regExp.exec(node.children[0].value) || [])[1];

      // No import statement in the paragraph
      if (!filePath) {
        return;
      }

      const absPath = resolve(file.dirname, filePath);

      replacements.push(replace(node, absPath))
    });

    visit(tree);

    await Promise.all(replacements);
  };

  return transformer;
};

module.exports = attacher;
