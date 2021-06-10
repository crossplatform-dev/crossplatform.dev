//@ts-check

/**
 * Original code writen by @molant for https://github.com/electron/electronjs.org-new
 * Distributed under an Apache-2.0 License
 *
 * https://github.com/electron/electronjs.org-new/blob/51e5f584353a8e2f653b0d06ca02a08154a48f13/scripts/utils/git-commands.js
 */

const github = require('@actions/github');
const { execute } = require('./execute');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Creates a new commit with the current changes.
 * @param {string} email
 * @param {string} name
 * @param {string} commitMessage
 */
const createCommit = async (email, name, commitMessage) => {
  await execute('git remote -vv');
  await execute('git status');
  await execute(`git config --global user.email ${email}`);
  await execute(`git config --global user.name ${name}`);
  await execute(`git add .`);
  await execute(`git commit -am ${commitMessage}`);
};

/**
 * Returns the current modified files in the repo.
 */
const getChanges = async () => {
  const { stdout } = await execute('git status --porcelain');

  return stdout.trim();
};

/**
 * Creates a new commit and pushes the given branch
 * @param {string} branch
 * @param {string} email
 * @param {string} name
 * @param {string} message
 */
const pushChanges = async (branch, email, name, message) => {
  await createCommit(email, name, message);
  await execute(`git pull --rebase`);
  await execute(`git push origin ${branch} --follow-tags`);
};

module.exports = {
  getChanges,
  pushChanges,
};
