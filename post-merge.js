#!/usr/bin/env node
const { execSync, spawnSync } = require('child_process')
const { resolve } = require('path')
const chalk = require('chalk')
const { getDirectoriesToInstall, getPackageFiles, parseCliOptions } = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async() => {
  const cliOptions = parseCliOptions();

  const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').toString().trim();
  const gitRoot = execSync('git rev-parse --show-toplevel').toString().trim();

  const changedPackageFiles = getPackageFiles(diffTree)
  const needsInstall = !process.env.CI && changedPackageFiles.length

  if (needsInstall) {
    console.log(
      chalk.yellow(`Detected changes in "${chalk.bold('package.json')}" and/or "${chalk.bold('package-lock.json')}".`)
    )

    if (!cliOptions['--auto-install']) {
      const answer = spawnSync(`${__dirname}/installPrompt.sh`, {
        timeout: 5000,
        stdio: 'inherit',
        killSignal: 1,
      });

      if (answer.status !== 0) {
        if (answer.signal === 'SIGHUP') {
          console.log('No user input detected. Exiting...');
        }
        process.exit(0);
      }
    }

    console.log(`Running "${chalk.bold('npm install')}" in the corresponding directories..\n`);

    const directories = getDirectoriesToInstall(changedPackageFiles)

    try {
      for (const directory of directories) {
        const installDirectory = resolve(gitRoot, directory)
        console.log(chalk.yellow.dim(`‣ ${chalk.underline(installDirectory)}\n`))

        execSync('npm install', {
          stdio: 'inherit',
          cwd: installDirectory
        })
      }
    } catch (e) {
      console.error('error running \'npm install\':', e)
      process.exit(1)
    }
  }
})()
