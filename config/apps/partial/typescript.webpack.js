const merge = require('webpack-merge');
const typescriptWebpack = require('../../compiler/webpack.typescript');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackAssetsManifest = require('webpack-assets-manifest');
const helpers = require('../../utils/index');


module.exports = (config) => {
    /**
     * TypeScript compilation for app1
     */
    const typescriptConfig = [
        typescriptWebpack,
        {
            entry: config.entry,
            plugins: [
            new AngularCompilerPlugin({
                tsConfigPath: helpers.root('tsconfig.json'),
                entryModule: config.entryModule
            }),
            new WebpackAssetsManifest({
                output: config.manifest
            }),
            // new BundleAnalyzerPlugin() // Uncomment to keep track of your bundle size.
            ]
        }
    ];
    return merge(...typescriptConfig);
}