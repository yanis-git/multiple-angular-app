const glob = require('glob');
const helpers = require('../../../../utils');

module.exports = options => {
    return {
        test: /component\.(scss|sass)$/,
        // include: options.include,
        enforce: 'pre',
        use: [
            {
                loader: 'to-string-loader'
            },
            {
                loader: 'css-loader',
                options: {sourceMap: true}
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: (loader) =>
                        [
                            require('autoprefixer')({browsers: ['last 3 version']})
                        ]
                }
            },
            {
                loader: 'sass-loader',
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
    }
};
