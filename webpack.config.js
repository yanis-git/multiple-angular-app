const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ROOT = path.resolve(__dirname);
const argv = require('yargs').argv

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
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
  entry: {
    app1: 'src/app1.ts',
    app2: 'src/app2.ts',
    polyfills: 'src/polyfills.ts'
  },
  output: {
    path: ROOT + '/dist',
    filename: '[name].js'
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
    new AngularCompilerPlugin({
      tsConfigPath: ROOT+'/tsconfig.json',
      entryModule: ROOT+'/src/app1/app.module/#AppModule'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/*.html',
        flatten: true
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
          'ENV': JSON.stringify(argv.mode)
      }
  })
  ]
};