const helpers = require('../../../utils');

module.exports = options => {
    return {
        entry: options.entry,
        output: {
            path: helpers.root('dist'),
            filename: (helpers.isWatch || !options.hashedName) ? '[name].bundle.js' : '[name].[contenthash].js',
            chunkFilename: (helpers.isWatch || !options.hashedName) ? '[name].chunk.js' : '[name].[contenthash].js',
            pathinfo: false
        },
        resolve: {
            extensions: ['.ts','.js', '.scss', '.css', '.html'],
            modules: [helpers.root(), 'node_modules'],
        },
        module: {
            rules: [
                require('./scss')(options),
                require('./css')(options),
                require('../static/rules/files')(options)
            ]
        },
        plugins: require('./global/plugins')(options)
    }
};
