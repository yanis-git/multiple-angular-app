const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (options) => {
    return {
        output: {
            path: options.ROOT + '/dist',
            filename: '[name]-[contenthash].js',
            chunkFilename: '[name]-[contenthash].js',
          },
          resolve: {
            extensions: ['.ts','.js', '.scss', '.css', '.html'],
            modules: [options.ROOT, 'node_modules'],
          },
          module: {
            rules: [
                {
                    test: /(\.css|scss|sass)$/,
                    use: [
                        {
                            loader:'style-loader'
                        },
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true 
                            }
                        },
                        {
                            loader:'postcss-loader',
                            options: {
                                sourceMap:true,
                                plugins: (loader) =>
                                    [
                                        require('autoprefixer')({ browsers:['last 3 version'] })
                                    ]
                            }
                        },
                        {
                            loader:'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        /**
                         * Add global Sass ressource automaticly include on any scss entry point.
                         *
                         * Reference : https://github.com/shakacode/sass-resources-loader
                         **/
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: options.resources
                            },
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name]-[contenthash].css'
              }),
        ]
    }
};