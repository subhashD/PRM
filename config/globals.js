const lodash = require('lodash');
const Helper = require('../util/helpers/helpers');
const moment = require('moment');
const path = require('path');
const config = require('./index');
require('dotenv').config();
var env = process.env || {};

module.exports = {

    lodash: lodash,

    helpers: Helper,

    moment: moment,

    env: env,

    config: config,

    paths: {
        root: path.resolve(__dirname, '../'),
        s3: {
            bucket: env.AWS_S3_BUCKET
        }
    },

}