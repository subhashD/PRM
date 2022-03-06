// services/AuthService.js
const config = require('../config/index')
const MongooseService = require( "./MongooseService" ); // Data Access Layer
const UserModel = require( "../models/user" ); // Database Model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  /**
   * @description Create an instance of AuthService
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( UserModel );
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
        algorithm: config.jwtAlgorithm,
        expiresIn: config.accessTokenLife
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

        const result = await this.MongooseServiceInstance.create( userToCreate );
        return { success: true, body: result };
    } catch ( err ) {
        return { success: false, error: err };
    }
  }

  login = async ( body ) => {
    const user = await this.MongooseServiceInstance.findOne({email : body.email});
    if(user == null) {
        return { status: false, message: "User not found!!"};
    } else {
        // check if password matches
        const validPassword = await this.isPasswordValid(user, body.password);
        if(!validPassword) {
            return {
                success: false, 
                message: 'Authentication failed. Wrong password.'
            };
        }

        let tokens = {};

        tokens.accessToken = await this.generateAccessToken(user);
        tokens.refreshToken = await this.generateRefreshToken(user);
        
        return {
            success: true,
            message: 'Tokens generated successfully!!',
            tokens: tokens
        };    
    }
  }

  tokenRefresh = async ( body ) => {
    try {
        const decoded = jwt.verify(body.refreshToken, config.refreshTokenSecret);
    } catch ( err ) {
        if(err.name == 'TokenExpiredError') {
            return { status: false, message: "Refresh Token Expired!!"};
        }
    }

    const user = await this.MongooseServiceInstance.findOne({email : decoded.email});
    if(user == null) {
        return { status: false, message: "User not found!!"};
    } else {
        let tokens = {};

        tokens.accessToken = await this.generateAccessToken(user);
        tokens.refreshToken = await this.generateRefreshToken(user);
        
        return {
            success: true,
            message: 'Token Refreshed successfully!!',
            tokens: tokens
        };    
    }
  }
}

module.exports = AuthService;