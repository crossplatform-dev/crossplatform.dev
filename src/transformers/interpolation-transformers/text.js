/**
 * Searches for text and link nodes similar to:
 *
 * `{{ technologies.electron.url }}`
 *
 * and replaces the content with the value of
 * the property.
 *
 */

//@ts-check

/**
 * Matches strings such as the following:
 * * `{{ technologies.electron.url }}`
 * * `{{technologies.tauri.documentation}}`
 */
const regexp = /{{\s*(\S+|\.)*?\s*}}/i;

const visitor = (node, ancestors, information) => {
  let contentProperty = '';
  if (node.type === 'text') {
    contentProperty = 'value';
  } else if (node.type === 'link') {
    contentProperty = 'url';
  } else {
    return false;
  }

  const content = node[contentProperty];

  const match = regexp.exec(content);

  if (match === null) {
    return false;
  }

  const [matchedText, property] = match;

  const accessors = property.split('.');

  let data = information;

  for (const accessor of accessors) {
    data = data[accessor];
  }

  node[contentProperty] = node[contentProperty].replace(matchedText, data);

  return true;
};

module.exports = visitor;
