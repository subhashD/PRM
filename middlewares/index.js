const config = require('../config');
const router = require('express').Router();
const express = require("express");
const app = express();
const auth = require('./auth');
const passport = require("passport");
const User = require("../models/user");

let middlewares = (app) => {
    app.use(auth.initialize());
    
    return app;
};


module.exports = middlewares;