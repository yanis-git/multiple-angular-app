const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack/src/index').AngularCompilerPlugin;
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = (config, mode) => {
    const commonPlugins = [
        new webpack.DefinePlugin({
            'process.env.ENV': JSON.stringify(
                    (mode === 'production') ? 'prod' : 'dev'
                ),
            'process.env.NODE_ENV': JSON.stringify(
                    (mode === 'production') ? 'prod' : 'dev'
                ),
            'global': {},
        }),
        new WebpackAssetsManifest({
            output: config.manifest
        }),
    ];

    return mode === 'production' ? [
        ...commonPlugins,
        new AngularCompilerPlugin({
            tsConfigPath: config.tsconfigPath,
            entryModule: config.entryModule
        })
    ] : [
        ...commonPlugins,
        new ForkTsCheckerWebpackPlugin(),
        new HardSourceWebpackPlugin()
    ]
}
