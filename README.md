# post-merge-install

Run 🏃 NPM Install post merge and when *package.json* or *package-lock.json* changes - Husky Hook

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

## Authors

- [Aditi Mohanty](https://github.com/rheaditi)
- [Dhruv Jain](https://github.com/maddhruv)

---

[![ClearTax](https://assets1.cleartax-cdn.com/cleartax-brand/logos/2018/01/pinchy_yellow_black.png)](https://cleartax.in)
