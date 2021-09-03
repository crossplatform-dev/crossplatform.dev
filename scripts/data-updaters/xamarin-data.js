//@ts-check

const { update } = require('../utils/nuget');

const TECHNOLOGY = 'xamarin';
const PACKAGE_NAME = 'xamarin.forms'

/**
 * Updates all the information related to WebView2
 */
const updateXamarin = async () => {
  await update(TECHNOLOGY, PACKAGE_NAME);
};

// When a file is run directly from Node.js, `require.main` is set to its module.
// That means that it is possible to determine whether a file has been run directly
// by testing `require.main === module`.
// https://nodejs.org/docs/latest/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  updateXamarin();
}

module.exports = {
  update: updateXamarin,
};

