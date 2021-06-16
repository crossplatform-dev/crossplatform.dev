//@ts-check

const path = require('path');
const fs = require('fs').promises;

const got = require('got').default;
const releasesUrl =
  'https://raw.githubusercontent.com/electron/releases/master/lite.json';

const semver = require('semver');
const latestVersion = require('latest-version').default;

const SUPPORTED_VERSIONS = 2;

const ELECTRON_DATA_PATH = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'technologies',
  'electron.json'
);

/**
 * Checks if `toValidate` is in the supported range using
 * the major of `latest` as the top boudary.
 * @param {string} latest
 * @param {string} toValidate
 */
const isSupported = (latest, toValidate) => {
  const latestMajor = semver.major(latest);
  const toValidateMajor = semver.major(toValidate);

  return toValidateMajor >= latestMajor - SUPPORTED_VERSIONS;
};

/**
 * Given an array of GitHub releases, filters out the ones that
 * do not meet the supported criteria and transforms them
 * in a valid Release format.
 * @param {any[]} releases
 * @returns
 */
const filterReleases = (latestMajor, releases) => {
  const filteredReleases = [];
  for (const release of releases) {
    if (!release.prerelease && isSupported(latestMajor, release.tag_name)) {
      filteredReleases.push({
        version: release.tag_name,
        date: release.published_at,
      });
    }
  }

  return filteredReleases;
};

/**
 * Downloads all the Electron releases information
 * for the supported platforms
 * @param {string} latestMajor
 */
const getReleases = async (latestMajor) => {
  const releases = await got(releasesUrl).json();
  const filteredReleases = filterReleases(latestMajor, releases);

  return filteredReleases;
};

/**
 * Updates all the information related to Electron:
 * - Releases
 */
const update = async () => {
  const electronData = JSON.parse(await fs.readFile(ELECTRON_DATA_PATH, 'utf-8'));
  const version = await latestVersion('electron');

  const releases = await getReleases(version);

  electronData.releases = releases;

  await fs.writeFile(
    ELECTRON_DATA_PATH,
    JSON.stringify(electronData, null, 2),
    'utf-8'
  );
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
