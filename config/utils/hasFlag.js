const argv = require('yargs').argv;

module.exports = (flag) => {
  return typeof argv[flag] !== "undefined";
};