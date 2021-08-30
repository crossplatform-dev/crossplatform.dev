//@ts-check

/**
 * Runs all the data updaters and pushes the changes to the main branch
 * if there are any;
 */

const updaters = new Map([
  ['Electron', require('./data-updaters/electron-data').update],
  ['WebView2', require('./data-updaters/webview2-data').update],
  ['ReactNative', require('./data-updaters/react-native-data').update],
]);

const { getChanges, pushChanges } = require('./utils/git-commands');

const BRANCH = 'main';
const COMMIT_MESSAGE = '"chore: update technologies data (🤖)"';
const EMAIL = 'bot@crossplatform.dev';
const NAME = 'crossplatform-bot';

const start = async () => {

  for(const [technology, updater] of updaters){
    console.log(`Updating ${technology} data`);
    await updater();
  }

  const changes = await getChanges();

  if (!changes) {
    console.log(`No changes detected, done!`);
    return;
  }

  console.log(`Changes detected`);

  await pushChanges(BRANCH, EMAIL, NAME, COMMIT_MESSAGE);

  console.log('Changes pushed');
};

start();
