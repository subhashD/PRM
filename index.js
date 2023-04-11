const config = require('./config')
const ExpressLoader = require('./loaders/Express')
const DB = require('./loaders/DB')

DB() // connect the database

const expressLoader = new ExpressLoader()
const App = expressLoader.App

module.exports = App
