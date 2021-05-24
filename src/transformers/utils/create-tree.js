const unified = require('unified');
const toMDAST = require('remark-parse');
const mdxHastToJsx = require('@mdx-js/mdx/mdx-hast-to-jsx');

/**
 * Returns a markdown AST for the given
 * `contents` using `remark-parse`
 * @param {string} contents
 */
const createTree = (contents) => {
  return new Promise((resolve) => {
    const attacher = () => {
      const transformer = (tree) => {

        // The tree is a node of type `root` and we want the `table` one, which is the first children
        resolve(tree.children[0]);

        return tree;
      };

      return transformer;
    };

    unified()
      .use(toMDAST)
      .use(attacher)
      .use(mdxHastToJsx) // TODO: use another compiler?
      .process(contents, function (err, file) {
        // Do nothing
      });
  });
};

module.exports = {
  createTree,
};
