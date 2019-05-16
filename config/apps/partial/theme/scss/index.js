const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const helpers = require('../../../../utils');
module.exports = options => {
    const rule = {
        test: file => {
            return (file.match(/\.(scss|sass)$/) && !file.match(/\.component\.(css|scss|sass)$/));
        },
        include: options.include,
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
                    sourceMap: true,
                    options: {
                        includePaths: [
                            helpers.root('node_modules'),
                            helpers.root('node_modules/@material') + '/*'
                        ].map((g) => glob.sync(g))
                         .reduce((a, c) => a.concat(c), [])
                    }
                }
            }
        ]
    };

    if(options.resources.length > 0) {
        rule.use.push(
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
            });
    }

    return rule;
};
