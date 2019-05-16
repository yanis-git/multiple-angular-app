const BrowserSync = require('browser-sync-webpack-plugin');
const helpers = require('../../../../utils');
const zopfli = require('@gfx/zopfli/dist/index');
const CompressionPlugin = require('compression-webpack-plugin');
const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (config) => {
    const plugins = [];
    if(helpers.isWatch) {
        plugins.push(...[
            new BrowserSync(
                {
                    host: 'localhost',
                    port: '4040',
                    proxy: {
                        target: 'http://v4.ps4.local',
                        ws: true
                    }
                },
                {
                    ghostMode: false,
                    // reload true since we use BrowserSync with run watcher (instead of watch)
                    reload: true
                }
            )
        ]);
    }

    if (argv.mode && argv.mode === 'production') {
        plugins.push(...[
            /**
             * Disable since is heavy to do.
             */
            // new CompressionPlugin({
            // compressionOptions: {
            //     numiterations: 15
            // },
            // algorithm(input, compressionOptions, callback) {
            //     return zopfli.gzip(input, compressionOptions, callback);
            // }
            // })
        ]);
    }

    if (argv.analyze) {
        plugins.push(...[
            new BundleAnalyzerPlugin()
        ]);
    }

    return {
        plugins
    };
};
