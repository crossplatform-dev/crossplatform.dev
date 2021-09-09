const { singular } = require('pluralize');
const dayjs = require('dayjs');

/**
 * Makes the word singular and capitalizes the first
 * letter of the string unless it starts already with
 * a capital letter. It also uncamelcases.
 * Examples:
 * * Android -> Android
 * * macOS -> macOS
 * * technologies -> Technology
 * * codeLicense -> Code License
 * @param {string} title
 */
const header = (title) => {
  let prettyTitle = title;

  // Starts with a capital letter like "Windows"
  if (prettyTitle.match(/^[A-Z]/) !== null) {
    return prettyTitle;
  }

  const middleCapitalLetters = prettyTitle.match(/\w+?([A-Z]+)/);
  const [, match] = middleCapitalLetters || [, ''];
  const hasSeveralCapitalLetters = match.length >= 2;

  // We do not want to modify if it is something like macOS or iOS
  if (hasSeveralCapitalLetters) {
    return prettyTitle;
  }

  prettyTitle = singular(prettyTitle)
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\w[A-Z]/, (c) => `${c[0]} ${c[1]}`);

  return prettyTitle;
};

/**
 * Tries to format a date string into `YYYY/MM/DD`
 * or returns the original string if not valid.
 * @param {string} date
 */
const dateFormat = (date) => {
  const parsed = dayjs(date);

  if (parsed.isValid()) {
    return parsed.format('YYYY/MM/DD');
  }

  return date;
};

module.exports = {
  header,
  dateFormat,
};
