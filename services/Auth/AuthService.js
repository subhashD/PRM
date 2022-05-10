const BaseService = require('../BaseService');
const config = require('../../config/index')
const UserRepository = require( "../../repositories/UserRepository" ); // Database Layer
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService extends BaseService {
  /**
   * @description Create an instance of AuthService
   */
  constructor () {
    super();
    // Create instance of Data Access layer using req
    this.repositoryInstance = new UserRepository();
  }

  isPasswordValid = async ( user, password ) => {
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  }

  generateAccessToken = async ( user ) => {
    const payload = {
        email: user.email
    };

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, config.accessTokenSecret, {
        algorithm: App.config.jwtAlgorithm,
        expiresIn: App.config.accessTokenLife
    });

    return accessToken;
  }

  generateRefreshToken = async ( user ) => {
    const payload = {
        email: user.email
    };
    
    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, config.refreshTokenSecret, {
        algorithm: config.jwtAlgorithm,
        expiresIn: config.refreshTokenLife
    });
    
    return refreshToken;
  }

  /**
   * @description Attempt to create a user with the provided object
   * @param body {object} Object containing all body fields to
   * create user
   * @returns {Promise<{success: boolean, message: *, error: *}|{success: boolean, message: *, body: *}>}
   */
  create = async ( body ) => {
    try {
        let userToCreate = { 
            firstname: body.firstname, 
            lastname: body.lastname, 
            source: "local",
            email: body.email,
            password: body.password 
        };

        const result = await this.repositoryInstance.create( userToCreate );
        return { success: true, message: 'User Created Successfully!', data: result };
    } catch ( err ) {
        return { success: false, message: 'User Creation Failed!', data: err };
    }
  }

  login = async ( body ) => {
    const user = await this.repositoryInstance.findOne({email : body.email});

    if(user == null) {
        return { status: false, message: "User not found!!", data: null};
    } else {
        // check if password matches
        const validPassword = await this.isPasswordValid(user, body.password);
        if(!validPassword) {
            return {
                success: false, 
                message: 'Authentication failed. Wrong password.'
            };
        }

        let data = {};

        data.user = user;
        data.accessToken = await this.generateAccessToken(user);
        data.refreshToken = await this.generateRefreshToken(user);
        
        return {
            success: true,
            message: 'Tokens generated successfully!!',
            data: data
        };    
    }
  }

  findUserByEmail = async ( email ) => {
    const user = await this.repositoryInstance.findOne({email : email});
    if(user == null) {
        return { status: false, message: "User not found!!", data: null};
    } else {
        return { status: true, message: "User found!!", data: user};
    }
  }

  tokenRefresh = async ( body ) => {
    let decoded = null;
    try {
        decoded = jwt.verify(body.refreshToken, config.refreshTokenSecret);
    } catch ( err ) {
        if(err.name == 'TokenExpiredError') {
            return { status: false, message: "Refresh Token Expired!!", data: err.message};
        }
    }

    const user = await this.repositoryInstance.findOne({email : decoded.email});
    if(user == null) {
        return { status: false, message: "User not found!!", data: null};
    } else {
        let tokens = {};

        tokens.accessToken = await this.generateAccessToken(user);
        tokens.refreshToken = await this.generateRefreshToken(user);
        
        return {
            success: true,
            message: 'Token Refreshed successfully!!',
            data: tokens
        };    
    }
  }
}

module.exports = AuthService;