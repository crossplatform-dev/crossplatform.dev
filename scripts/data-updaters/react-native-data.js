//@ts-check

/**
 * @typedef NodeResult
 * @type {object}
 * @property {string} name - The tag name
 * @property {string} createdAt - The datetime when the release was created
 * @property {string} url - The URL to the tag
 * @property {boolean} isPrerelease - If it is a pre-release version
 */

/**
 * @typedef Release
 * @type {object}
 * @property {string} version - The release version
 * @property {string} date - The datetime when the release was published
 */

const fs = require('fs').promises;
const path = require('path');
const { graphql } = require('@octokit/graphql');

const RN_DATA_PATH = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'technologies',
  'react-native.json'
);

const query = `
{
  repository(owner: "facebook", name: "react-native") {
    refs(refPrefix: "refs/tags/", first: 1) {
      nodes {
        repository {
          releases(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              name
              createdAt
              url
              isPrerelease
            }
          }
        }
      }
    }
  }
}`;

const token = process.env.GITHUB_TOKEN || '';

if (!token) {
  console.error(`GitHub auth token not found`);
  process.exit(1);
}

/**
 *
 * @param {NodeResult} release
 */
const getVersion = (release) => {
  if (release.name.startsWith('v')) {
    return release.name;
  }

  if (!release.name) {
    /**
     * Sometimes the name is missing (e.g. 0.61.1) so we have to use the
     * URL to figure out the version. The url is always similar to
     * https://github.com/facebook/react-native/releases/tag/v0.61.1
     */
    return release.url.split('/').pop();
  }

  /**
   * The remaining case is when the name does not start with a v (e.g.: 0.61.0)
   */
  return `v${release.name}`;
};

/**
 * Transforms a NodeResult into a Release
 * @param {NodeResult[]} releases
 */
const toReleases = (releases) => {
  const stables = releases.filter((release) => !release.isPrerelease);

  const versions = stables.map((release) => {
    const version = getVersion(release);

    return {
      version,
      date: release.createdAt,
    };
  });

  return versions;
};

const getReleases = async () => {
  const queryResults = await graphql(query, {
    headers: {
      authorization: `token ${token}`,
    },
  });

  const releases = toReleases(
    queryResults.repository.refs.nodes[0].repository.releases.nodes
  );

  return releases;
};

/**
 * Updates all the information related to React Native:
 * - Releases
 */
const update = async () => {
  const rnData = JSON.parse(await fs.readFile(RN_DATA_PATH, 'utf-8'));

  const releases = await getReleases();

  rnData.releases = releases;

  await fs.writeFile(RN_DATA_PATH, JSON.stringify(rnData, null, 2), 'utf-8');
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
