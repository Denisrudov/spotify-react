const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const baseConfig = require('./config.base')

const config = webpackMerge(baseConfig, {
  historyApiFallback: {
    index: '/index.html'
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html'
    }
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('/stylesheets/style.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/templates/index.html')
    })
  ]
})

module.exports = config
