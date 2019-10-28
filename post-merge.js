#!/usr/bin/env node
const { execSync } = require('child_process')
const { resolve } = require('path')
const chalk = require('chalk')
const { getDirectoriesToInstall, getPackageFiles } = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
      execSync('exec < /dev/tty');

      try {
        await Promise
          .race([
            new Promise((resolve, reject) => {
              // Timeout on user input
              setTimeout(() => {
                console.error('No user input detected. `npm install` was not run')
                reject();
              }, 3000);
            }),
            new Promise((resolve, reject) => {
              rl.question('Run `npm install`? (y/n) ', (answer) => {
                rl.close();
        
                if (answer === 'y' || answer === 'Y') {
                  resolve();
                }

                reject();
              });
            })
          ]);
      } catch (err) {
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
