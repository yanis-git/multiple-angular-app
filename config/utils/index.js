const hasFlag = require('./hasFlag');
module.exports = {
    root: require('./pathResolver'),
    cleanFromManifest: require('./clearCache'),
    hasFlag,
    isWatch: hasFlag('watch')
};