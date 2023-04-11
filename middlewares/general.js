const compression = require('compression')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const config = require('../config')

module.exports = function (app) {
  // adding Helmet to enhance your API's security
  app.use(helmet())

  // enabling CORS for all requests
  app.use(cors())

  // adding morgan to log HTTP requests
  if (config.env !== 'test') {
    app.use(morgan('dev'))
  }

  app.use(compression())

  // using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // CORS Fix
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header("Access-Control-Allow-Methods", "*");
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS, PATCH'
    )
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
  })
}
