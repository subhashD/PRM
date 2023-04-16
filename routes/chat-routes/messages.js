const messageController = require('../../controllers/Chat/MessageController')

//middleware and contact route prefix
const messagePrefix = 'chat/:chatId/message'
let commonMiddleware = [
  'auth.jwt', // to check if token exists and is valid
]

module.exports = {
  [`GET ${messagePrefix}`]: {
    action: messageController.getMessages,
    name: 'chat.getMessages',
    middlewares: [...commonMiddleware],
  },

  [`POST ${messagePrefix}`]: {
    action: messageController.postMessage,
    name: 'chat.postMessage',
    middlewares: [...commonMiddleware],
  },
}
