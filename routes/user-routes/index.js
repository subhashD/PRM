const userController = require('../../controllers/User/UserController')
const userPrefix = 'user'
let commonMiddleware = [
  'auth.jwt', // to check if token exists and is valid
]

module.exports = {
  [`GET ${userPrefix}/profile`]: {
    action: userController.getProfile,
    name: 'user.get',
    middlewares: [...commonMiddleware],
  },

  [`GET ${userPrefix}/users`]: {
    action: userController.allUsers,
    name: 'user.search',
    middlewares: [...commonMiddleware],
  },
}
