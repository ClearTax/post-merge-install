# post-merge-install

![npm](https://img.shields.io/npm/v/post-merge-install?color=green&style=flat-square) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section --> [![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-) <!-- ALL-CONTRIBUTORS-BADGE:END --> ![npm](https://img.shields.io/npm/dm/post-merge-install?color=orange&style=flat-square)

Runs 🏃 `npm install/script` post merge/rebase and when `package.json` or `package-lock.json` changes.

## Install

`npm install post-merge-install --save-dev`

or globally as

`npm install -g post-merge-install`

## Prerequisite

- [husky](https://www.npmjs.com/package/husky)

## Usage

```shell
$ npx husky add .husky/post-merge 'post-merge-install "yarn install"'
$ npx husky add .husky/post-rebase 'post-merge-install "bolt install"'
```

### Custom script

`post-merge-install` can be used with custom scripts as well.

```shell
$ post-merge-install 'yarn install'
$ post-merge-install 'lerna' 'bootstrap'
```

### Options

<table>
  <thead>
    <th>Flag</th>
    <th>Description</th>
    <th>Details</th>
  </thead>
  <tbody>
    <td width='200'><code>--prompt</code></td>
    <td>Enables a confirmation prompt before installing packages if change in <code>package.json</code> or <code>package-lock.json/yarn.lock</code> is detected.</td>
    <td>By default <code>post-merge-install</code> automatically installs dependencies if a change is detected. Adding this flag enables a confirmation prompt asking if an <code>npm install/script</code> should be run.</td>
  </tbody>
</table>

### Alias

You can also use the alias `pmi` instead of `post-merge-install`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://aditimohanty.com"><img src="https://avatars3.githubusercontent.com/u/6426069?v=4" width="60px;" alt="Aditi Mohanty"/><br /><sub><b>Aditi Mohanty</b></sub></a><br /><a href="https://github.com/ClearTax/post-merge-install/commits?author=rheaditi" title="Code">💻</a></td>
    <td align="center"><a href="https://maddhruv.github.io"><img src="https://avatars3.githubusercontent.com/u/18121502?v=4" width="60px;" alt="Dhruv Jain"/><br /><sub><b>Dhruv Jain</b></sub></a><br /><a href="https://github.com/ClearTax/post-merge-install/commits?author=maddhruv" title="Code">💻</a> <a href="https://github.com/ClearTax/post-merge-install/commits?author=maddhruv" title="Documentation">📖</a></td>
    <td align="center"><a href="https://abinavseelan.com"><img src="https://avatars2.githubusercontent.com/u/6417910?v=4" width="60px;" alt="Abinav Seelan"/><br /><sub><b>Abinav Seelan</b></sub></a><br /><a href="https://github.com/ClearTax/post-merge-install/commits?author=abinavseelan" title="Code">💻</a> <a href="https://github.com/ClearTax/post-merge-install/commits?author=abinavseelan" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- Use `npx all-contributors add <your-username> <comma-separated-contribution-types>` to manually add yourself to the all-contributors list -->

---

[![ClearTax](https://assets1.cleartax-cdn.com/cleartax-brand/logos/2018/01/pinchy_yellow_black.png)](https://cleartax.in)
