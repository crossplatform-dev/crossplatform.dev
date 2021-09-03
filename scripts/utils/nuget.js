//@ts-check

const path = require('path');
const fs = require('fs').promises;

const got = require('got').default;

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'technologies');

const compareReleases = (releaseA, releaseB) => {
  const dateA = new Date(releaseA.commitTimeStamp).getTime();
  const dateB = new Date(releaseB.commitTimeStamp).getTime();

  if (dateA === dateB) return 0;

  if (dateA > dateB) {
    return -1;
  } else {
    return 1;
  }
};

const isNotPrerelease = (release) => {
  // Prerelease packages usually end with `-prelease` or have a `-preXX` suffix
  return !release.catalogEntry.version.includes('-pre');
};

const toVersionAndDate = (release) => {
  return {
    version: release.catalogEntry.version.split('+')[0],
    date: release.commitTimeStamp,
  };
};

/**
 * Downloads the release information for a given package that has that many
 * releases that they are paginated
 * @param {any[]} pages
 */
const getDataFromPages = async (pages) => {
  const requests = pages.map(async (page) => {
    const { items } = await got(page['@id']).json();
    return items;
  });

  const results = await Promise.all(requests);
  const data = results.flat();

  return data;
};

/**
 * Returns the releases information in nuget for the given package.
 * @param {string} packageName The package in nuget to get the information about
 * @returns
 */
const getReleases = async (packageName) => {
  const { items } = await got(
    `https://api.nuget.org/v3/registration5-gz-semver2/${packageName}/index.json`
  ).json();

  if (Array.isArray(items) && items[0].items) {
    // All releases are in the response and we do not need to paginate
    const releases = items[0].items
      .sort(compareReleases)
      .filter(isNotPrerelease)
      .map(toVersionAndDate);

    return releases;
  } else {
    // Items are paginated, last item has the URL to the last published ones
    const results = await getDataFromPages(items);

    const releases = results
      .sort(compareReleases)
      .filter(isNotPrerelease)
      .map(toVersionAndDate);

    return releases;
  }
};

/**
 * Updates the information related to a given technology
 * that is published on nuget
 *
 * @param {string} technology The normalized technology name
 * @param {string} packageName The nuget package name
 */
const update = async (technology, packageName) => {
  const technologyPath = path.join(DATA_PATH, `${technology}.json`);
  const data = JSON.parse(await fs.readFile(technologyPath, 'utf-8'));

  const releases = await getReleases(packageName);

  data.releases = releases;

  await fs.writeFile(technologyPath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  update,
};
