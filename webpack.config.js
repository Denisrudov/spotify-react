var config

switch ((process.env.NODE_ENV || '').trim()) {
case 'prod':
case 'production':
  config = require('./configs/config.production')
  break
case 'qa':
  config = require('./configs/config.qa')
  break
case 'dev':
  config = require('./configs/config.development')
  break
default:
  config = require('./configs/config.base')
  break
}


module.exports = config
