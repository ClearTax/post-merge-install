#!/usr/bin/env node
const { execSync, spawnSync } = require("child_process");
const { resolve } = require("path");
const chalk = require("chalk");
const { getDirectoriesToInstall, getPackageFiles } = require("./utils");
const argv = require("minimist")(process.argv.slice(2));

(async () => {
  try {
    if (argv.prompt && typeof argv.prompt !== "boolean") {
      console.log(
        chalk.red("Please use '--prompt' at the end of the script, like this:")
      );
      console.log(chalk.yellow("post-merge-install 'yarn install' --prompt"));
      process.exit(1);
    }
    const diffTree = execSync(
      "git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD"
    )
      .toString()
      .trim();
    const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();

    const changedPackageFiles = getPackageFiles(diffTree);
    const needsInstall = !process.env.CI && changedPackageFiles.length;

    const script = argv._.length > 0 ? argv._.join(" ") : "npm install";

    if (needsInstall) {
      console.log(
        chalk.yellow(
          `Detected changes in "${chalk.bold(
            "package.json"
          )}" and/or "${chalk.bold("lock file")}".`
        )
      );

      if (argv.prompt) {
        const answer = spawnSync(`${__dirname}/installPrompt.sh`, [script], {
          timeout: 5000,
          stdio: "inherit",
          killSignal: 1,
        });

        if (answer.status !== 0) {
          if (answer.signal === "SIGHUP") {
            console.log("No user input detected. Exiting...");
          }
          process.exit(0);
        }
      }

      console.log(
        `Running "${chalk.bold(script)}" in the corresponding directories..\n`
      );

      const directories = getDirectoriesToInstall(changedPackageFiles);

      try {
        for (const directory of directories) {
          const installDirectory = resolve(gitRoot, directory);
          console.log(
            chalk.yellow.dim(`‣ ${chalk.underline(installDirectory)}\n`)
          );

          execSync(script, {
            stdio: "inherit",
            cwd: installDirectory,
          });
        }
      } catch (e) {
        console.error(`error running '${script}':`, e);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
})();
