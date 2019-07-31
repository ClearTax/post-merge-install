#!/usr/bin/env node
const { execSync, spawn } = require('child_process')
const chalk = require('chalk');

(async () => {
  const diffTree = execSync('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').toString()

  const filesChanged = (diffTree || '').split('\n').filter(Boolean)
  const needsInstall =
    !process.env.CI && filesChanged.some(file => file === 'package.json' || file === 'package-lock.json')

  if (needsInstall) {
    console.log(
      chalk.yellow(`
Detected changes in "${chalk.bold('package.json')}" or "${chalk.bold('package-lock.json')}".
Running "${chalk.bold('npm install')}" for you ..
`)
    )
    const npmInstall = spawn(`npm`, ['install'], { stdio: 'inherit' })
    npmInstall.on('close', returnCode => {
      process.exit(returnCode)
    })
  }
})()
