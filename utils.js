const { dirname } = require('path');
const { spawn } = require('child_process');

const PACKAGE_FILE = /package(-lock)?\.json/;

/**
 * Returns filtered list of files from the diff-tree which are either `package.json` or `package-lock.json`
 * @param {String} diffTree - results of git diff-tree as string
 */
exports.getPackageFiles = (diffTree = '') => diffTree.split('\n').filter(file => PACKAGE_FILE.test(file));

/**
 * Retuns unique list of items from an array
 * @param {Array} arr
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq
 */
exports.unique = arr => Array.isArray(arr) ? [...new Set(arr)] : [];

/**
 * Given a list of file paths, returns the unique list of directories they are in.
 * @param {String[]}
 */
exports.getDirectoriesToInstall = (files = []) => Array.isArray(files) ? exports.unique(files.map(file => dirname(file))) : [];

exports.spawnProcess = (...args) => new Promise((resolve, reject) => {
  const spawned = spawn(...args);
  spawned.on('close', (returnCode) => returnCode ? reject(returnCode) : resolve(returnCode));
});
