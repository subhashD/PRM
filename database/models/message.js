const mongoose = require('mongoose')

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const messageSchema = Schema(
  {
    sender: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    chat: {
      type: SchemaTypes.ObjectId,
      ref: 'Chat',
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: 'messages',
    timestamp: true,
  }
)

module.exports = mongoose.model('Message', messageSchema)
