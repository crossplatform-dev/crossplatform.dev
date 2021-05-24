const { singular } = require('pluralize');
const dayjs = require('dayjs');

/**
 * Makes the word singular and capitalizes the first
 * letter of the string unless it contains capital
 * letters already.
 * @param {string} title
 */
const header = (title) => {
  let prettyTitle = title;

  /**
   * If the word has some capital letters
   * we assume it's a name and no need to pretify
   */
  if (prettyTitle.match(/[A-Z]/) === null) {
    prettyTitle = singular(prettyTitle).replace(/^\w/, (c) => c.toUpperCase());
  }

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
