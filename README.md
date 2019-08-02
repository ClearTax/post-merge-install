# post-merge-install

Run 🏃 NPM Install post merge and when *package.json* or *package-lock.json* changes - Husky Hook

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
