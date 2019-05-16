const argv = require('yargs').argv;
const config = require('./config/config')[argv['app'] || 'app1'];
const helpers = require('./utils');
/**
 * Base on previous manifest, we deleted outdated files.
 */
helpers.cleanFromManifest(helpers.root('dist'),config.global.manifest);
/**
 * We boostrap webpack config base on configuration file.
 */
module.exports = require('./apps/app.webpack')(config);
