const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT = path.resolve(__dirname, '../../');
const argv = require('yargs').argv

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        targets: {
          browsers: [
            "last 2 versions",
            "not ie <= 10"
          ]
        },
        useBuiltIns: 'usage',
        debug: false
      }
    ]
  ],
  cacheDirectory: true
};

module.exports = {
  output: {
    path: ROOT + '/dist',
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    modules: [ROOT, 'node_modules'],
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: ROOT + '/tsconfig.json'
      })
    ]
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js)|\.ts$/,
        use:
          (argv.mode === 'production') ?
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
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(argv.mode)
      }
    })
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            default: false,
            vendors: false,
            // vendor chunk
            vendor: {
                // name of the chunk
                name: 'vendor',
                // async + async chunks
                chunks: 'all',
                // import file path containing node_modules
                test: /node_modules/,
                // priority
                priority: 20
            },
            // common chunk
            common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
}
};

