const webpackMerge = require('webpack-merge')
const config = require('./config.production')


module.exports = webpackMerge(config, {
  devtool: 'source-map'
})
