const MessageModel = require('../database/models/message') // Database Model
const BaseRepository = require('./BaseRepository')

class MessageRepository extends BaseRepository {
  constructor() {
    super()
    this.model = MessageModel
  }
}

module.exports = MessageRepository
