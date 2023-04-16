const BaseService = require('../BaseService')
const config = require('../../config/index')
const UserRepository = require('../../repositories/UserRepository') // Database Layer
const jwt = require('jsonwebtoken')

class UserService extends BaseService {
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    super()
    // Create instance of Data Access layer using req
    this.repositoryInstance = new UserRepository()
  }

  getProfile = async (authorization) => {
    let decoded = null
    try {
      const tokenParts = authorization.split(' ')
      const encodedPayload = tokenParts[1]
      decoded = jwt.verify(encodedPayload, config.accessTokenSecret)
    } catch (err) {
      if (err.name == 'JsonWebTokenError' || err.name == 'TokenExpiredError') {
        return {
          success: false,
          message: 'Wrong Token Provided!!',
          data: err.message,
        }
      } else if (err.name == 'TokenExpiredError') {
        return {
          success: false,
          message: 'Refresh Token Expired!!',
          data: err.message,
        }
      }
    }

    const user = await this.repositoryInstance.findOne({ email: decoded.email })
    if (user == null) {
      return { success: false, message: 'User not found!!', data: null }
    } else {
      return { success: true, message: 'User found!!', data: user }
    }
  }

  allUsers = async (loggedInUserId, keyword) => {
    const users = await this.repositoryInstance.searchUser(
      loggedInUserId,
      keyword
    )
    if (App.lodash.isEmpty(users)) {
      return { success: false, message: 'Users not found!!', data: null }
    } else {
      return { success: true, message: 'Users found!!', data: users }
    }
  }
}

module.exports = UserService
