const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const BUILD_DIR = process.env.BUILD_DIR = process.env.BUILD_DIR || 'build'
const BUNDLE_JS = process.env.BUNDLE_JS = process.env.BUNDLE_JS || 'bundle.js'

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, `../${BUILD_DIR}`),
    filename: `/js/${BUNDLE_JS}`
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader"},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.svg$/, loader: 'url?limit=20000&name=fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=20000&name=fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url?limit=20000&name=fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?limit=20000&name=fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=20000&name=fonts/[name].[ext]' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass!postcss?sourceMap=inline', {
          publicPath: '../'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', ['css?sourceMap'], {
          publicPath: '../'
        })
      }

    ]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new webpack.ProvidePlugin({ Q: 'q' })
  ]

}

module.exports = config
