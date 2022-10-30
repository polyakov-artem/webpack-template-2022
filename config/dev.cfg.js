const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.cfg');


module.exports = merge(baseConfig, {
  devServer: {
    port: 3000,
    hot: true,
    watchFiles: {
      paths: ['src/**/*']
    },
  },
 
  target: 'web',
  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.(css|scss|sass)$/,
      use: ['css-loader', 'sass-loader'],
    }]
  },

});