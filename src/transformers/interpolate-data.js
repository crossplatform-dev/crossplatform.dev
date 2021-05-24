/**
 * Interpolates the data available in `/data/` in the markdown documents
 * under `/docs/`.
 *
 * There are different types of data that can be interpolated,
 * visit `interpolation-transformers` to see what are the options.
 */

//@ts-check
const path = require('path');
const fs = require('fs').promises;
const globby = require('globby');
// This module is pulled by docusaurus
const visit = require('unist-util-visit-parents');

const DATA_FOLDER = path.join(__dirname, '..', '..', 'data');

const interpolators = [
  require('./interpolation-transformers/text'),
  require('./interpolation-transformers/table'),
];

/**
 * Returns the name of the parent folder for a given `filename`
 * @param {string} filename
 */
const getParentFolderName = (filename) => {
  const dirname = path.dirname(filename);

  return dirname.split(path.sep).pop();
};

/**
 * Loads all the `.json` files under `dataFolder` that are
 * not in a `schemas` subfolder and returns a JavaScript
 * object that follows the same path structure and with the
 * contents of the json files loaded.
 * ```
 * |- bla
 * |   |- abc.json
 * |   |- def.json
 * ```
 *
 * Will return an object like:
 *
 * ```json
 * {
 *   "bla": {
 *     "abc": { contents of abc.json},
 *     "def": { contents of def.json}
 *   }
 * }
 * ```
 *
 * @param {string} dataFolder
 */
const loadData = async (dataFolder) => {
  const dataLocations = await globby(
    [path.join(dataFolder, '**/*.json'), '!**/schemas/**'],
    {
      absolute: true,
    }
  );

  const data = {};

  for (const file of dataLocations) {
    /** @type {import('../../data/types/technology').Technology} */
    const information = JSON.parse(await fs.readFile(file, 'utf-8'));
    const category = getParentFolderName(file);
    const entryName = path.basename(file, '.json');

    if (!data[category]) {
      data[category] = {};
    }

    data[category][entryName] = information;
  }

  return data;
};

const attacher = () => {
  let allInformation;

  const visitor = (node, ancestors) => {
    for (const interpolator of interpolators) {
      if (interpolator(node, ancestors, allInformation)) {
        break;
      }
    }
  };

  const transformer = async (tree) => {
    allInformation = await loadData(DATA_FOLDER);

    visit(tree, visitor);

    return tree;
  };

  return transformer;
};

module.exports = attacher;
