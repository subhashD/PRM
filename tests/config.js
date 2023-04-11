//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
process.env.AUTH_TOKEN = ''
// Import App
const http = require('http')
const app = require('../index')

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const server = http.createServer(app)
server.listen()

module.exports = {
  chai,
  expect,
  server,
}
