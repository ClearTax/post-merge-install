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
    <td width='200'><code>--prompt</code></td>
    <td>Enables a confirmation prompt before installing packages if change in <code>package.json</code> or <code>package-lock.json</code> is detected.</td>
    <td>By default <code>post-merge-install</code> automatically installs dependencies if a change is detected. Adding this flag enables a confirmation prompt asking if an <code>npm install</code> should be run.</td>
  </tbody>
</table>

### Alias

You can also use the alias `pmi` instead of `post-merge-install`

## Authors

- [Aditi Mohanty](https://github.com/rheaditi)
- [Dhruv Jain](https://github.com/maddhruv)

---

[![ClearTax](https://assets1.cleartax-cdn.com/cleartax-brand/logos/2018/01/pinchy_yellow_black.png)](https://cleartax.in)
