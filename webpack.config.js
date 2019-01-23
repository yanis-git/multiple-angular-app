const argv = require('yargs').argv
const config = require('./config/config.tpl')[argv['app'] || 'app1'];
const helpers = require('./config/utils');

helpers.cleanFromManifest(helpers.root(),config.global.manifest);
module.exports = require('./config/apps/webpack.app')(config);