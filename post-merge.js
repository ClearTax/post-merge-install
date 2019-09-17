#!/usr/bin/env node
const { execSync, spawn } = require('child_process');
const { dirname, resolve } = require('path');
const chalk = require('chalk');
const { getDirectoriesToInstall, spawnProcess, getPackageFiles } = require('./utils');

(async () => {
  const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').toString().trim();
  const gitRoot = execSync('git rev-parse --show-toplevel').toString().trim();
  const packageFiles = getPackageFiles(diffTree);

  const filesChanged = diffTree.split('\n').filter(Boolean);
  const needsInstall = !process.env.CI && packageFiles.length;

  if (needsInstall) {
    console.log(
      chalk.yellow(`
Detected changes in "${chalk.bold('package.json')}" or "${chalk.bold('package-lock.json')}".
Running "${chalk.bold('npm install')}" in the corresponding directories..\n`)
    );

    const directories = getDirectoriesToInstall(filesChanged);

    try {
      for (const directory of directories) {
        const installDirectory = resolve(gitRoot, directory);
        console.log(chalk.yellow.dim(`‣ ${chalk.underline(installDirectory)}\n`));

        execSync(`npm install`, {
          stdio: 'inherit',
          cwd: installDirectory,
        });
      }
    } catch (e) {
      console.error(`error running 'npm install':`, e);
      process.exit(1);
    }
  }
})()
