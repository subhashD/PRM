//Require the dev-dependencies
const { chai, expect, server } = require('./../config')
const { clearDatabase } = require('../test-setup/db-config')
const { seedUser } = require('../test-setup/seed')
const ChatService = require('../../services/Chat/ChatService')

//Our parent block
describe('Chats', () => {
  before(() => {
    seedUser()
  })

  after(() => {
    clearDatabase
  })

  describe('Chat Service create new Personal chat', () => {
    it('It should create a new chat with user', (done) => {})
  })

  describe('Chat Service fetch all Personal chat', () => {
    it('It should create a new chat with user', (done) => {})
  })

  describe('Chat Service create new Group chat', () => {
    it('It should create a new group chat with at least 2 users', (done) => {})
  })

  describe('Rename a Group chat', () => {
    it('It should create rename group chat', (done) => {})
  })

  describe('Chat Service fetch all chats', () => {
    it('It should create a new chat with user', (done) => {})
  })
})
