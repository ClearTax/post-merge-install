const { dirname } = require('path')

const PACKAGE_FILE = /package(-lock)?\.json/

/**
 * Returns filtered list of files from the diff-tree which are either `package.json` or `package-lock.json`
 * @param {String} diffTree - results of git diff-tree as string
 */
exports.getPackageFiles = (diffTree = '') => diffTree.split('\n').filter(file => PACKAGE_FILE.test(file))

/**
 * Retuns unique list of items from an array
 * @param {Array} arr
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniq
 */
exports.unique = arr => Array.isArray(arr) ? [...new Set(arr)] : []

/**
 * Given a list of file paths, returns the unique list of directories they are in.
 * @param {String[]}
 */
exports.getDirectoriesToInstall = (files = []) => Array.isArray(files) ? exports.unique(files.map(file => dirname(file))) : []

/**
 * Takes an array of cli arguments and returns an object of parsed keys along with values (if provided)
 * Example: foo --bar will return { 'foo': 'foo', 'bar': 'bar'}
 * Example: foo --bar=123 will return { 'foo': 'foo', 'bar': '123'}
 * @param {Array} arr
 * @returns {Object}
 */
exports.parseCliOptions = () => {
    return process.argv.reduce((agg, arg) => {
        const [flag, value] = arg.split('=');
        if (value) {
            // To handle boolean values passed as string
            switch (value) {
                case 'true': {
                    agg[flag] = true;
                    break;
                }

                case 'false': {
                    agg[flag] = false;
                    break;
                }

                default: {
                    agg[flag] = value;
                    break;
                }
            }
        } else {
            agg[flag] = true;
        }
        
        return agg;
    }, {});
}