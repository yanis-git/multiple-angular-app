const argv = require('yargs').argv;
const babelOptions = require('../babel');
module.exports = options => {
    return {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js)|\.ts$/,
        // include: options.include,
        use:
            (argv.mode === 'production' && options.aot && options.aot === true) ?
                [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: '@angular-devkit/build-optimizer/webpack-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: '@ngtools/webpack'
                    }
                ]
                :
                [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
    };
};