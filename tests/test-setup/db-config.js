const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const logger = require('../../util/Logger/Logger')
const mongoServer = new MongoMemoryServer()

//in-memory db for unit test
const connect = async () => {
  const uri = await mongoServer.getUri()
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }
  await mongoose.connect(uri, mongooseOpts)
}

//works perfectly for unit test
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

//Remove all the data for all db collections.
const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
}
