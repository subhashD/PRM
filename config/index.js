require('dotenv').config()

let DBURL = 'mongodb://localhost/test-db'
if (process.env.NODE_ENV == 'dev') {
  DBURL = process.env.DBURL
} else if (process.env.NODE_ENV == 'test') {
  DBURL = process.env.TEST_DBURL
} else {
  DBURL = process.env.DBURL
}
const config = {
  /**
   * Your favorite port for running express
   */

  port: process.env.PORT || 5000,

  /**
   * Application Environment
   */
  env: process.env.NODE_ENV || 'dev',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    directory: process.env.LOGDIR || 'storage/logs',
  },

  viewEngine: process.env.VIEW_ENGINE || 'json',

  /**
   * That long string from mlab
   */
  dbUrl: DBURL,

  /**
   * Your secret sauce
   */
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || 's0m3$3Diwakar$h0lyC0d3&$',
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || 's0m3$3SUbhash$h0lyC0d3&$',
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || '7d',
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '30d',
  jwtAlgorithm: process.env.JWT_ALGO || '',
  jwtSession: {
    session: false,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
}

module.exports = config
