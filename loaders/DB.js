const config = require('../config')
const mongoose = require('mongoose')
const logger = require('../util/Logger/Logger')

const DB = async () => {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  mongoose.Promise = global.Promise

  // connect to the db and initialize the app is successfull
  mongoose
    .connect(config.dbUrl, mongooseOptions)
    .then(() => {
      logger.info(`mongoose connected to ${config.dbUrl}`)
    })
    .catch((err) => {
      logger.error(err)
    })
}

module.exports = DB
