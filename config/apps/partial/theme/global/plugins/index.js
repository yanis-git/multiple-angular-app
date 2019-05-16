const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const helpers = require('../../../../../utils');
const argv = require('yargs').argv;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (options) => {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: (helpers.isWatch || !options.hashedName) ? '[name].bundle.css' : '[name].[contenthash].css'
        }),
        new WebpackAssetsManifest({
            output: options.manifest
        })
    ];

    if (argv.mode && argv.mode === 'production') {
        plugins.push(
            ...[
                /**
                 * Minify all css assets.
                 */
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: { discardComments: {removeAll: true },discardUnused: false,minifyFontValues: false },
                    canPrint: true
                }),
            ]
        );
    }
    return plugins;
};