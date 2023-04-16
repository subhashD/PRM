const ChatModel = require('../database/models/chat') // Database Model
const BaseRepository = require('./BaseRepository')

class ChatRepository extends BaseRepository {
  constructor() {
    super()
    this.model = ChatModel
  }
}

module.exports = ChatRepository
