#!/usr/bin/env node
const { execSync } = require('child_process')
const { resolve } = require('path')
const chalk = require('chalk')
const { getDirectoriesToInstall, getPackageFiles } = require('./utils');
const inquirer = require('inquirer');

(async() => {
  const cliOptions = process.argv.reduce((agg, arg) => {
    const [flag, value] = arg.split('=');
    agg[flag] = value || flag;
    return agg;
  }, {});

  const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').toString().trim()
  const gitRoot = execSync('git rev-parse --show-toplevel').toString().trim()

  const changedPackageFiles = getPackageFiles(diffTree)
  const needsInstall = !process.env.CI && changedPackageFiles.length

  if (needsInstall) {
    console.log(
      chalk.yellow(`Detected changes in "${chalk.bold('package.json')}" and/or "${chalk.bold('package-lock.json')}".`)
    )

    if (!cliOptions['--auto-install']) {
      try {
        const answers = await inquirer
          .prompt([{
            type: 'confirm',
            message: 'Do you want to run `npm install` now?',
            name: 'installConfirmation'
          }]);

        if (!answers.installConfirmation) {
          process.exit(0);
        }
      } catch (err) {
        console.error('Error getting user input: ', e);
        process.exit(1);
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
