const config = require('../config');
const logger = require('../services/Logger');
const response = require('./response');
const request = require('request');

module.exports = { validateApp };

function validateApp ( req, res, next ) {
    const endpoint = 'e_auth/validate/apps';
    const url = '';
}