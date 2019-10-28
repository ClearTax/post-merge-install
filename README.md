# post-merge-install

Runs 🏃 `npm install` post merge/rebase and when *package.json* or *package-lock.json* changes

[![NPM](https://badgen.net//npm/v/post-merge-install)](https://www.npmjs.com/package/post-merge-install)

## Install

`npm install post-merge-install --save-dev`

or globally as

`npm install -g post-merge-install`

## Prerequisite

- [husky](https://www.npmjs.com/package/husky)

## Usage

```js
"husky": {
  "hooks": {
    "post-merge": "post-merge-install",
    "post-rebase": "post-merge-install"
  }
}
```

### Options

<table>
  <thead>
    <th>Flag</th>
    <th>Description</th>
    <th>Details</th>
  </thead>
  <tbody>
    <td width='200'><code>--auto-install</code></td>
    <td>Disables confirmation prompt and automatically installs packages if change in `package.json` or `package-lock`is detected.</td>
    <td>By default <code>post-merge-install</code> will prompt the user if an <code>npm install</code> should be done. This flag disables this confirmation prompt and always installs dependecies if a change is detected.</td>
  </tbody>
</table>

### Alias

You can also use the alias `pmi` instead of `post-merge-install`

## Authors

- [Aditi Mohanty](https://github.com/rheaditi)
- [Dhruv Jain](https://github.com/maddhruv)

---

[![ClearTax](https://assets1.cleartax-cdn.com/cleartax-brand/logos/2018/01/pinchy_yellow_black.png)](https://cleartax.in)
