#!/usr/bin/env node
const { execSync, spawn } = require('child_process');
const { dirname, resolve } = require('path');
const chalk = require('chalk');
const { getDirectoriesToInstall, spawnProcess } = require('./utils');

const workingDirectory = process.cwd();

(async () => {
  const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').toString();
  const packageFiles = getPackageFiles(diffTree);

  const filesChanged = (diffTree || '').split('\n').filter(Boolean);
  const needsInstall = !process.env.CI && packageFiles.length;

  if (needsInstall) {
    console.log(
      chalk.yellow(`
Detected changes in "${chalk.bold('package.json')}" or "${chalk.bold('package-lock.json')}".
Running "${chalk.bold('npm install')}" in the corresponding directories..
\n\n`)
    );

    const directories = getDirectoriesToInstall(filesChanged);

    try {
      for (const directory of directories) {
        await spawn(`npm`, ['install'], {
            cwd: resolve(workingDirectory, directory),
            stdio: 'inherit' });
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
})()
