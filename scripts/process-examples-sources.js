//@ts-check

const fs = require('fs').promises;
const { readFileSync, existsSync } = require('fs');
const path = require('path');

const globby = require('globby');

/**
 * @typedef feature
 * @property {string} name
 */

/**
 * This is a list of the features being tracked in the Electron Fugu Tracker that
 * we want to use as the source of examples for other platforms. This also allow
 * us to rename the feature to something more generic we can use for that goal.
 */
const ALIASES = new Map([
  ['Compression codecs', 'Compression codecs'],
  ['Web Serial API', 'Serial access'],
  ['WebHID (Human Interface Device)', 'Human Interface access'],
  ['Multi-Screen Window Placement', 'Multi-screen window placement'],
  ['Web Bluetooth', 'Bluetooth access'],
  ['Generic sensor API', 'Generic sensor access'],
  ['Geolocation API', 'Geolocation'],
  ['Web USB', 'USB access'],
  ['Gamepad API', 'Gamepad access'],
  ['File System Access', 'File System access'],
  ['WebCodecs', 'Video codecs'],
  ['Push Notifications', 'Notifications'],
  ['Local Font Access', 'Using local fonts'],
  ['Idle Detection', 'Idle detection'],
  ['Run PWA on OS Login', 'Run on OS login'],
  ['URL Protocol Handler Registration for PWAs', 'URL protocol handler'],
  [
    'Window Controls Overlay for Installed Desktop Web Apps',
    'Custom title bar',
  ],
  ['Progressive Web Apps as URL Handlers', 'URL handler'],
]);

const DATA_PATH = path.join(__dirname, '..', 'data', 'examples', 'index.json');
const TECHNOLOGIES_PATH = path.posix.join(
  __dirname,
  '..',
  'data',
  'technologies'
);
const SOURCE_PATH = path.join(__dirname, 'examples', 'features-tracker.tsv');
const EXAMPLES_PATH = path.join(__dirname, '..', 'docs', 'examples');
const MD_PATH = path.join(__dirname, '..', 'docs', 'examples-list.pmd');
/**
 * Lowercases and replaces spaces with `-`
 * @param {string} text
 */
const normalize = (text) => {
  return text.replace(/\s+/g, '-').toLowerCase();
};

const sortFeatures = (feature1, feature2) => {
  if (feature1.name < feature2.name) {
    return -1;
  } else if (feature1.name === feature2.name) {
    return 0;
  } else if (feature1.name > feature2.name) {
    return 1;
  }
};

/**
 * Loads the normalized name of the technologies being tracked using
 * the contents of `/data/technologies` as the source of truth.
 */
const trackedTechnologies = globby
  .sync(path.posix.join(TECHNOLOGIES_PATH, '*.json'))
  .map((file) => JSON.parse(readFileSync(file, 'utf-8')).name);

const readData = async () => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));

    return data.sort(sortFeatures);
  } catch (e) {
    return [];
  }
};

const writeData = async (data) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

/**
 * Reads the contents of the original tsv file and converts
 * it into a POJO with only the features we want to track.
 */
const readSources = async () => {
  const sourcesRaw = await fs.readFile(SOURCE_PATH, 'utf-8');
  const lines = sourcesRaw.split('\n');

  const content = [];

  for (const line of lines) {
    const columns = line.trim().split('\t');

    /**
     * The headers order is:
     * Feature, Documentation, Electron Status, Gist, Tracking issue, Category, Additional
     *
     * If ALIASES does not have it, we do not want to track it
     */
    if (!ALIASES.has(columns[0])) {
      continue;
    }

    const entry = {
      name: ALIASES.get(columns[0]),
      electron: {
        gist: columns[3] || '',
        status: columns[2] || '',
        documentation: '',
      },
      pwa: {
        gist: '',
        status: columns[4] || '',
        documentation: columns[1] || '',
      },
    };

    for (const technology of trackedTechnologies) {
      if (!entry[normalize(technology)]) {
        entry[normalize(technology)] = {
          gist: '',
          status: '',
          documentation: '',
        };
      }
    }

    content.push(entry);
  }

  return content;
};

/**
 *
 * @param {string} featureName
 * @param {feature[]} features
 */
const isFeatureExampleMissing = (featureName, features) => {
  return !features.find((feature) => feature.name === featureName);
};

const createTableHeader = () => {
  const technologyColumns = trackedTechnologies;

  let markdown = `| Feature | ${technologyColumns.join(' | ')} |\n`;

  markdown += `| --- `;

  for (let i = 0; i < technologyColumns.length; i++) {
    markdown += `| :---: `;
  }

  markdown += '|\n';

  return markdown;
};

/**
 * Normalizes the different status strings and URLs so the values
 * accross technologies are consistent.
 * @param {string} status
 */
const normalizeStatus = (status) => {
  if (status.startsWith('Available since')) {
    return '✅';
  }
  if (status.includes('/pull/')) {
    // TODO: Check if it has been merged
    return '🛠';
  }
  if(status.includes('crbug')){
    // TODO: Get the resolution of the issue via Playwright because x-xsrf-token and other stuff :(
    return 'TBD';
  }

  return '❓';
};

/**
 * Returns a markdown string with the state of the feature for
 * a technology and a link to the documentation if applicable.
 * @param {*} technology
 * @returns
 */
const technologyStateMarkdown = (technology) => {
  if (!technology) {
    return '';
  }

  if (technology.status) {
    if (technology.documentation) {
      // TODO: Resolve status links from crbug
      return `[${normalizeStatus(technology.status)}](${
        technology.documentation
      })`;
    } else {
      return normalizeStatus(technology.status);
    }
  } else {
    return '';
  }
};

/**
 * Returns the markdown for the cell of a feature with a link to
 * the example page if it exists.
 * @param {string} featureName
 */
const featureMarkdown = (featureName) => {
  const normalizedFeature = normalize(featureName);

  if (existsSync(path.join(EXAMPLES_PATH, normalizedFeature))) {
    return `[${featureName}](/docs/examples/${normalizedFeature})`;
  } else {
    return featureName;
  }
};

const syncMarkdown = async (features) => {
  let markdown = `<!-- ⚠ File automatically generated in process-examples-sources.js. DO NOT MODIFY MANUALLY -->\n\n`;

  markdown += createTableHeader();

  for (const feature of features) {
    markdown += `| ${featureMarkdown(feature.name)} |`;
    for (const technology of trackedTechnologies) {
      markdown += `${technologyStateMarkdown(
        feature[normalize(technology)]
      )} |`;
    }

    markdown += '\n';
  }

  await fs.writeFile(MD_PATH, markdown, 'utf-8');
};

const start = async () => {
  const source = await readSources();
  const data = await readData();

  for (const feature of source) {
    // Do smart merging here in case we add a new technology
    if (isFeatureExampleMissing(feature.name, data)) {
      data.push(feature);
    }
  }

  await writeData(data);

  await syncMarkdown(data);
};

start();
