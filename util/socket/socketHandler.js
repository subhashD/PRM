const socketServer = require('socket.io')
const config = require('../../config')

const socketHandler = (httpServer) => {
  const socketIo = socketServer(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: config.clientUrl,
    },
  })

  socketIo.on('connection', (socket) => {
    console.log(`connected to socket.io for server`)

    socket.on('setup', (userData) => {
      socket.join(userData.id)
      console.log(userData.id)
      socket.emit('connected')
    })

    socket.on('join-chat', (room) => {
      socket.join(room)
      console.log(`user joined room : ${room}`)
    })

    socket.on('new-message', (newMessage) => {
      var chat = newMessage.chat

      if (!chat.users) return console.log('users not defined')
      chat.users.forEach((user) => {
        if (user.id === newMessage.sender.id) return
        socket.in(user.id).emit('message-received', newMessage)
      })
    })

    socket.on('typing', (room) => socket.in(room).emit('typing'))
    socket.on('stop-typing', (room) => socket.in(room).emit('stop-typing'))
  })
}

module.exports = socketHandler
