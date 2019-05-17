const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const helpers = require('../../../utils');
const argv = require('yargs').argv;
module.exports = (config) => {
    return {
        entry: config.entry,
        output: {
            path: helpers.root('dist'),
            filename: (helpers.isWatch || !config.hashedName) ? '[name].bundle.js' : '[name].[contenthash].js',
            chunkFilename: (helpers.isWatch || !config.hashedName) ? '[name].chunk.js' : '[name].[contenthash].js',
            pathinfo: false
        },
        resolve: {
            alias: {
                'cropperjs$': 'cropperjs/dist/cropper.esm.js'
            },
            extensions: ['.ts', '.js', '.html'],
            modules: [helpers.root(), 'node_modules'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: config.tsconfigPath
                })
            ]
        },
        module: {
            rules: [
                /**
                 * Compile angular app, manage production AOT
                 */
                require('./rules/ng')(config),
                /**
                 * Compile sass as
                 *
                 * @Component({
                 *   styleUrls: ['./filename.component.scss']
                 * })
                 */
                require('./rules/sass')(config),
                require('../static/rules/files')(config),
                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: require('./plugins')(config, argv.mode),
        /**
         * Disable for now, is looks like output is bigger than without.
         */
        optimization: require('./optimization/global').optimization,
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false,
            fs: 'empty'
        }
    }
};

