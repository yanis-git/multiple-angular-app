const TerserPlugin = require('terser-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack').HashedModuleIdsPlugin;

module.exports = {
    optimization: {
        sideEffects: true,
        minimizer: [
            new HashedModuleIdsPlugin(),
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    ie8: false,
                    mangle: true,
                    ecma: 5,
                    compress:{
                        pure_getters: true,
                        passes: 2
                    },
                    output: {
                        ascii_only: true,
                        comments: false
                    }
                }
            }),
        ]
    }
};
