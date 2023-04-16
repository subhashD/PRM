const mongoose = require('mongoose')

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const chatSchema = Schema(
  {
    chatName: {
      type: String,
      trim: true,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        unique: true,
      },
    ],
    latestMessage: {
      type: SchemaTypes.ObjectId,
      ref: 'Message',
    },
    groupAdmins: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        unique: true,
      },
    ],
  },
  {
    collection: 'chats',
    timestamps: true,
  }
)

module.exports = mongoose.model('Chat', chatSchema)
