const path = require('path');
const merge = require('webpack-merge');
const cssWebpack = require('../../compiler/webpack.css');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const helpers = require('../../utils/index');

module.exports = (config) => {
    /**
     * merge compilation for app1
     */
    const cssConfig = [
        cssWebpack({
            ROOT: helpers.root(),
            resources: config.resources
        }),
        {
            entry: config.entry,
            plugins: [
                new WebpackAssetsManifest({
                    output: config.manifest
                })
            ]
        }
    ];

    return merge(...cssConfig);
}