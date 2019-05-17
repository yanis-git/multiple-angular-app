const helpers = require('../../../utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (config) => {
  return {
    devServer: {
      contentBase: helpers.root('dist'),
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'App1',
        template: helpers.root('src/app1.html'),
        path: helpers.root('dist'),
        filename: 'app1.html'
      }),
      new HtmlWebpackPlugin({
        hash: true,
        title: 'App2',
        template: helpers.root('src/app2.html'),
        path: helpers.root('dist'),
        filename: 'app2.html'
      })
    ]
  }
};
