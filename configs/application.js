const nodeEnv = (process.env.NODE_ENV || '').trim()
const isProduction = 'prod' === nodeEnv || 'production' === nodeEnv

module.exports = {
  production: isProduction
}
