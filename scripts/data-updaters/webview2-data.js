//@ts-check

const { update } = require('../utils/nuget');

const TECHNOLOGY = 'webview2';
const PACKAGE_NAME = 'microsoft.web.webview2'

/**
 * Updates all the information related to WebView2
 */
const updateWV2 = async () => {
  await update(TECHNOLOGY, PACKAGE_NAME);
};

// When a file is run directly from Node.js, `require.main` is set to its module.
// That means that it is possible to determine whether a file has been run directly
// by testing `require.main === module`.
// https://nodejs.org/docs/latest/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  updateWV2();
}

module.exports = {
  update: updateWV2,
};
