//@ts-check

const path = require('path');
const fs = require('fs').promises;

const got = require('got').default;
const releasesUrl =
  'https://api.nuget.org/v3/registration5-semver1/microsoft.web.webview2/index.json';

const latestVersion = require('latest-version').default;

const WV2_DATA_PATH = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'technologies',
  'webview2.json'
);

const compareReleases = (releaseA, releaseB) => {
  const dateA = new Date(releaseA.commitTimeStamp).getTime();
  const dateB = new Date(releaseB.commitTimeStamp).getTime();

  if(dateA === dateB) return 0;

  if(dateA > dateB) {
    return -1;
  }else {
    return 1;
  }
};

const isNotPrerelease = (release) => {
  return !release.catalogEntry.version.endsWith('-prerelease');
};

const toVersionAndDate = (release) => {
  return {
    version: release.catalogEntry.version,
    date: release.commitTimeStamp,
  };
};

const getReleases = async () => {
  const { items } = await got(releasesUrl).json();

  // There should only be one item in `items`
  const releases = items[0].items
    .sort(compareReleases)
    .filter(isNotPrerelease)
    .map(toVersionAndDate);

  return releases;
};

/**
 * Updates all the information related to WebView2:
 * - Releases
 */
const update = async () => {
  const wv2Data = JSON.parse(await fs.readFile(WV2_DATA_PATH, 'utf-8'));

  const releases = await getReleases();

  wv2Data.releases = releases;

  await fs.writeFile(WV2_DATA_PATH, JSON.stringify(wv2Data, null, 2), 'utf-8');
};

// When a file is run directly from Node.js, `require.main` is set to its module.
// That means that it is possible to determine whether a file has been run directly
// by testing `require.main === module`.
// https://nodejs.org/docs/latest/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  update();
}

module.exports = {
  update,
};
